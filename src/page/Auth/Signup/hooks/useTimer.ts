import {
  useCallback, useEffect, useRef, useState,
} from 'react';

const getTimeString = (time:number) => {
  const sec = time % 60;
  const min = Math.floor(time / 60);
  if (sec < 10) {
    return `${min} : 0${sec}`;
  }
  return `${min} : ${sec}`;
};

export default function useTimer(targetTime:number) {
  const [time, setTime] = useState(targetTime);
  const timer = useRef<NodeJS.Timeout>();

  const startTimer = useCallback(() => {
    clearInterval(timer.current);
    setTime(targetTime);
    timer.current = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);
  }, [targetTime]);

  const stopTimer = () => {
    clearInterval(timer.current);
  };
  useEffect(() => {
    if (time === 0) {
      stopTimer();
    }
  }, [time]);

  const getTime = () => getTimeString(time);

  return { getTime, startTimer, stopTimer };
}
