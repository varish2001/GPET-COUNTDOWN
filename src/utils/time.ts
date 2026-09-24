/**
 * Precise Time Calculation Utility for GPET 2026 Launch
 * Official Launch: 25 September 2026 at 11:25:00 AM IST (UTC+05:30)
 */

// Target ISO timestamp locked to Asia/Kolkata (UTC+05:30)
export const LAUNCH_ISO_STRING = '2026-09-25T11:25:00+05:30';
export const LAUNCH_TIMESTAMP_MS = new Date(LAUNCH_ISO_STRING).getTime();

export interface TimeRemaining {
  totalMs: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isLaunched: boolean;
}

export function calculateTimeRemaining(
  targetMs: number = LAUNCH_TIMESTAMP_MS,
  currentMs: number = Date.now()
): TimeRemaining {
  const diff = targetMs - currentMs;

  if (diff <= 0) {
    return {
      totalMs: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isLaunched: true,
    };
  }

  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  return {
    totalMs: diff,
    days,
    hours,
    minutes,
    seconds,
    isLaunched: false,
  };
}

export function padNumber(num: number): string {
  return String(Math.max(0, num)).padStart(2, '0');
}
