// src/pages/InterviewScheduler.js
import React, { useState } from 'react';

const InterviewScheduler = () => {
  const [candidate, setCandidate] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSchedule = () => {
    alert(`Interview scheduled for ${candidate} on ${date} at ${time}`);
  };

  return (
    <div>
      <h1>Schedule an Interview</h1>
      <div>
        <label>Candidate Name:</label>
        <input
          type="text"
          value={candidate}
          onChange={(e) => setCandidate(e.target.value)}
        />
      </div>
      <div>
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div>
        <label>Time:</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>
      <button onClick={handleSchedule}>Schedule Interview</button>
    </div>
  );
};

export default InterviewScheduler;
