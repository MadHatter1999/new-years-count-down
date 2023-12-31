// App.tsx
import React from 'react';
import './css/App.css';
import NewYearCountdown from './comp/nyTimer';
import EventPopup from './comp/EventPopup';
import eventsData from './data/events.json'; // Assuming events are stored in a JSON file

function App() {
  return (
    <div className="App">
      <div className="event-popup-container">
        <EventPopup events={eventsData} />
      </div>
      <div className="new-year-countdown-container">
        <NewYearCountdown />
      </div>
    </div>
  );
}

export default App;
