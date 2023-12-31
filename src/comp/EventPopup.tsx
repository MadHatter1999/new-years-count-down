import React, { useState, useEffect } from 'react';

type Event = {
  title: string;
  event: string;
  date: string;
};

type Props = {
  events: Event[];
};

const EventPopup: React.FC<Props> = ({ events }) => {
  // Initialize with a random index
  const getRandomIndex = () => Math.floor(Math.random() * events.length);
  const [currentEventIndex, setCurrentEventIndex] = useState(getRandomIndex);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);

      setTimeout(() => {
        setCurrentEventIndex(getRandomIndex);
        setVisible(true);
      }, 500); // Duration for fade-out effect
    }, 300000); // 5 minutes

    return () => clearInterval(interval);
  }, [events.length]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
  };

  return (
    <div className={`event-popup ${visible ? 'fade-in' : 'fade-out'}`}>
      <h2>{events[currentEventIndex].title}</h2>
      <p>{events[currentEventIndex].event}</p>
      <span>{formatDate(events[currentEventIndex].date)}</span>
    </div>
  );
};

export default EventPopup;
