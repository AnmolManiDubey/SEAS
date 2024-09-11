// src/pages/CalendarPage.js
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div>
      <h1>Calendar</h1>
      <Calendar
        onChange={setDate}
        value={date}
      />
      <p>Selected date: {date.toDateString()}</p>
    </div>
  );
};

export default CalendarPage;
