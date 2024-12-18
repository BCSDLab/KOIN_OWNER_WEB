type GTagEvent = {
  action: string;
  category: string;
  label: string;
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
  action, category, label, value,
}: GTagEvent) => {
  if (typeof window.gtag === 'undefined') return;
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
  // eslint-disable-next-line no-console
  console.table({
    팀: action, '이벤트 Category': category, '이벤트 Title': label, 값: value,
  });
};
