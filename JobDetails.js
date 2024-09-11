// src/pages/JobDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './JobDetails.css';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    fetch(`/api/jobs/${id}`)
      .then((response) => response.json())
      .then((data) => setJob(data))
      .catch((error) => console.error('Error fetching job details:', error));
  }, [id]);

  if (!job) {
    return <p>Loading job details...</p>;
  }

  return (
    <div className="job-details-container">
      <h1>{job.title}</h1>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>No. of Vacancies:</strong> {job.vacancies}</p>
      <p><strong>Start Date:</strong> {new Date(job.startDate).toLocaleDateString()}</p>
      <p><strong>End Date:</strong> {new Date(job.endDate).toLocaleDateString()}</p>
      <p><strong>Skills Required:</strong> {job.skillsRequired.join(', ')}</p>
      <p><strong>Experience Required:</strong> {job.experience}</p>
      <p><strong>Eligibility Criteria:</strong> {job.eligibility}</p>
      <Link to={`/apply/${job._id}`} className="apply-button">
        Apply Now
      </Link>
    </div>
  );
};

export default JobDetails;
