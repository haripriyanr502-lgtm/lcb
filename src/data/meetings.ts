import { Meeting, MeetingScheduleInfo } from '@/types';

/**
 * Official Meetings Schedule for LCB Brigade
 * Grounded strictly in mentor-provided parameters:
 * - 2nd Tuesday of every month
 * - 6:30 PM – 7:30 PM — Board Meeting
 * - 7:30 PM — General Body Meeting
 * - Followed by Networking & Fellowship
 */
export const OFFICIAL_MEETING_SCHEDULE: MeetingScheduleInfo = {
  frequency: '2nd Tuesday of every month',
  cadenceDescription:
    'Regular monthly assembly convene on the second Tuesday of each calendar month, comprising back-to-back executive board and general body sessions.',
  sessions: [
    {
      time: '6:30 PM – 7:30 PM',
      title: 'Board Meeting',
      description:
        'Executive committee session focused on administrative reviews, project allocations, compliance, and governance decisions.',
      highlight: false,
    },
    {
      time: '7:30 PM onwards',
      title: 'General Body Meeting',
      description:
        'Comprehensive gathering of all club members to review community impact, plan upcoming service drives, and discuss club directives.',
      highlight: true,
    },
    {
      time: 'Post-Meeting',
      title: 'Networking & Fellowship',
      description:
        'Informal fellowship and camaraderie among Lions members, visiting delegates, and partner club representatives.',
      highlight: false,
    },
  ],
  fellowship: 'Followed by Networking & Fellowship',
};

/**
 * Calculates the exact date of the 2nd Tuesday for a given year and month (0-indexed).
 */
export function getSecondTuesday(year: number, month: number): Date {
  const firstDay = new Date(year, month, 1);
  const dayOfWeek = firstDay.getDay(); // 0 is Sunday, 2 is Tuesday
  const firstTuesdayOffset = (2 - dayOfWeek + 7) % 7;
  const firstTuesdayDate = 1 + firstTuesdayOffset;
  const secondTuesdayDate = firstTuesdayDate + 7;
  return new Date(year, month, secondTuesdayDate);
}

/**
 * Formats a Date object to YYYY-MM-DD
 */
function formatDateISO(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/**
 * Formats a Date object to readable string (e.g., "Tuesday, October 13, 2026")
 */
export function formatMeetingDateReadable(d: Date): string {
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Generate upcoming meetings for the next 4 cycles (strictly 2nd Tuesday)
const now = new Date();
const currentYear = now.getFullYear();
const currentMonth = now.getMonth();

export const UPCOMING_MEETING_DATES: Date[] = [];
for (let i = 0; i < 6; i++) {
  const m = (currentMonth + i) % 12;
  const y = currentYear + Math.floor((currentMonth + i) / 12);
  const secondTuesday = getSecondTuesday(y, m);
  if (secondTuesday >= now || i > 0) {
    UPCOMING_MEETING_DATES.push(secondTuesday);
  }
}

export const MEETINGS_DATA: Meeting[] = UPCOMING_MEETING_DATES.slice(0, 4).map(
  (date, index) => {
    const formatted = formatMeetingDateReadable(date);
    return {
      id: `lcb-meeting-${date.getFullYear()}-${date.getMonth() + 1}`,
      title: `Monthly Assembly — ${date.toLocaleString('en-US', { month: 'long', year: 'numeric' })}`,
      date: formatDateISO(date),
      time: '6:30 PM onwards (Board: 6:30 PM | General Body: 7:30 PM)',
      location: 'Official Brigade Venue / Secretariat Hall, Bengaluru',
      status: index === 0 ? 'upcoming' : 'upcoming',
      description:
        'Official monthly assembly adhering to the constitutional schedule. Incorporates the executive Board Meeting followed by the General Body Meeting and fellowship.',
      agenda: [
        '6:30 PM – 7:30 PM — Board Meeting (Executive Review)',
        '7:30 PM — General Body Meeting (Club Assembly)',
        'Followed by Networking & Fellowship',
      ],
      scheduleBreakdown: [
        {
          time: '6:30 PM – 7:30 PM',
          session: 'Board Meeting',
        },
        {
          time: '7:30 PM',
          session: 'General Body Meeting',
          highlight: true,
        },
        {
          time: 'Followed by',
          session: 'Networking & Fellowship',
        },
      ],
    };
  }
);
