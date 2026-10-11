import type { DurationCategory } from '../types';

// Fixed evaluation date as specified in user instructions
export const SIMULATION_TODAY_STR = '2026-10-24';
export const SIMULATION_TODAY = new Date('2026-10-24T00:00:00');

/**
 * Calculates duration in days between two dates inclusive
 */
export function calculateDurationDays(startDateStr: string, endDateStr: string): number {
  const start = new Date(startDateStr);
  const end = new Date(endDateStr);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
}

/**
 * Classifies duration into Weekly (<=7 days), Fortnightly (8-21 days), or Monthly (>=22 days)
 */
export function classifyDuration(startDateStr: string, endDateStr: string): DurationCategory {
  const days = calculateDurationDays(startDateStr, endDateStr);
  if (days <= 7) return 'Weekly';
  if (days <= 21) return 'Fortnightly';
  return 'Monthly';
}

/**
 * Generates alert preview points text from dates as required by PRD Section 3.2 & 5.1
 */
export function getAlertPointsPreview(startDateStr: string, endDateStr: string): string {
  const category = classifyDuration(startDateStr, endDateStr);
  if (category === 'Weekly') {
    return 'Weekly · alert 2 days before';
  }
  if (category === 'Fortnightly') {
    return 'Fortnightly · half time, 3/4 time, 2 days before';
  }
  return 'Monthly · half time, 3/4 time, 2 days before';
}

/**
 * Days difference relative to SIMULATION_TODAY (24 Oct 2026)
 * Positive means future, negative means past (overdue), 0 means today
 */
export function getDaysRemaining(dateStr: string): number {
  const target = new Date(dateStr + 'T00:00:00');
  const diffTime = target.getTime() - SIMULATION_TODAY.getTime();
  return Math.round(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Formats a date into "Oct 21, 2026" or "21 Oct 2026"
 */
export function formatDate(dateStr: string, format: 'short' | 'long' = 'short'): string {
  if (!dateStr) return '';
  const date = new Date(dateStr + 'T00:00:00');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  if (format === 'long') {
    return `${month} ${day}, ${year}`;
  }
  return `${day} ${month} ${year}`;
}
