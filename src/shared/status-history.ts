export interface HistoryHour { start: string; online: number; offline: number; maintenance: number; unknown: number }
export interface StatusHistory { available: boolean; updatedAt: string; sampledAt?: string|null; stale?: boolean; hours: number; services: Record<string, HistoryHour[]> }
