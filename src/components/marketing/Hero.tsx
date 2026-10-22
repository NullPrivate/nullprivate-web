import { trackEvent } from '../analytics/track';

interface HeroProps {
  title: string;
  subtitle: string;
  description: string;
}

export default function Hero({ title, subtitle, description }: HeroProps) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-16 text-white shadow-xl md:px-10 md:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(20,184,166,0.35),_transparent_45%)]" />
      <div className="relative mx-auto flex max-w-6xl flex-col gap-8">
        <div className="max-w-3xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-200">{subtitle}</p>
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">{title}</h1>
          <p className="max-w-2xl text-base leading-7 text-slate-200 md:text-lg">{description}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href="/pricing/"
            className="rounded-full bg-teal-400 px-5 py-3 text-sm font-semibold text-slate-950"
            onClick={() => trackEvent('cta_click', { cta: 'hero_pricing' })}
          >
            立即体验
          </a>
          <a
            href="/docs/"
            className="rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/20"
            onClick={() => trackEvent('cta_click', { cta: 'hero_docs' })}
          >
            查看文档
          </a>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {[
            ['无注册购买', '付款即用，降低隐私负担'],
            ['DNS 源头拦截', '广告、跟踪、成人内容与恶意站'],
            ['家庭多设备', '个人版与家庭版按需扩展'],
          ].map(([label, text]) => (
            <div key={label} className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
              <p className="font-semibold">{label}</p>
              <p className="mt-1 text-sm text-slate-300">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
