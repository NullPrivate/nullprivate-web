import { useEffect, useMemo, useRef, useState } from 'react';
import {
  familyFeatureLines,
  familyPlans,
  personalFeatureLines,
  personalPlans,
  trialFeatureLines,
  trialPlans,
  type PricingPlan,
} from '../../data/pricing-plans';
import { isMobileUa, resolveApiBase } from '../../lib/api';
import { trackEvent } from '../analytics/track';

interface PricingPageProps {
  apiBase: string;
  stageApiBase: string;
  stageHost: string;
  region?: string;
}

interface InviteState {
  code: string;
  valid: boolean;
  message: string;
}

export default function PricingPage({
  apiBase,
  stageApiBase,
  stageHost,
  region = 'zh_cn',
}: PricingPageProps) {
  const [personalId, setPersonalId] = useState(personalPlans[0]?.id ?? '');
  const [familyId, setFamilyId] = useState(familyPlans[0]?.id ?? '');
  const [inviteCode, setInviteCode] = useState('');
  const [inviteMsg, setInviteMsg] = useState('');
  const [inviteOk, setInviteOk] = useState<boolean | null>(null);
  const [inviteState, setInviteState] = useState<InviteState | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentTitle, setPaymentTitle] = useState('正在创建订单…');
  const [paymentHint, setPaymentHint] = useState('请稍候，即将打开支付宝支付页面');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPanel, setShowPanel] = useState(false);
  const [showNotice, setShowNotice] = useState(false);
  const [frameHtml, setFrameHtml] = useState('');
  const [showFrame, setShowFrame] = useState(false);

  const paymentLoadingRef = useRef(false);
  const slowTimerRef = useRef<number | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLIFrameElement | null>(null);

  const personalSelected = useMemo(
    () => personalPlans.find((plan) => plan.id === personalId) ?? personalPlans[0],
    [personalId],
  );
  const familySelected = useMemo(
    () => familyPlans.find((plan) => plan.id === familyId) ?? familyPlans[0],
    [familyId],
  );

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search || '');
      const fromUrl = params.get('invite_code') || params.get('invitecode') || params.get('invite') || '';
      const cached = window.localStorage.getItem('invitecode') || '';
      setInviteCode((fromUrl || cached || '').trim());
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    paymentLoadingRef.current = paymentLoading;
  }, [paymentLoading]);

  function clearSlowTimer() {
    if (slowTimerRef.current) {
      window.clearTimeout(slowTimerRef.current);
      slowTimerRef.current = null;
    }
  }

  function setLoading(active: boolean) {
    setPaymentLoading(active);
    paymentLoadingRef.current = active;
    clearSlowTimer();
    if (active) {
      setPaymentTitle('正在创建订单…');
      setPaymentHint('请稍候，即将打开支付宝支付页面');
      slowTimerRef.current = window.setTimeout(() => {
        setPaymentHint('加载时间较长，请耐心等待，无需重复下单');
      }, 12000);
    }
  }

  async function verifyInvite() {
    const code = inviteCode.trim();
    setInviteMsg('');
    setInviteOk(null);

    if (!code) {
      setInviteState(null);
      setInviteMsg('请输入邀请码');
      setInviteOk(false);
      return;
    }

    setVerifying(true);
    try {
      const endpoint = resolveApiBase(apiBase, stageApiBase, stageHost);
      const url = `${endpoint}/invite/verify?invitecode=${encodeURIComponent(code)}`;
      const res = await fetch(url, {
        method: 'GET',
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
      });

      let data: any = null;
      let text = '';
      try {
        data = await res.json();
      } catch {
        try {
          text = await res.text();
        } catch {
          text = '';
        }
      }

      if (!res.ok) {
        const message = (data && (data.message || data.error)) || text || '验证失败，请稍后重试';
        setInviteMsg(message);
        setInviteOk(false);
        setInviteState({ code, valid: false, message });
        return;
      }

      const valid = data && typeof data.valid !== 'undefined' ? !!data.valid : true;
      const bonus = data && (data.bonus || data.extra);
      const okMsg = (data && data.message) || (bonus ? `邀请码有效：赠送 ${bonus}` : '邀请码有效');
      const badMsg = (data && data.message) || '邀请码无效';
      const message = valid ? okMsg : badMsg;
      setInviteMsg(message);
      setInviteOk(valid);
      setInviteState({ code, valid, message });
    } catch {
      setInviteMsg('网络错误，稍后重试');
      setInviteOk(false);
      setInviteState({ code, valid: false, message: 'network_error' });
    } finally {
      setVerifying(false);
    }
  }

  function onPaymentFrameLoad() {
    if (!paymentLoadingRef.current) return;
    const frame = frameRef.current;
    try {
      const url = frame?.contentWindow?.location.href;
      if (url === 'about:blank' || url === 'about:srcdoc') return;
    } catch {
      // cross-origin payment page means load completed
    }
    setLoading(false);
    setShowNotice(true);
  }

  async function submitOrder(plan: PricingPlan) {
    if (paymentLoadingRef.current) return;

    trackEvent('select_plan', {
      plan_id: plan.id,
      plan_period: plan.period,
      plan_audience: plan.audience,
      value: plan.price,
    });
    trackEvent('begin_checkout', {
      plan_id: plan.id,
      plan_period: plan.period,
      plan_audience: plan.audience,
      value: plan.price,
    });

    setShowPanel(true);
    setErrorMessage('');
    setShowFrame(false);
    setShowNotice(false);
    setFrameHtml('');
    setLoading(true);

    requestAnimationFrame(() => {
      panelRef.current?.scrollIntoView({
        block: 'start',
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      });
    });

    try {
      const code = inviteCode.trim();
      if (code) {
        const valid = inviteState && inviteState.code === code && inviteState.valid === true;
        if (!valid) {
          setInviteMsg('请先点击“验证邀请码”，确认有效后再下单');
          setInviteOk(false);
          throw new Error('请先验证邀请码后再下单');
        }
      }

      const endpoint = resolveApiBase(apiBase, stageApiBase, stageHost);
      const url = `${endpoint}/payment/alipay/${isMobileUa() ? 'wap' : 'pc'}_pay_request`;
      const payload: Record<string, string | number> = {
        purpose: 'new',
        product_id: plan.id,
        region,
        timestamp: Date.now(),
      };
      if (code) {
        payload.invitecode = code;
        try {
          window.localStorage.setItem('invitecode', code);
        } catch {
          // ignore
        }
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: '支付请求失败，请稍后重试' }));
        throw new Error(errorData.message || '支付请求失败，请稍后重试');
      }

      const data = await response.json();
      setPaymentTitle('正在加载支付页面…');
      setFrameHtml(typeof data === 'string' ? data : String(data));
      setShowFrame(true);
    } catch (error) {
      setLoading(false);
      setErrorMessage(error instanceof Error ? error.message : '发生错误，请稍后重试');
    }
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10">
      <section className="rounded-3xl bg-[var(--brand-surface)] p-6 shadow-sm ring-1 ring-black/5 md:p-8">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--brand-text)] md:text-4xl">购买宁屏服务</h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
          无需注册, 尊重隐私. 适合个人和家庭的多台设备使用的 宁屏服务.
        </p>
        <div className="mt-6 rounded-2xl bg-white p-4 ring-1 ring-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">如何选择</h2>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
            <li>
              <strong>体验版</strong>：限时 7 天体验，用于验证兼容性与拦截效果
            </li>
            <li>
              <strong>个人版</strong>：5 台设备、每秒 30 次请求，适合个人多设备
            </li>
            <li>
              <strong>家庭版</strong>：20 台设备、每秒 100 次请求，适合多人家庭，
              <strong>每台设备可独立设置规则</strong>
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-[var(--brand-text)]">体验版</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {trialPlans.map((plan) => (
            <PlanCard
              key={plan.id}
              title={plan.period}
              price={plan.price}
              features={trialFeatureLines(plan.id)}
              accent
              disabled={paymentLoading}
              buttonText={plan.buttonText || '立即体验'}
              onBuy={() => submitOrder(plan)}
            />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-[var(--brand-text)]">正式套餐</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <SelectablePlanCard
            badge="个人版"
            badgeClass="bg-sky-100 text-sky-700"
            plans={personalPlans}
            selectedId={personalId}
            features={personalFeatureLines}
            disabled={paymentLoading}
            onChange={setPersonalId}
            onBuy={() => personalSelected && submitOrder(personalSelected)}
          />
          <SelectablePlanCard
            badge="家庭版"
            badgeClass="bg-violet-100 text-violet-700"
            plans={familyPlans}
            selectedId={familyId}
            features={familyFeatureLines}
            disabled={paymentLoading}
            onChange={setFamilyId}
            onBuy={() => familySelected && submitOrder(familySelected)}
          />
        </div>
      </section>

      <section className="rounded-3xl bg-white p-5 ring-1 ring-slate-200">
        <h2 className="text-lg font-semibold text-slate-900">邀请有礼</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-600">
          <li>
            填写邀请人的 <span className="font-semibold text-[var(--brand-accent)]">邀请码</span>，
            <strong>您与邀请人</strong>均可获得<span className="font-semibold text-[var(--brand-accent)]">额外赠送使用时长</span>
          </li>
          <li>
            <strong>试用版</strong>不参与邀请赠送
          </li>
        </ul>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <label className="text-sm text-slate-600" htmlFor="invitecode">
            邀请码（可选）
          </label>
          <input
            id="invitecode"
            className="min-w-[220px] flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
            placeholder="输入邀请码"
            autoComplete="one-time-code"
            inputMode="text"
            value={inviteCode}
            onChange={(event) => setInviteCode(event.target.value)}
          />
          <button
            id="inviteVerifyBtn"
            type="button"
            className="rounded-lg bg-[var(--brand-primary-soft)] px-3 py-2 text-sm font-medium text-white disabled:opacity-60"
            disabled={verifying || paymentLoading}
            onClick={verifyInvite}
          >
            {verifying ? '验证中...' : '验证邀请码'}
          </button>
          <span
            id="inviteVerifyMsg"
            className={`text-sm ${inviteOk === true ? 'text-emerald-600' : inviteOk === false ? 'text-rose-600' : 'text-slate-500'}`}
            aria-live="polite"
          >
            {inviteMsg}
          </span>
        </div>
      </section>

      <section
        ref={panelRef}
        id="paymentPanel"
        className="payment-panel relative mx-auto w-full max-w-[800px]"
        aria-busy={paymentLoading}
        hidden={!showPanel}
        style={paymentLoading ? { minHeight: 600 } : undefined}
      >
        <div
          id="paymentLoading"
          className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-slate-50 p-6 text-center"
          role="status"
          aria-live="polite"
          aria-atomic="true"
          hidden={!paymentLoading}
        >
          <span
            className="payment-spinner mb-6 h-12 w-12 rounded-full border-[3px] border-slate-200 border-t-[var(--brand-primary)]"
            aria-hidden="true"
          />
          <div id="paymentLoadingTitle" className="text-lg font-semibold text-slate-900">
            {paymentTitle}
          </div>
          <p id="paymentLoadingHint" className="mt-2 text-sm text-slate-600">
            {paymentHint}
          </p>
        </div>

        <div
          id="errorMessage"
          className="mb-3 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700"
          role="alert"
          style={{ display: errorMessage ? 'block' : 'none' }}
        >
          {errorMessage}
        </div>

        <iframe
          ref={frameRef}
          id="paymentFrame"
          title="支付宝支付页面"
          className="min-h-[600px] w-full border-0"
          style={{ display: showFrame ? 'block' : 'none' }}
          srcDoc={frameHtml || undefined}
          onLoad={onPaymentFrameLoad}
        />
      </section>

      <section id="payment_notice" className="rounded-3xl bg-white p-5 ring-1 ring-slate-200" hidden={!showNotice}>
        <h3 className="text-lg font-semibold text-slate-900">支付提示</h3>
        <ul className="mt-3 space-y-2 text-sm text-slate-600">
          <li>
            支付成功后，支付宝会回跳到后端成功页，展示
            <span className="font-semibold text-[var(--brand-accent)]">账号密码</span>与
            <span className="font-semibold text-[var(--brand-accent)]">控制台链接</span>，请妥善保管。
          </li>
          <li>
            如果支付成功后长时间未返回，可前往
            <a className="font-semibold text-[var(--brand-primary)] underline" href="/my-service/">我的服务</a>
            查询订单与服务状态。
          </li>
          <li>如果您遇到支付问题, 请联系客服, 我们会尽快处理.</li>
        </ul>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            className="rounded-xl bg-[var(--brand-primary)] px-4 py-2 text-sm font-semibold text-white"
            href="/my-service/"
          >
            已支付，去我的服务查询
          </a>
          <a className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700" href="/docs/startup/config/">
            查看配置指南
          </a>
        </div>
      </section>

      <section className="rounded-3xl bg-slate-50 p-5 text-sm leading-7 text-slate-700 ring-1 ring-slate-200">
        <h3 className="text-base font-semibold text-slate-900">需要帮助？</h3>
        <p className="mt-2">
          微信：<span className="font-semibold text-rose-700">private6688</span>
          <br />
          或发送邮件到{' '}
          <a className="font-semibold text-rose-700" href="mailto:service1@nullprivate.com">
            service1@nullprivate.com
          </a>
          <br />
          请尽量描述问题场景与设备平台，便于快速排查。
        </p>
      </section>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .payment-spinner { animation: spin 1s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .payment-spinner { animation: none; }
        }
        .payment-panel { scroll-margin-top: 6rem; }
      `}</style>
    </div>
  );
}

function PlanCard({
  title,
  price,
  features,
  buttonText,
  onBuy,
  disabled,
  accent = false,
}: {
  title: string;
  price: string;
  features: string[];
  buttonText: string;
  onBuy: () => void;
  disabled?: boolean;
  accent?: boolean;
}) {
  return (
    <article className="flex h-full flex-col rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
        <p className="text-2xl font-bold text-[var(--brand-primary)]">{price}</p>
      </div>
      <ul className="mt-4 flex-1 space-y-2 text-sm leading-6 text-slate-600">
        {features.map((feature) => (
          <li key={feature}>• {feature}</li>
        ))}
      </ul>
      <div className="mt-5 flex justify-end">
        <button
          type="button"
          className={`item_btn rounded-lg px-4 py-2 text-sm font-medium text-white disabled:opacity-60 ${
            accent ? 'bg-[var(--brand-accent)]' : 'bg-[var(--brand-primary)]'
          }`}
          disabled={disabled}
          onClick={onBuy}
        >
          {buttonText}
        </button>
      </div>
    </article>
  );
}

function SelectablePlanCard({
  badge,
  badgeClass,
  plans,
  selectedId,
  features,
  onChange,
  onBuy,
  disabled,
}: {
  badge: string;
  badgeClass: string;
  plans: PricingPlan[];
  selectedId: string;
  features: string[];
  onChange: (id: string) => void;
  onBuy: () => void;
  disabled?: boolean;
}) {
  const selected = plans.find((plan) => plan.id === selectedId) ?? plans[0];
  return (
    <article className="flex h-full flex-col rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${badgeClass}`}>{badge}</span>
          <h3 className="mt-2 text-xl font-semibold text-slate-900">{selected?.period}</h3>
        </div>
        <p className="text-2xl font-bold text-[var(--brand-primary)]">{selected?.price}</p>
      </div>
      <ul className="mt-4 flex-1 space-y-2 text-sm leading-6 text-slate-600">
        {features.map((feature) => (
          <li key={feature}>• {feature}</li>
        ))}
      </ul>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <label className="text-sm text-slate-600" htmlFor={`${badge}-plan-select`}>
          时长
        </label>
        <select
          id={`${badge}-plan-select`}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          value={selectedId}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
        >
          {plans.map((plan) => (
            <option key={plan.id} value={plan.id}>
              {plan.period}
            </option>
          ))}
        </select>
        <span className="flex-1" />
        <button
          type="button"
          className="item_btn rounded-lg bg-[var(--brand-primary)] px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
          disabled={disabled}
          onClick={onBuy}
        >
          购买
        </button>
      </div>
    </article>
  );
}
