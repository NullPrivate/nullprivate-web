import { useEffect, useMemo, useRef, useState } from 'react';
import {
  familyPlans,
  personalPlans,
  trialPlans,
  type PricingPlan,
} from '../../data/pricing-plans';
import { isMobileUa, resolveApiBase } from '../../lib/api';
import { trackEvent } from '../analytics/track';
import { createCommerceTranslator, type Translator } from '../../lib/commerce-i18n';
import { localizedPath } from '../../lib/site';


const commonFeatureKeys = ['platforms', 'protocols', 'logs', 'statistics', 'rules'];
const personalFeatureKeys = [...commonFeatureKeys, 'personalDevices', 'personalRate', 'personalAudience'];
const familyFeatureKeys = [...commonFeatureKeys, 'familyDevices', 'familyRate', 'independentRules', 'familyAudience'];

function planFeatures(audience: 'personal' | 'family', t: Translator, trial = false) {
  const keys = audience === 'family' ? familyFeatureKeys : personalFeatureKeys;
  return (trial ? ['trial', ...keys] : keys).map((key) => t(`features.${key}`));
}

interface PricingPageProps {
  apiBase: string;
  stageApiBase: string;
  stageHost: string;
  region?: string;
  messages?: Record<string, string>;
  locale?: string;
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
  messages,
  locale = 'zh-cn',
}: PricingPageProps) {
  const t = useMemo(() => createCommerceTranslator(messages), [messages]);
  const [personalId, setPersonalId] = useState(personalPlans[0]?.id ?? '');
  const [familyId, setFamilyId] = useState(familyPlans[0]?.id ?? '');
  const [inviteCode, setInviteCode] = useState('');
  const [inviteMsg, setInviteMsg] = useState('');
  const [inviteOk, setInviteOk] = useState<boolean | null>(null);
  const [inviteState, setInviteState] = useState<InviteState | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentTitle, setPaymentTitle] = useState(t('pricing.payment.creating'));
  const [paymentHint, setPaymentHint] = useState(t('pricing.payment.opening'));
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
      setPaymentTitle(t('pricing.payment.creating'));
      setPaymentHint(t('pricing.payment.opening'));
      slowTimerRef.current = window.setTimeout(() => {
        setPaymentHint(t('pricing.payment.slow'));
      }, 12000);
    }
  }

  async function verifyInvite() {
    const code = inviteCode.trim();
    setInviteMsg('');
    setInviteOk(null);

    if (!code) {
      setInviteState(null);
      setInviteMsg(t('pricing.invite.required'));
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
        const message = (data && (data.message || data.error)) || text || t('pricing.invite.failed');
        setInviteMsg(message);
        setInviteOk(false);
        setInviteState({ code, valid: false, message });
        return;
      }

      const valid = data && typeof data.valid !== 'undefined' ? !!data.valid : true;
      const bonus = data && (data.bonus || data.extra);
      const okMsg = (data && data.message) || (bonus ? t('pricing.invite.bonus', { bonus }) : t('pricing.invite.valid'));
      const badMsg = (data && data.message) || t('pricing.invite.invalid');
      const message = valid ? okMsg : badMsg;
      setInviteMsg(message);
      setInviteOk(valid);
      setInviteState({ code, valid, message });
    } catch {
      setInviteMsg(t('pricing.invite.networkError'));
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
          setInviteMsg(t('pricing.invite.verifyFirstHint'));
          setInviteOk(false);
          throw new Error(t('pricing.invite.verifyFirst'));
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
        const errorData = await response.json().catch(() => ({ message: t('pricing.payment.failed') }));
        throw new Error(errorData.message || t('pricing.payment.failed'));
      }

      const data = await response.json();
      setPaymentTitle(t('pricing.payment.loading'));
      setFrameHtml(typeof data === 'string' ? data : String(data));
      setShowFrame(true);
    } catch (error) {
      setLoading(false);
      setErrorMessage(error instanceof Error ? error.message : t('common.error'));
    }
  }

  return (
    <div lang={locale} className="bg-[var(--marketing-bg)] text-[var(--marketing-text)] mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10">
      <section className="rounded-3xl bg-[var(--marketing-surface)] p-6 shadow-sm ring-1 ring-[var(--marketing-border)] md:p-8">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--marketing-text)] md:text-4xl">{t('pricing.title')}</h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-[var(--marketing-muted)]">
          {t('pricing.description')}
        </p>
        <div className="mt-6 rounded-2xl bg-[var(--marketing-surface)] p-4 ring-1 ring-[var(--marketing-border)]">
          <h2 className="text-lg font-semibold text-[var(--marketing-text)]">{t('pricing.choose.title')}</h2>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-[var(--marketing-muted)]">
            <li>
              {t('pricing.choose.trial')}
            </li>
            <li>
              {t('pricing.choose.personal')}
            </li>
            <li>
              {t('pricing.choose.family')}
            </li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-[var(--marketing-text)]">{t('plans.trial')}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {trialPlans.map((plan) => (
            <PlanCard
              key={plan.id}
              title={t(`plans.${plan.id}.period`)}
              price={plan.price}
              features={planFeatures(plan.id === '872e9d54-c5ab-424c-8dcd-426157f07759' ? 'family' : 'personal', t, true)}
              disabled={paymentLoading}
              buttonText={t('pricing.try')}
              onBuy={() => submitOrder(plan)}
            />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-[var(--marketing-text)]">{t('pricing.plans.title')}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <SelectablePlanCard
            badge={t('plans.personal')}
            plans={personalPlans}
            selectedId={personalId}
            features={planFeatures('personal', t)}
            t={t}
            disabled={paymentLoading}
            onChange={setPersonalId}
            onBuy={() => personalSelected && submitOrder(personalSelected)}
          />
          <SelectablePlanCard
            badge={t('plans.family')}
            plans={familyPlans}
            selectedId={familyId}
            features={planFeatures('family', t)}
            t={t}
            disabled={paymentLoading}
            onChange={setFamilyId}
            onBuy={() => familySelected && submitOrder(familySelected)}
          />
        </div>
      </section>

      <section className="rounded-3xl bg-[var(--marketing-surface)] p-5 ring-1 ring-[var(--marketing-border)]">
        <h2 className="text-lg font-semibold text-[var(--marketing-text)]">{t('pricing.invite.title')}</h2>
        <ul className="mt-3 space-y-2 text-sm text-[var(--marketing-muted)]">
          <li>
            {t('pricing.invite.description')}
          </li>
          <li>
            {t('pricing.invite.excluded')}
          </li>
        </ul>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <label className="text-sm text-[var(--marketing-muted)]" htmlFor="invitecode">
            {t('pricing.invite.label')}
          </label>
          <input
            id="invitecode"
            className="bg-[var(--marketing-surface)] text-[var(--marketing-text)] placeholder:text-[var(--marketing-muted)] min-w-[220px] flex-1 rounded-lg border border-[var(--marketing-border)] px-3 py-2 text-sm"
            placeholder={t('pricing.invite.placeholder')}
            autoComplete="one-time-code"
            inputMode="text"
            value={inviteCode}
            onChange={(event) => setInviteCode(event.target.value)}
          />
          <button
            id="inviteVerifyBtn"
            type="button"
            className="rounded-lg bg-[var(--marketing-primary)] px-3 py-2 text-sm font-medium text-[var(--marketing-on-primary)] disabled:opacity-60"
            disabled={verifying || paymentLoading}
            onClick={verifyInvite}
          >
            {verifying ? t('pricing.invite.verifying') : t('pricing.invite.verify')}
          </button>
          <span
            id="inviteVerifyMsg"
            className={`rounded-md px-2 py-1 text-sm ${inviteOk === true ? 'bg-emerald-100 text-emerald-900' : inviteOk === false ? 'bg-rose-100 text-rose-900' : 'text-[var(--marketing-muted)]'}`}
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
          className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-xl border border-[var(--marketing-border)] bg-[var(--marketing-surface)] p-6 text-center"
          role="status"
          aria-live="polite"
          aria-atomic="true"
          hidden={!paymentLoading}
        >
          <span
            className="payment-spinner mb-6 h-12 w-12 rounded-full border-[3px] border-[var(--marketing-border)] border-t-[var(--marketing-primary)]"
            aria-hidden="true"
          />
          <div id="paymentLoadingTitle" className="text-lg font-semibold text-[var(--marketing-text)]">
            {paymentTitle}
          </div>
          <p id="paymentLoadingHint" className="mt-2 text-sm text-[var(--marketing-muted)]">
            {paymentHint}
          </p>
        </div>

        <div
          id="errorMessage"
          className="mb-3 rounded-xl bg-rose-100 px-4 py-3 text-sm text-rose-900"
          role="alert"
          style={{ display: errorMessage ? 'block' : 'none' }}
        >
          {errorMessage}
        </div>

        <iframe
          ref={frameRef}
          id="paymentFrame"
          title={t('common.paymentFrame')}
          className="min-h-[600px] w-full border-0"
          style={{ display: showFrame ? 'block' : 'none' }}
          srcDoc={frameHtml || undefined}
          onLoad={onPaymentFrameLoad}
        />
      </section>

      <section id="payment_notice" className="rounded-3xl bg-[var(--marketing-surface)] p-5 ring-1 ring-[var(--marketing-border)]" hidden={!showNotice}>
        <h3 className="text-lg font-semibold text-[var(--marketing-text)]">{t('pricing.notice.title')}</h3>
        <ul className="mt-3 space-y-2 text-sm text-[var(--marketing-muted)]">
          <li>
            {t('pricing.notice.success')}
          </li>
          <li>
            <a className="font-semibold text-[var(--marketing-primary)] underline" href={localizedPath('/my-service/', locale)}>{t('pricing.notice.query')}</a>
          </li>
          <li>{t('pricing.notice.support')}</li>
        </ul>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            className="rounded-xl bg-[var(--marketing-primary)] px-4 py-2 text-sm font-semibold text-[var(--marketing-on-primary)]"
            href={localizedPath('/my-service/', locale)}
          >
            {t('pricing.notice.queryAction')}
          </a>
          <a className="rounded-xl bg-[var(--marketing-soft)] px-4 py-2 text-sm font-semibold text-[var(--marketing-text)]" href={localizedPath('/docs/startup/config/', locale)}>
            {t('pricing.notice.guide')}
          </a>
        </div>
      </section>

      <section className="rounded-3xl bg-[var(--marketing-surface)] p-5 text-sm leading-7 text-[var(--marketing-text)] ring-1 ring-[var(--marketing-border)]">
        <h3 className="text-base font-semibold text-[var(--marketing-text)]">{t('pricing.help.title')}</h3>
        <p className="mt-2">
          {t('pricing.help.wechat')}<span className="font-semibold text-[var(--marketing-primary)]">private6688</span>
          <br />
          {t('pricing.help.email')}{' '}
          <a className="font-semibold text-[var(--marketing-primary)]" href="mailto:service1@nullprivate.com">
            service1@nullprivate.com
          </a>
          <br />
          {t('pricing.help.description')}
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
}: {
  title: string;
  price: string;
  features: string[];
  buttonText: string;
  onBuy: () => void;
  disabled?: boolean;
}) {
  return (
    <article className="flex h-full flex-col rounded-3xl bg-[var(--marketing-surface)] p-5 shadow-sm ring-1 ring-[var(--marketing-border)]">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-xl font-semibold text-[var(--marketing-text)]">{title}</h3>
        <p className="text-2xl font-bold text-[var(--marketing-primary)]">{price}</p>
      </div>
      <ul className="mt-4 flex-1 space-y-2 text-sm leading-6 text-[var(--marketing-muted)]">
        {features.map((feature) => (
          <li key={feature}>• {feature}</li>
        ))}
      </ul>
      <div className="mt-5 flex justify-end">
        <button
          type="button"
          className="item_btn rounded-lg bg-[var(--marketing-primary)] px-4 py-2 text-sm font-medium text-[var(--marketing-on-primary)] disabled:opacity-60"
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
  t,
  plans,
  selectedId,
  features,
  onChange,
  onBuy,
  disabled,
}: {
  badge: string;
  t: Translator;
  plans: PricingPlan[];
  selectedId: string;
  features: string[];
  onChange: (id: string) => void;
  onBuy: () => void;
  disabled?: boolean;
}) {
  const selected = plans.find((plan) => plan.id === selectedId) ?? plans[0];
  return (
    <article className="flex h-full flex-col rounded-3xl bg-[var(--marketing-surface)] p-5 shadow-sm ring-1 ring-[var(--marketing-border)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="inline-flex rounded-full bg-[var(--marketing-soft)] px-2.5 py-1 text-xs font-semibold text-[var(--marketing-primary)]">{badge}</span>
          <h3 className="mt-2 text-xl font-semibold text-[var(--marketing-text)]">{selected ? t(`plans.${selected.id}.period`) : ''}</h3>
        </div>
        <p className="text-2xl font-bold text-[var(--marketing-primary)]">{selected?.price}</p>
      </div>
      <ul className="mt-4 flex-1 space-y-2 text-sm leading-6 text-[var(--marketing-muted)]">
        {features.map((feature) => (
          <li key={feature}>• {feature}</li>
        ))}
      </ul>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <label className="text-sm text-[var(--marketing-muted)]" htmlFor={`${plans[0]?.audience}-plan-select`}>
          {t('common.duration')}
        </label>
        <select
          id={`${plans[0]?.audience}-plan-select`}
          className="bg-[var(--marketing-surface)] text-[var(--marketing-text)] placeholder:text-[var(--marketing-muted)] rounded-lg border border-[var(--marketing-border)] px-3 py-2 text-sm"
          value={selectedId}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
        >
          {plans.map((plan) => (
            <option key={plan.id} value={plan.id}>
              {t(`plans.${plan.id}.period`)}
            </option>
          ))}
        </select>
        <span className="flex-1" />
        <button
          type="button"
          className="item_btn rounded-lg bg-[var(--marketing-primary)] px-4 py-2 text-sm font-medium text-[var(--marketing-on-primary)] disabled:opacity-60"
          disabled={disabled}
          onClick={onBuy}
        >
          {t('common.buy')}
        </button>
      </div>
    </article>
  );
}
