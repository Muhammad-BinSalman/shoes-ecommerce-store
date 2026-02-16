export type UtmParams = Partial<{
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
}>;

const STORAGE_KEY = "utm_params";

export function utmFromQuery(input: string | URLSearchParams): UtmParams {
  const params = typeof input === "string" ? new URLSearchParams(input) : input;
  const pick = (k: string) => params.get(k) || undefined;
  const utm: UtmParams = {
    utm_source: pick("utm_source"),
    utm_medium: pick("utm_medium"),
    utm_campaign: pick("utm_campaign"),
    utm_content: pick("utm_content"),
  };
  // Remove undefined keys
  Object.keys(utm).forEach(
    (k) => (utm as any)[k] === undefined && delete (utm as any)[k],
  );
  return utm;
}

export function saveUtmToStorage(utm: UtmParams) {
  if (typeof window === "undefined") return;
  try {
    // Merge with any existing UTMs; keep existing if new value is absent
    const existing = readUtmFromStorage();
    const merged: UtmParams = { ...existing, ...utm };
    // Only save if at least one key present
    const hasAny = Object.keys(merged).length > 0;
    if (hasAny) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    }
  } catch (_) {
    // ignore storage errors
  }
}

export function readUtmFromStorage(): UtmParams {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as UtmParams;
    const cleaned: UtmParams = {};
    for (const key of [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content",
    ]) {
      const val = (parsed as any)[key];
      if (typeof val === "string" && val.length > 0) {
        (cleaned as any)[key] = val;
      }
    }
    return cleaned;
  } catch (_) {
    return {};
  }
}
