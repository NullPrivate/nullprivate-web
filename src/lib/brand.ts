import adguardprivate from '../../brands/adguardprivate';
import nullprivate from '../../brands/nullprivate';
import type { BrandConfig, BrandId } from '../../brands/types';

const brands: Record<BrandId, BrandConfig> = {
  nullprivate,
  adguardprivate,
};

export function resolveBrandId(input?: string | null): BrandId {
  if (input === 'adguardprivate') return 'adguardprivate';
  return 'nullprivate';
}

export function getBrand(brandId = process.env.BRAND): BrandConfig {
  return brands[resolveBrandId(brandId)];
}

export function listBrands(): BrandConfig[] {
  return Object.values(brands);
}
