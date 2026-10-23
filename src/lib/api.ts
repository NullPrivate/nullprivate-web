export function resolveApiBase(
  apiBase: string,
  stageApiBase: string,
  stageHost: string,
): string {
  if (typeof window === 'undefined') return apiBase;

  try {
    const params = new URLSearchParams(window.location.search || '');
    const api = (params.get('api') || '').toLowerCase();
    const host = window.location.hostname;
    const isLocal = host === 'localhost' || host === '127.0.0.1' || host.endsWith('.local');

    // 本地开发统一走 Vite 代理，避免浏览器 CORS。
    if (isLocal) {
      if (api === 'stage' || api === 'staging') return '/api/stage/v1';
      if (api === 'prod' || api === 'production' || api === 'stage-fallback') return '/api/v1';
      // 默认本地也走生产代理，便于 stage 不可用时仍能联调下单。
      if (api === '' ) return '/api/v1';
    }

    if (api === 'stage' || api === 'staging') return stageApiBase;
    if (api === 'prod' || api === 'production') return apiBase;
  } catch {
    // ignore
  }

  if (window.location.hostname === stageHost) return stageApiBase;
  return apiBase;
}

export function isMobileUa(userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : '') {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
}
