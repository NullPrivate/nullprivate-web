import { useEffect, useMemo, useState } from 'react';
import { familyRenewOptions, personalRenewOptions } from '../../data/renew-plans';
import { isMobileUa, resolveApiBase } from '../../lib/api';
import { trackEvent } from '../analytics/track';

interface MyServicePageProps {
  apiBase: string;
  stageApiBase: string;
  stageHost: string;
  region?: string;
}

interface GiftRecord {
  created_at?: string;
  period?: number;
  gift_source_order_id?: string;
}

interface ServiceData {
  ret_code?: number;
  msg?: string;
  name?: string;
  created_at?: string;
  expired_at?: string;
  url?: string;
  payment_id?: string;
  vendor_payment_id?: string;
  type?: string;
  invitecode?: string;
  restart_url?: string;
  recent_gift_records?: GiftRecord[];
}

function formatDateTime(iso?: string) {
  try {
    if (!iso) return '';
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleString();
  } catch {
    return iso || '';
  }
}

function extractServiceName(rawInput: string) {
  let s = String(rawInput || '').trim();
  if (!s) return '';
  if (s.includes('://')) s = s.split('://').pop() || '';
  s = s.split(/[/?#]/)[0];
  s = s.replace(/:\d+$/, '');
  s = s.toLowerCase().replace(/\.+$/, '');
  const labels = s.split('.');
  if (!labels.length) return '';
  const svcPattern = /^[a-z][a-z0-9]{15}$/;
  const matched = labels.find((label) => svcPattern.test(label));
  if (matched) return matched;
  return labels[0];
}

function computeGiftTotalDays(records?: GiftRecord[]) {
  if (!Array.isArray(records)) return 0;
  return records.reduce((sum, item) => sum + (Number(item?.period) || 0), 0);
}

export default function MyServicePage({
  apiBase,
  stageApiBase,
  stageHost,
  region = 'zh_cn',
}: MyServicePageProps) {
  const [serviceName, setServiceName] = useState('');
  const [querying, setQuerying] = useState(false);
  const [error, setError] = useState('');
  const [data, setData] = useState<ServiceData | null>(null);
  const [renewPeriod, setRenewPeriod] = useState('');
  const [renewing, setRenewing] = useState(false);
  const [restarting, setRestarting] = useState(false);
  const [restartFeedback, setRestartFeedback] = useState('');
  const [frameHtml, setFrameHtml] = useState('');
  const [showFrame, setShowFrame] = useState(false);

  const [endpoint, setEndpoint] = useState(apiBase);
  const renewOptions = data?.type === 'family' ? familyRenewOptions : personalRenewOptions;

  useEffect(() => {
    setEndpoint(resolveApiBase(apiBase, stageApiBase, stageHost));
    try {
      const params = new URLSearchParams(window.location.search || '');
      const fromQuery = params.get('service_name') || params.get('service') || params.get('name') || '';
      if (fromQuery.trim()) {
        setServiceName(fromQuery.trim());
        return;
      }
      const hostname = window.location.hostname;
      if (
        !hostname.includes('www.adguardprivate.com') &&
        !hostname.includes('localhost') &&
        !hostname.startsWith('127.')
      ) {
        setServiceName(hostname);
      }
    } catch {
      // ignore
    }
  }, [apiBase, stageApiBase, stageHost]);

  useEffect(() => {
    if (!renewOptions.length) return;
    setRenewPeriod((current) => current || renewOptions[0].id);
  }, [renewOptions]);

  async function queryService() {
    setQuerying(true);
    setError('');
    setRestartFeedback('');
    setShowFrame(false);
    setFrameHtml('');

    const raw = serviceName.trim();
    if (!raw) {
      setData(null);
      setError('请输入要查询的服务地址');
      setQuerying(false);
      return;
    }

    const extracted = extractServiceName(raw);
    const url = `${endpoint}/services/${extracted}`;
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 10000);

    try {
      trackEvent('my_service_query', { service_name: extracted });
      const response = await fetch(url, { method: 'GET', signal: controller.signal });
      const contentType = response.headers.get('content-type') || '';
      if (!response.ok) {
        if (contentType.includes('application/json')) {
          const errJson = await response.json().catch(() => ({}));
          throw { status: response.status, message: errJson.msg || errJson.message || `HTTP ${response.status}` };
        }
        throw { status: response.status, message: `HTTP ${response.status}: 非JSON响应` };
      }
      if (!contentType.includes('application/json')) {
        throw { status: 200, message: '服务返回非JSON内容' };
      }
      const json = (await response.json()) as ServiceData;
      if (json.ret_code !== 0) {
        setData(null);
        setError(`查询失败: ${json.msg || '未知错误'}`);
        return;
      }
      setData(json);
      setError('');
    } catch (err: any) {
      setData(null);
      if (err?.name === 'AbortError') {
        setError('查询超时: 请求超过 10 秒');
      } else if (typeof err?.status === 'number') {
        switch (err.status) {
          case 404:
            setError('未找到该服务，请确认名称是否正确');
            break;
          case 400:
            setError('请求参数错误，请检查输入');
            break;
          case 502:
          case 503:
          case 504:
            setError('服务暂时不可用，请稍后重试');
            break;
          case 401:
          case 403:
            setError('暂无权限访问该资源');
            break;
          default:
            setError(`查询失败: ${err.message || '未知错误'}`);
        }
      } else {
        setError(`查询失败: ${err?.message || '未知错误'}`);
      }
    } finally {
      window.clearTimeout(timeoutId);
      setQuerying(false);
    }
  }

  async function submitRenew() {
    if (!data?.name || !renewPeriod || renewing) return;
    setRenewing(true);
    setRestartFeedback('');
    try {
      trackEvent('begin_checkout', {
        purpose: 'renew',
        service_name: data.name,
        renew_period: renewPeriod,
        service_type: data.type || 'personal',
      });
      const url = `${endpoint}/payment/alipay/${isMobileUa() ? 'wap' : 'pc'}_pay_request`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          purpose: 'renew',
          service_name: data.name,
          renew_period: renewPeriod,
          region,
        }),
      });
      if (!response.ok) {
        const err = await response.json().catch(() => ({ message: '续费请求失败，请稍后重试' }));
        throw new Error(err.message || err.msg || '续费请求失败，请稍后重试');
      }
      const html = await response.json();
      setFrameHtml(typeof html === 'string' ? html : String(html));
      setShowFrame(true);
    } catch (err: any) {
      setError(err?.message || '续费失败，请稍后重试');
    } finally {
      setRenewing(false);
    }
  }

  async function restartService() {
    if (!data?.restart_url || restarting) return;
    const proceed = window.confirm('确认要重启该服务吗？重启过程可能需要 10-60 秒。');
    if (!proceed) return;

    setRestarting(true);
    setRestartFeedback('');
    let finalUrl = data.restart_url;
    if (finalUrl.startsWith('http://')) finalUrl = `https://${finalUrl.slice(7)}`;

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 10000);
    try {
      let response = await fetch(finalUrl, {
        method: 'POST',
        signal: controller.signal,
        headers: { Accept: 'application/json' },
      });
      if (response.status === 405) {
        response = await fetch(finalUrl, {
          method: 'GET',
          signal: controller.signal,
          headers: { Accept: 'application/json' },
        });
      }
      const contentType = response.headers.get('content-type') || '';
      const payload = contentType.includes('application/json')
        ? await response.json()
        : { ret_code: response.ok ? 0 : response.status, msg: response.ok ? 'success' : `HTTP ${response.status}` };
      const code = Number(payload?.ret_code);
      const ok = code === 0 || code === 200;
      const rawMsg = payload?.ret_msg || payload?.msg || payload?.message || '';
      setRestartFeedback(
        ok
          ? `重启触发成功：${rawMsg || '重启请求已提交'}。服务将在后台重启，请于 10-60 秒后刷新或再次查询。`
          : `重启失败：${rawMsg || '未知错误'}`,
      );
    } catch (err: any) {
      setRestartFeedback(
        err?.name === 'AbortError' ? '重启超时：请求超过 10 秒' : `重启失败：${err?.message || '未知错误'}`,
      );
    } finally {
      window.clearTimeout(timeoutId);
      setRestarting(false);
    }
  }

  async function copyText(value: string, label: string) {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        const ta = document.createElement('textarea');
        ta.value = value;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setRestartFeedback(`已复制${label}`);
    } catch {
      setRestartFeedback(`复制${label}失败`);
    }
  }

  const inviteLink = useMemo(() => {
    if (!data?.invitecode || typeof window === 'undefined') return '';
    return `${window.location.origin}/pricing/?invitecode=${encodeURIComponent(data.invitecode)}`;
  }, [data?.invitecode]);

  const giftTotal = computeGiftTotalDays(data?.recent_gift_records);
  const statusText = useMemo(() => {
    if (!data?.expired_at) return '';
    const now = new Date();
    const exp = new Date(data.expired_at);
    if (Number.isNaN(exp.getTime())) return '';
    const days = Math.ceil((exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return days >= 0 ? `剩余 ${days} 天` : `已过期 ${Math.abs(days)} 天`;
  }, [data?.expired_at]);

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-10">
      <section className="rounded-3xl bg-[var(--brand-surface)] p-6 ring-1 ring-slate-200 md:p-8">
        <h1 className="text-3xl font-bold text-[var(--brand-text)]">我的服务</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          查询服务状态、续费、复制邀请链接。支付成功后也可回到这里核对订单。
        </p>

        <label className="mt-6 block text-sm font-medium text-slate-700" htmlFor="service_name">
          服务地址
        </label>
        <input
          id="service_name"
          className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2"
          placeholder="示例: https://device1.xxxxxxxxxxxxxxxx.adguardprivate.com"
          value={serviceName}
          onChange={(event) => setServiceName(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') void queryService();
          }}
        />
        <button
          id="queryButton"
          className="mt-4 rounded-xl bg-[var(--brand-primary)] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
          type="button"
          disabled={querying}
          onClick={() => void queryService()}
        >
          {querying ? '查询中...' : '立即查询'}
        </button>
        <p className="mt-3 text-xs leading-6 text-slate-500">
          支持直接粘贴完整服务链接。本地联调 stage API 可在 URL 加 <code>?api=stage</code>。
        </p>
      </section>

      {(error || data) && (
        <section id="query_result" className="rounded-3xl bg-white p-5 ring-1 ring-slate-200">
          {error ? <p className="text-sm text-rose-600">{error}</p> : null}
          {data ? (
            <div className="space-y-4">
              <div className="overflow-hidden rounded-2xl border border-slate-200">
                <table className="w-full text-sm">
                  <tbody>
                    <InfoRow label="服务名称" value={data.name || ''} onCopy={() => void copyText(data.name || '', '服务名称')} />
                    <InfoRow label="创建时间" value={formatDateTime(data.created_at)} />
                    <InfoRow
                      label="过期时间"
                      value={`${formatDateTime(data.expired_at)}${statusText ? `（${statusText}）` : ''}`}
                    />
                    <InfoRow
                      label="服务地址"
                      value={data.url || ''}
                      href={data.url ? `https://${data.url}` : undefined}
                      onCopy={() => void copyText(data.url || '', '服务地址')}
                    />
                    <InfoRow label="订单ID" value={data.payment_id || ''} onCopy={() => void copyText(data.payment_id || '', '订单ID')} />
                    <InfoRow
                      label="支付ID"
                      value={data.vendor_payment_id || ''}
                      onCopy={() => void copyText(data.vendor_payment_id || '', '支付ID')}
                    />
                    <InfoRow label="服务类型" value={data.type === 'family' ? '家庭版' : '个人版'} />
                    {inviteLink ? (
                      <InfoRow label="专属邀请链接" value={inviteLink} onCopy={() => void copyText(inviteLink, '邀请链接')} />
                    ) : null}
                    {giftTotal > 0 ? <InfoRow label="累计赠送时长" value={`${giftTotal} 天`} /> : null}
                  </tbody>
                </table>
              </div>

              {Array.isArray(data.recent_gift_records) && data.recent_gift_records.length > 0 ? (
                <div>
                  <h2 className="text-sm font-semibold text-slate-800">近期赠送记录</h2>
                  <ul className="mt-2 space-y-2 text-sm text-slate-600">
                    {data.recent_gift_records.map((item, index) => (
                      <li key={`${item.gift_source_order_id || index}`} className="rounded-xl bg-slate-50 px-3 py-2">
                        {formatDateTime(item.created_at)} - 赠送 <strong>{Number(item.period) || 0} 天</strong>
                        {item.gift_source_order_id ? `（来源订单: ${item.gift_source_order_id}）` : ''}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="flex flex-wrap items-center gap-3">
                <select
                  className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
                  value={renewPeriod}
                  onChange={(event) => setRenewPeriod(event.target.value)}
                >
                  {renewOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="rounded-xl bg-[var(--brand-primary)] px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
                  disabled={renewing}
                  onClick={() => void submitRenew()}
                >
                  {renewing ? '续费中...' : '续费'}
                </button>
                {data.restart_url ? (
                  <button
                    type="button"
                    className="rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
                    disabled={restarting}
                    onClick={() => void restartService()}
                  >
                    {restarting ? '重启中...' : '重启'}
                  </button>
                ) : null}
                <a className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700" href="/pricing/">
                  去新购
                </a>
              </div>
              {restartFeedback ? <p className="text-sm text-slate-600">{restartFeedback}</p> : null}
            </div>
          ) : null}
        </section>
      )}

      {showFrame ? (
        <iframe
          id="paymentFrame"
          title="支付宝支付页面"
          className="min-h-[600px] w-full max-w-[800px] border-0"
          srcDoc={frameHtml}
        />
      ) : null}

      <section className="rounded-3xl bg-slate-50 p-5 text-sm leading-7 text-slate-700 ring-1 ring-slate-200">
        <h3 className="text-base font-semibold text-slate-900">购买后的回流路径</h3>
        <ol className="mt-2 list-decimal space-y-1 pl-5">
          <li>在定价页完成支付。</li>
          <li>支付宝回跳到后端成功页，展示账号密码与控制台链接。</li>
          <li>回到本页，用服务名查询状态、续费或复制邀请链接。</li>
        </ol>
        <p className="mt-3 text-xs text-slate-500">当前 API: {endpoint}</p>
      </section>
    </div>
  );
}

function InfoRow({
  label,
  value,
  href,
  onCopy,
}: {
  label: string;
  value: string;
  href?: string;
  onCopy?: () => void;
}) {
  return (
    <tr className="border-b border-slate-100 last:border-b-0">
      <td className="w-28 whitespace-nowrap px-3 py-3 text-slate-500">{label}</td>
      <td className="px-3 py-3">
        <div className="flex flex-wrap items-center gap-2">
          {href ? (
            <a className="rounded-md bg-slate-50 px-2 py-1 font-mono text-xs" href={href} target="_blank" rel="noreferrer">
              {value}
            </a>
          ) : (
            <span className="rounded-md bg-slate-50 px-2 py-1 font-mono text-xs">{value}</span>
          )}
          {onCopy ? (
            <button type="button" className="rounded-md border border-slate-200 px-2 py-1 text-xs" onClick={onCopy}>
              复制
            </button>
          ) : null}
        </div>
      </td>
    </tr>
  );
}
