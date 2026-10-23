import { useEffect, useMemo, useState } from 'react';
import { familyRenewOptions, personalRenewOptions } from '../../data/renew-plans';
import { isMobileUa, resolveApiBase } from '../../lib/api';
import { trackEvent } from '../analytics/track';
import { createCommerceTranslator } from '../../lib/commerce-i18n';
import { localizedPath } from '../../lib/site';

interface MyServicePageProps {
  apiBase: string;
  stageApiBase: string;
  stageHost: string;
  region?: string;
  messages?: Record<string, string>;
  locale?: string;
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

function formatDateTime(iso: string | undefined, locale: string) {
  try {
    if (!iso) return '';
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleString(locale);
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
  messages,
  locale = 'zh-cn',
}: MyServicePageProps) {
  const t = useMemo(() => createCommerceTranslator(messages), [messages]);
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
      setError(t('service.query.required'));
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
        throw { status: response.status, message: t('service.query.httpNonJson', { status: response.status }) };
      }
      if (!contentType.includes('application/json')) {
        throw { status: 200, message: t('service.query.nonJson') };
      }
      const json = (await response.json()) as ServiceData;
      if (json.ret_code !== 0) {
        setData(null);
        setError(t('service.query.failed', { message: json.msg || t('common.unknownError') }));
        return;
      }
      setData(json);
      setError('');
    } catch (err: any) {
      setData(null);
      if (err?.name === 'AbortError') {
        setError(t('service.query.timeout'));
      } else if (typeof err?.status === 'number') {
        switch (err.status) {
          case 404:
            setError(t('service.query.notFound'));
            break;
          case 400:
            setError(t('service.query.badRequest'));
            break;
          case 502:
          case 503:
          case 504:
            setError(t('service.query.unavailable'));
            break;
          case 401:
          case 403:
            setError(t('service.query.forbidden'));
            break;
          default:
            setError(t('service.query.failed', { message: err.message || t('common.unknownError') }));
        }
      } else {
        setError(t('service.query.failed', { message: err?.message || t('common.unknownError') }));
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
        const err = await response.json().catch(() => ({ message: t('service.renew.requestFailed') }));
        throw new Error(err.message || err.msg || t('service.renew.requestFailed'));
      }
      const html = await response.json();
      setFrameHtml(typeof html === 'string' ? html : String(html));
      setShowFrame(true);
    } catch (err: any) {
      setError(err?.message || t('service.renew.failed'));
    } finally {
      setRenewing(false);
    }
  }

  async function restartService() {
    if (!data?.restart_url || restarting) return;
    const proceed = window.confirm(t('service.restart.confirm'));
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
          ? t('service.restart.success', { message: rawMsg || t('service.restart.submitted') })
          : t('service.restart.failed', { message: rawMsg || t('common.unknownError') }),
      );
    } catch (err: any) {
      setRestartFeedback(
        err?.name === 'AbortError' ? t('service.restart.timeout') : t('service.restart.failed', { message: err?.message || t('common.unknownError') }),
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
      setRestartFeedback(t('service.copy.success', { label }));
    } catch {
      setRestartFeedback(t('service.copy.failed', { label }));
    }
  }

  const inviteLink = useMemo(() => {
    if (!data?.invitecode || typeof window === 'undefined') return '';
    return `${window.location.origin}${localizedPath('/pricing/', locale)}?invitecode=${encodeURIComponent(data.invitecode)}`;
  }, [data?.invitecode]);

  const giftTotal = computeGiftTotalDays(data?.recent_gift_records);
  const statusText = useMemo(() => {
    if (!data?.expired_at) return '';
    const now = new Date();
    const exp = new Date(data.expired_at);
    if (Number.isNaN(exp.getTime())) return '';
    const days = Math.ceil((exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return days >= 0 ? t('service.status.remaining', { days }) : t('service.status.expired', { days: Math.abs(days) });
  }, [data?.expired_at, t]);

  return (
    <div lang={locale} className="bg-[var(--marketing-bg)] text-[var(--marketing-text)] mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-10">
      <section className="rounded-3xl bg-[var(--marketing-surface)] p-6 ring-1 ring-[var(--marketing-border)] md:p-8">
        <h1 className="text-3xl font-bold text-[var(--marketing-text)]">{t('service.title')}</h1>
        <p className="mt-3 text-sm leading-7 text-[var(--marketing-muted)]">
          {t('service.description')}
        </p>

        <label className="mt-6 block text-sm font-medium text-[var(--marketing-text)]" htmlFor="service_name">
          {t('service.fields.address')}
        </label>
        <input
          id="service_name"
          className="bg-[var(--marketing-surface)] text-[var(--marketing-text)] placeholder:text-[var(--marketing-muted)] mt-2 w-full rounded-xl border border-[var(--marketing-border)] px-3 py-2"
          placeholder={t('service.query.placeholder')}
          value={serviceName}
          onChange={(event) => setServiceName(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') void queryService();
          }}
        />
        <button
          id="queryButton"
          className="mt-4 rounded-xl bg-[var(--marketing-primary)] px-4 py-2 text-sm font-semibold text-[var(--marketing-on-primary)] disabled:opacity-60"
          type="button"
          disabled={querying}
          onClick={() => void queryService()}
        >
          {querying ? t('service.query.loading') : t('service.query.action')}
        </button>
        <p className="mt-3 text-xs leading-6 text-[var(--marketing-muted)]">
          {t('service.query.hint')}
        </p>
      </section>

      {(error || data) && (
        <section id="query_result" className="rounded-3xl bg-[var(--marketing-surface)] p-5 ring-1 ring-[var(--marketing-border)]">
          {error ? <p role="alert" className="rounded-lg bg-rose-100 px-3 py-2 text-sm text-rose-900">{error}</p> : null}
          {data ? (
            <div className="space-y-4">
              <div className="overflow-hidden rounded-2xl border border-[var(--marketing-border)]">
                <table className="w-full text-sm">
                  <tbody>
                    <InfoRow copyLabel={t('common.copy')} label={t('service.fields.name')} value={data.name || ''} onCopy={() => void copyText(data.name || '', t('service.fields.name'))} />
                    <InfoRow copyLabel={t('common.copy')} label={t('service.fields.createdAt')} value={formatDateTime(data.created_at, locale)} />
                    <InfoRow
                      copyLabel={t('common.copy')}
                      label={t('service.fields.expiredAt')}
                      value={statusText ? t('service.status.date', { date: formatDateTime(data.expired_at, locale), status: statusText }) : formatDateTime(data.expired_at, locale)}
                    />
                    <InfoRow
                      copyLabel={t('common.copy')}
                      label={t('service.fields.address')}
                      value={data.url || ''}
                      href={data.url ? `https://${data.url}` : undefined}
                      onCopy={() => void copyText(data.url || '', t('service.fields.address'))}
                    />
                    <InfoRow copyLabel={t('common.copy')} label={t('service.fields.orderId')} value={data.payment_id || ''} onCopy={() => void copyText(data.payment_id || '', t('service.fields.orderId'))} />
                    <InfoRow
                      copyLabel={t('common.copy')}
                      label={t('service.fields.paymentId')}
                      value={data.vendor_payment_id || ''}
                      onCopy={() => void copyText(data.vendor_payment_id || '', t('service.fields.paymentId'))}
                    />
                    <InfoRow copyLabel={t('common.copy')} label={t('service.fields.type')} value={data.type === 'family' ? t('plans.family') : t('plans.personal')} />
                    {inviteLink ? (
                      <InfoRow copyLabel={t('common.copy')} label={t('service.fields.inviteLink')} value={inviteLink} onCopy={() => void copyText(inviteLink, t('service.inviteLink'))} />
                    ) : null}
                    {giftTotal > 0 ? <InfoRow copyLabel={t('common.copy')} label={t('service.fields.giftTotal')} value={t('common.days', { days: giftTotal })} /> : null}
                  </tbody>
                </table>
              </div>

              {Array.isArray(data.recent_gift_records) && data.recent_gift_records.length > 0 ? (
                <div>
                  <h2 className="text-sm font-semibold text-[var(--marketing-text)]">{t('service.gifts.title')}</h2>
                  <ul className="mt-2 space-y-2 text-sm text-[var(--marketing-muted)]">
                    {data.recent_gift_records.map((item, index) => (
                      <li key={`${item.gift_source_order_id || index}`} className="rounded-xl bg-[var(--marketing-surface)] px-3 py-2">
                        {t('service.gifts.record', {
                          date: formatDateTime(item.created_at, locale),
                          days: Number(item.period) || 0,
                          source: item.gift_source_order_id ? t('service.gifts.source', { orderId: item.gift_source_order_id }) : '',
                        })}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="flex flex-wrap items-center gap-3">
                <select
                  aria-label={t('service.renew.duration')}
                  className="bg-[var(--marketing-surface)] text-[var(--marketing-text)] placeholder:text-[var(--marketing-muted)] rounded-xl border border-[var(--marketing-border)] px-3 py-2 text-sm"
                  value={renewPeriod}
                  onChange={(event) => setRenewPeriod(event.target.value)}
                >
                  {renewOptions.map((option) => (
                    <option key={option.id} value={option.id}>
                      {t(`renew.${option.id}.label`)}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="rounded-xl bg-[var(--marketing-primary)] px-4 py-2 text-sm font-semibold text-[var(--marketing-on-primary)] disabled:opacity-60"
                  disabled={renewing}
                  onClick={() => void submitRenew()}
                >
                  {renewing ? t('service.renew.loading') : t('service.renew.action')}
                </button>
                {data.restart_url ? (
                  <button
                    type="button"
                    className="rounded-xl bg-[var(--marketing-primary)] px-4 py-2 text-sm font-semibold text-[var(--marketing-on-primary)] disabled:opacity-60"
                    disabled={restarting}
                    onClick={() => void restartService()}
                  >
                    {restarting ? t('service.restart.loading') : t('service.restart.action')}
                  </button>
                ) : null}
                <a className="rounded-xl bg-[var(--marketing-soft)] px-4 py-2 text-sm font-semibold text-[var(--marketing-text)]" href={localizedPath('/pricing/', locale)}>
                  {t('service.buy')}
                </a>
              </div>
              {restartFeedback ? <p role="status" className="text-sm text-[var(--marketing-text)]">{restartFeedback}</p> : null}
            </div>
          ) : null}
        </section>
      )}

      {showFrame ? (
        <iframe
          id="paymentFrame"
          title={t('common.paymentFrame')}
          className="min-h-[600px] w-full max-w-[800px] border-0"
          srcDoc={frameHtml}
        />
      ) : null}

      <section className="rounded-3xl bg-[var(--marketing-surface)] p-5 text-sm leading-7 text-[var(--marketing-text)] ring-1 ring-[var(--marketing-border)]">
        <h3 className="text-base font-semibold text-[var(--marketing-text)]">{t('service.return.title')}</h3>
        <ol className="mt-2 list-decimal space-y-1 pl-5">
          <li>{t('service.return.pay')}</li>
          <li>{t('service.return.credentials')}</li>
          <li>{t('service.return.query')}</li>
        </ol>
        <p className="mt-3 text-xs text-[var(--marketing-muted)]">{t('service.api', { endpoint })}</p>
      </section>
    </div>
  );
}

function InfoRow({
  label,
  value,
  href,
  onCopy,
  copyLabel,
}: {
  label: string;
  value: string;
  href?: string;
  onCopy?: () => void;
  copyLabel: string;
}) {
  return (
    <tr className="border-b border-[var(--marketing-border)] last:border-b-0">
      <td className="w-28 whitespace-nowrap px-3 py-3 text-[var(--marketing-muted)]">{label}</td>
      <td className="px-3 py-3">
        <div className="flex flex-wrap items-center gap-2">
          {href ? (
            <a className="rounded-md bg-[var(--marketing-surface)] px-2 py-1 font-mono text-xs" href={href} target="_blank" rel="noreferrer">
              {value}
            </a>
          ) : (
            <span className="rounded-md bg-[var(--marketing-surface)] px-2 py-1 font-mono text-xs">{value}</span>
          )}
          {onCopy ? (
            <button type="button" className="rounded-md border border-[var(--marketing-border)] px-2 py-1 text-xs" onClick={onCopy}>
              {copyLabel}
            </button>
          ) : null}
        </div>
      </td>
    </tr>
  );
}
