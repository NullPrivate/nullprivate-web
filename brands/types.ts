export type BrandId = 'nullprivate' | 'adguardprivate';

export interface BrandTheme {
  primary: string;
  primarySoft: string;
  accent: string;
  surface: string;
  text: string;
}

export interface BrandConfig {
  id: BrandId;
  siteName: string;
  siteUrl: string;
  gaId: string;
  apiBase: string;
  stageApiBase: string;
  stageHost: string;
  /** 网站备案号；未备案品牌可不填，页脚不展示 */
  beian?: string;
  primaryHost: string;
  subtitle: string;
  description: string;
  theme: BrandTheme;
}
