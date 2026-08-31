const STATS_URL = 'https://api.trykili.ai/stats';

// Shown on the home page's ad metrics counters - falls back to these if the
// live endpoint is unreachable so the section still renders something.
const FALLBACK_STATS = { adsShown: 1824, adSpend: 6749 };

type KiliStatsResponse = {
  adsDisbursed: number;
  amountDisbursed: number;
};

export async function getKiliStats(): Promise<{ adsShown: number; adSpend: number }> {
  try {
    const res = await fetch(STATS_URL, { next: { revalidate: 60 } });
    if (!res.ok) {
      return FALLBACK_STATS;
    }

    const data = (await res.json()) as KiliStatsResponse;
    if (typeof data.adsDisbursed !== 'number' || typeof data.amountDisbursed !== 'number') {
      return FALLBACK_STATS;
    }

    return { adsShown: data.adsDisbursed, adSpend: data.amountDisbursed };
  } catch {
    return FALLBACK_STATS;
  }
}
