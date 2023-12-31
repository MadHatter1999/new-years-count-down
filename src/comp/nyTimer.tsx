import React, { useState, useEffect } from 'react';
import '../css/App.css';

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

  const ballDropMessage = isItNewYearYet ? "The ball has dropped!" : "The ball is dropping...";

  return (
    <div className="NewYearCountdown">
      {countdownDisplay}
      <div className="ball-drop-container">
        <svg height="200" width="100">
          <line x1="50" y1="10" x2="50" y2="190" stroke="black" strokeWidth="2"/>
          <circle cx="50" cy={10 + (180 * ballPosition / 100)} r="20" fill="red" />
        </svg>
        <p>{ballDropMessage}</p>
      </div>
    </div>
  );
}

export default NewYearCountdown;