// src/pages/LandingPage.js
import React, { useState, useEffect } from 'react';
import './LandingPage.css';
import '../components/Sidebar.css'; // Import the sidebar CSS file

const LandingPage = () => {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarVisible, setSidebarVisible] = useState(false);

  useEffect(() => {
    // Fetch the jobs from the backend (MongoDB) and store in the state
    fetch('/api/jobs')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setJobs(data))
      .catch(error => console.error('Error fetching jobs:', error));
  }, []);

  const filteredJobs = jobs.filter(job => 
    job.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="landing-page">
      <button className="toggle-btn" onClick={toggleSidebar}>
        &#9776; {/* Three-line icon */}
      </button>
      <div className={`hidden-sidebar ${sidebarVisible ? 'show' : ''}`}>
        {/* Sidebar content */}
        <a href="/" className="menu-item">Home</a>
        <a href="/profile" className="menu-item">Profile</a>
        <a href="/settings" className="menu-item">Settings</a>
        <a href="/calendar" className="menu-item">Calendar</a>
        {/* Remove the Interview Scheduler and Post Job links if they are not needed */}
      </div>
      <div className={`main-content ${sidebarVisible ? 'shifted' : ''}`}>
        <h1>Find Your Dream Job</h1>
        <input
          type="text"
          placeholder="Search for jobs..."
          className="search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="job-listings">
          {jobs.length === 0 ? (
            <p>No jobs available</p>
          ) : (
            filteredJobs.map((job, index) => (
              <div key={index} className="job-card">
                <h2>{job.position}</h2>
                <p>Company: {job.company}</p>
                <p>Skills Required: {job.skills.join(', ')}</p>
                <p>Experience: {job.experience} years</p>
                <button>Apply Now</button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
