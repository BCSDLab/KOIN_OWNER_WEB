type GTagEvent = {
  team: string;
  event_category: string;
  event_label: string;
  value: string;
};

export const GA_TRACKING_ID = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageView = (url: string, userId?: string) => {
  if (typeof window.gtag === 'undefined') return;
  window.gtag('config', GA_TRACKING_ID as string, {
    page_path: url,
    user_id: userId,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
  team, event_category, event_label, value,
}: GTagEvent) => {
  if (typeof window.gtag === 'undefined') return;
  window.gtag('event', team, {
    event_category,
    event_label,
    value,
  });

  if (import.meta.env.VITE_API_PATH?.includes('stage')) {
    // eslint-disable-next-line no-console
    console.table({
      팀: team,
      '이벤트 Category': event_category,
      '이벤트 Title': event_label,
      값: value,
    });
  }
};
