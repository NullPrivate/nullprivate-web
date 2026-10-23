export type PlanAudience = 'trial' | 'personal' | 'family';

export interface PricingPlan {
  id: string;
  period: string;
  price: string;
  audience: PlanAudience;
  buttonText?: string;
}

export const commonFeatureLines = [
  '支持平台: Android, iOS, macOS, Win11',
  '支持协议: DoT 和 DoH(HTTP3)',
  '72 小时 的访问记录',
  '24 小时 的统计信息',
  '100w 自定义规则',
];

export const personalFeatureLines = [
  ...commonFeatureLines,
  '5台 设备同时访问',
  '共享每秒 30 次 请求限制',
  '适合个人的多台设备使用',
];

export const familyFeatureLines = [
  ...commonFeatureLines,
  '20台 设备同时访问',
  '共享每秒 100 次 请求限制',
  '每台设备可独立设置规则',
  '适合家庭多人多设备使用',
];

export const trialPlans: PricingPlan[] = [
  {
    id: '7fcf7e37-7e7c-488d-91eb-0349bdbdcd0b',
    period: '7天体验版',
    price: '￥0.1',
    audience: 'trial',
    buttonText: '立即体验',
  },
  {
    id: '872e9d54-c5ab-424c-8dcd-426157f07759',
    period: '7天家庭版体验',
    price: '￥1',
    audience: 'trial',
    buttonText: '立即体验',
  },
];

export const personalPlans: PricingPlan[] = [
  { id: '4887f197-f25c-49a9-abb2-514b54ce31c8', period: '1 个月', price: '￥10', audience: 'personal' },
  { id: '31485b52-5097-43d5-8c0d-1c41464001b7', period: '3 个月', price: '￥24', audience: 'personal' },
  { id: 'ad21247d-cf33-4984-ad0a-f95efae880cd', period: '6 个月', price: '￥42', audience: 'personal' },
  { id: '19ac910d-e70a-46e7-a5c2-86ac7120996f', period: '12 个月', price: '￥60', audience: 'personal' },
];

export const familyPlans: PricingPlan[] = [
  { id: 'e9e1f9c2-6d0c-4d1f-8d0b-2c0f0b6b9b2e', period: '1 个月', price: '￥20', audience: 'family' },
  { id: 'd8d5c2d5-0f9b-4b7b-8f4a-3d5e3f1b3b7b', period: '3 个月', price: '￥48', audience: 'family' },
  { id: 'f8d6d6c8-4f8b-4d1e-8f2b-4d4e4f1b4f8b', period: '6 个月', price: '￥84', audience: 'family' },
  { id: '082e1ed8-105e-4031-b017-c4f08ea5f996', period: '12 个月', price: '￥120', audience: 'family' },
];

export function trialFeatureLines(planId: string): string[] {
  if (planId === '872e9d54-c5ab-424c-8dcd-426157f07759') {
    return ['7天 高级功能体验', ...familyFeatureLines];
  }
  return ['7天 高级功能体验', ...personalFeatureLines];
}
