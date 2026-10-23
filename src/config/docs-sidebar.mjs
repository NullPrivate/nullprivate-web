/**
 * Starlight 文档侧栏。
 * - 分组标签：中文 + translations
 * - 页面链接：只写 slug，显示名取各语言 frontmatter.title
 * - 避免 autogenerate 直接暴露英文目录名
 */

const t = (zh, zhHk, en, ko, ja) => ({
  label: zh,
  translations: {
    'zh-HK': zhHk,
    'en-US': en,
    'ko-KR': ko,
    'ja-JP': ja,
  },
});

const slug = (value) => ({ slug: value });

const group = (labels, items, collapsed = false) => ({
  ...labels,
  collapsed,
  items,
});

const platformSlugs = (base) => [
  // Starlight content slug 会把目录名规范化为小写。
  slug(`${base}/android`),
  slug(`${base}/iphone`),
  slug(`${base}/windows`),
  slug(`${base}/macos`),
  slug(`${base}/browser`),
];

// 专题目录与侧栏共用阅读顺序，文章标题和简介由各语言元数据提供。
export const privacyGuideSlugs = [
  'docs/hide_me/protect-the-teenager',
  'docs/hide_me/protect-the-eld',
  'docs/hide_me/protect-yourself',
  'docs/hide_me/hide-yourself',
  'docs/hide_me/protect-from-the-employee',
];

export const docsSidebar = [
  group(t('开始使用', '開始使用', 'Getting Started', '시작하기', 'はじめに'), [
    slug('docs'),
    slug('docs/startup/index'),
    group(
      t('设备配置', '裝置設定', 'Device Setup', '기기 설정', 'デバイス設定'),
      [slug('docs/startup/config'), ...platformSlugs('docs/startup/config')],
      true,
    ),
    group(
      t('公共服务', '公共服務', 'Public Service', '공용 서비스', '公共サービス'),
      [slug('docs/startup/free'), ...platformSlugs('docs/startup/free')],
      true,
    ),
    slug('docs/startup/dashboard'),
    group(
      t('高级功能', '進階功能', 'Advanced Features', '고급 기능', '高度な機能'),
      [
        slug('docs/startup/tutorial'),
        slug('docs/startup/tutorial/block-services'),
        slug('docs/startup/tutorial/block-services/list-builder'),
        slug('docs/startup/tutorial/filters'),
        slug('docs/startup/tutorial/custom-device-name'),
        slug('docs/startup/tutorial/trusted-vendor'),
        slug('docs/startup/tutorial/ddns'),
        slug('docs/startup/tutorial/dns-shunting'),
        slug('docs/startup/tutorial/client-subnet'),
        slug('docs/startup/tutorial/quick-response'),
      ],
      true,
    ),
    slug('docs/startup/privacy_policy'),
    slug('docs/startup/terms-of-service'),
  ]),

  group(t('功能说明', '功能說明', 'Features', '기능 안내', '機能説明'), [
    slug('docs/feature'),
    slug('docs/feature/adblock'),
    slug('docs/feature/mobile-ad'),
    slug('docs/feature/privacy'),
    slug('docs/feature/malware'),
    slug('docs/feature/adult'),
    slug('docs/feature/social'),
    slug('docs/feature/phishing'),
    slug('docs/feature/tracking'),
    slug('docs/feature/malicious-dns'),
    slug('docs/feature/query'),
    slug('docs/feature/statistics'),
    slug('docs/feature/platform'),
    slug('docs/feature/config'),
    slug('docs/feature/open-source'),
    slug('docs/feature/custom-rules'),
    slug('docs/feature/custom-domain'),
    slug('docs/feature/custom-list'),
    slug('docs/feature/speed'),
    slug('docs/feature/schedule'),
  ]),

  group(t('赛博城府', '賽博城府', 'Privacy Guides', '사이버 처세', 'サイバー処世'), [
    slug('docs/hide_me'),
    ...privacyGuideSlugs.map(slug),
  ]),

  group(t('基础教程', '基礎教程', 'Basics', '기초 튜토리얼', '基礎チュートリアル'), [
    slug('docs/tutorial'),
    slug('docs/tutorial/dns-basics'),
    slug('docs/tutorial/adguardprivate-protection-basics'),
    slug('docs/tutorial/dns-impact-on-browsing'),
    slug('docs/tutorial/home_host'),
  ]),

  group(t('常见问题', '常見問題', 'FAQ', '자주 묻는 질문', 'よくある質問'), [
    slug('docs/faq'),
    slug('docs/faq/how-to-buy'),
    slug('docs/faq/how-to-solve-unwanted-block'),
    slug('docs/faq/can-not-access-wechat-small-app'),
    slug('docs/faq/ios-restore-setting'),
    slug('docs/faq/access-stuck'),
    slug('docs/faq/clash-compatiable'),
    slug('docs/faq/how-to-support'),
  ]),
];
