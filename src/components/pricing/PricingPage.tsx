import { useMemo, useState } from 'react';
import { trackEvent } from '../analytics/track';

export interface PricingPlan {
  id: string;
  period: string;
  price: string;
  audience: 'trial' | 'personal' | 'family';
  highlight?: string;
  features: string[];
  buttonText: string;
}

interface PricingPageProps {
  apiBase: string;
  stageApiBase: string;
  stageHost: string;
  plans: PricingPlan[];
}

function resolveApiBase(apiBase: string, stageApiBase: string, stageHost: string) {
  if (typeof window !== 'undefined' && window.location.hostname === stageHost) {
    return stageApiBase;
  }
  return apiBase;
}

export default function PricingPage({ apiBase, stageApiBase, stageHost, plans }: PricingPageProps) {
  const [selectedId, setSelectedId] = useState(plans[0]?.id ?? '');
  const [status, setStatus] = useState('选择套餐后即可开始体验或购买。');

  const selected = useMemo(
    () => plans.find((plan) => plan.id === selectedId) ?? plans[0],
    [plans, selectedId],
  );

  const trialPlans = plans.filter((plan) => plan.audience === 'trial');
  const personalPlans = plans.filter((plan) => plan.audience === 'personal');
  const familyPlans = plans.filter((plan) => plan.audience === 'family');

  function onSelect(plan: PricingPlan) {
    setSelectedId(plan.id);
    trackEvent('select_plan', {
      plan_id: plan.id,
      plan_period: plan.period,
      plan_audience: plan.audience,
      value: plan.price,
    });
    setStatus(`已选择：${plan.period}（${plan.price}）`);
  }

  function onCheckout(plan: PricingPlan) {
    trackEvent('begin_checkout', {
      plan_id: plan.id,
      plan_period: plan.period,
      plan_audience: plan.audience,
      value: plan.price,
    });
    const endpoint = resolveApiBase(apiBase, stageApiBase, stageHost);
    setStatus(`准备请求支付接口：${endpoint}/payment/alipay/...（骨架阶段，尚未接完整下单流）`);
  }

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-10">
      <section className="rounded-3xl bg-[var(--brand-surface)] p-6 shadow-sm ring-1 ring-black/5 md:p-8">
        <p className="text-sm font-medium text-[var(--brand-primary)]">购买宁屏服务</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-[var(--brand-text)] md:text-4xl">
          无需注册，尊重隐私
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
          适合个人和家庭多台设备使用。先选体验版验证效果，再升级个人版或家庭版。
        </p>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
            <strong>体验版</strong>
            <p className="mt-1 text-sm text-slate-600">7 天验证兼容性与拦截效果</p>
          </div>
          <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
            <strong>个人版</strong>
            <p className="mt-1 text-sm text-slate-600">5 台设备，共享每秒 30 次请求</p>
          </div>
          <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
            <strong>家庭版</strong>
            <p className="mt-1 text-sm text-slate-600">20 台设备，每台可独立设置规则</p>
          </div>
        </div>
      </section>

      <PlanGroup title="体验版" plans={trialPlans} selectedId={selectedId} onSelect={onSelect} onCheckout={onCheckout} />
      <PlanGroup title="个人版" plans={personalPlans} selectedId={selectedId} onSelect={onSelect} onCheckout={onCheckout} />
      <PlanGroup title="家庭版" plans={familyPlans} selectedId={selectedId} onSelect={onSelect} onCheckout={onCheckout} />

      <section className="rounded-2xl bg-slate-900 px-5 py-4 text-sm text-slate-100">
        <p>
          当前选中：<strong>{selected?.period ?? '未选择'}</strong>
        </p>
        <p className="mt-1 text-slate-300">{status}</p>
      </section>
    </div>
  );
}

function PlanGroup({
  title,
  plans,
  selectedId,
  onSelect,
  onCheckout,
}: {
  title: string;
  plans: PricingPlan[];
  selectedId: string;
  onSelect: (plan: PricingPlan) => void;
  onCheckout: (plan: PricingPlan) => void;
}) {
  if (!plans.length) return null;

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-[var(--brand-text)]">{title}</h2>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {plans.map((plan) => {
          const active = plan.id === selectedId;
          return (
            <article
              key={plan.id}
              className={`flex h-full flex-col rounded-3xl bg-white p-5 shadow-sm ring-1 transition ${
                active ? 'ring-[var(--brand-primary)]' : 'ring-slate-200'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">{plan.period}</h3>
                  {plan.highlight ? (
                    <p className="mt-1 text-xs font-medium text-[var(--brand-accent)]">{plan.highlight}</p>
                  ) : null}
                </div>
                <p className="text-2xl font-bold text-[var(--brand-primary)]">{plan.price}</p>
              </div>
              <ul className="mt-4 flex-1 space-y-2 text-sm leading-6 text-slate-600">
                {plan.features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>
              <div className="mt-5 flex gap-2">
                <button
                  type="button"
                  className="rounded-xl bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700"
                  onClick={() => onSelect(plan)}
                >
                  选择
                </button>
                <button
                  type="button"
                  className="rounded-xl bg-[var(--brand-primary)] px-3 py-2 text-sm font-medium text-white"
                  onClick={() => {
                    onSelect(plan);
                    onCheckout(plan);
                  }}
                >
                  {plan.buttonText}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
