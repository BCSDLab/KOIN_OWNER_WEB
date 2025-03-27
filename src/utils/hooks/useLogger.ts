import * as gtag from 'lib/gtag';

type ActionClickLoggerProps = {
  team: string,
  event_label: string,
  value: string,
};

const useLogger = () => {
  const actionEventClick = ({
    team,
    event_label,
    value,
  }: ActionClickLoggerProps) => {
    gtag.event({
      team, event_category: 'click', event_label, value,
    });
  };

  return {
    actionEventClick,
  };
};

export default useLogger;
