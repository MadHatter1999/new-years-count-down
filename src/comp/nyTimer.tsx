import React, { useState, useEffect } from 'react';
import '../css/App.css';
import newYearBall from '../new-year.svg';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function NewYearCountdown() {
  const calculateTimeLeft = (): TimeLeft | {} => {
    const now = new Date();
    const newYear = new Date(now.getFullYear() + 1, 0, 1);
    const difference = +newYear - +now;

    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return {};
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft | {}>(calculateTimeLeft());
  const [ballPosition, setBallPosition] = useState<number>(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      const totalSeconds = (timeLeft as TimeLeft).days * 86400 + (timeLeft as TimeLeft).hours * 3600 + (timeLeft as TimeLeft).minutes * 60 + (timeLeft as TimeLeft).seconds;
      setBallPosition(Math.min(100, (86400 - totalSeconds) / 86400 * 100));
    }, 1000);

    return () => clearTimeout(timer);
  });

  const isItNewYearYet = Object.keys(timeLeft).length === 0;
  const countdownDisplay = isItNewYearYet ? (
    <h2>Happy New Year 2024!</h2>
  ) : (
    <div>
      <h2>Countdown to New Year 2024</h2>
      <p>{`${(timeLeft as TimeLeft).days ?? 0} Days ${(timeLeft as TimeLeft).hours ?? 0} Hours ${(timeLeft as TimeLeft).minutes ?? 0} Minutes ${(timeLeft as TimeLeft).seconds ?? 0} Seconds`}</p>
    </div>
  );

  return (
    <div className="NewYearCountdown">
      {countdownDisplay}
      <div className="ball-drop-container">
        <svg className="countdown-svg" viewBox="0 0 100 200">
          <line x1="50%" y1="5%" x2="50%" y2="95%" stroke="black" strokeWidth="2"/>
          <image href={newYearBall} x="42.5%" y={`${5 + (85 * ballPosition / 100)}%`} height="20%" width="20%" />
        </svg>
      </div>
    </div>
  );
}

export default NewYearCountdown;
