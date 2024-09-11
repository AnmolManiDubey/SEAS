// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import CalendarPage from './pages/Calendar';
import InterviewScheduler from './pages/int_schedule';
import InterviewPage from './pages/InterviewPage';
import PostJobPage from './pages/PostJobPage';

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Sidebar and Main Content */}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/interview-scheduler" element={<InterviewScheduler />} />
          <Route path="/interview" element={<InterviewPage />} />
          <Route path="/post-job" element={<PostJobPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
