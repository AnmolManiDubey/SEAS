import React, { useState } from 'react';
import './PostJobPage.css';
import { FaCheckCircle } from 'react-icons/fa'; // Import tick icon

const PostJobPage = () => {
  const [position, setPosition] = useState('');
  const [skills, setSkills] = useState('');
  const [description, setDescription] = useState(''); // New state for description
  const [experience, setExperience] = useState('');
  const [resumeScore, setResumeScore] = useState(0); // New state for Resume Score
  const [interviewScore, setInterviewScore] = useState(0); // New state for Interview Score
  const [questions, setQuestions] = useState([{ question: '', attempts: 1 }]);
  const [showSuccess, setShowSuccess] = useState(false); // State to show success dialog

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: '', attempts: 1 }]);
  };

  const handleSubmit = () => {
    const jobData = { 
      position, 
      skills: skills.split(','), 
      description, // Include description in job data
      experience, 
      resumeScore, 
      interviewScore, 
      questions 
    };
    fetch('/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jobData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setShowSuccess(true); // Show success dialog
        setTimeout(() => setShowSuccess(false), 3000); // Hide after 3 seconds
      });
  };

  return (
    <div className="post-job-page">
      <h1>Post a New Job</h1>
      <form className="job-form">
        <div className="form-group">
          <label htmlFor="position">Position:</label>
          <input
            type="text"
            id="position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="skills">Skills Required (comma-separated):</label>
          <input
            type="text"
            id="skills"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="form-group"> {/* New description input */}
          <label htmlFor="description">Job Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-control"
            rows="3"
          />
        </div>

        <div className="form-group">
          <label htmlFor="experience">Experience Required (years):</label>
          <input
            type="number"
            id="experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="form-group"> {/* New Resume Score input */}
          <label htmlFor="resume-score">Resume Score (0 to 100):</label>
          <input
            type="number"
            id="resume-score"
            value={resumeScore}
            onChange={(e) => setResumeScore(e.target.value)}
            className="form-control"
            min="0"
            max="100"
          />
        </div>

        <div className="form-group"> {/* New Interview Score input */}
          <label htmlFor="interview-score">Interview Score (0 to 100):</label>
          <input
            type="number"
            id="interview-score"
            value={interviewScore}
            onChange={(e) => setInterviewScore(e.target.value)}
            className="form-control"
            min="0"
            max="100"
          />
        </div>

        <h2>Interview Questions</h2>
        {questions.map((question, index) => (
          <div key={index} className="form-group question-group">
            <label htmlFor={`question-${index}`}>Question {index + 1}:</label>
            <input
              type="text"
              id={`question-${index}`}
              value={question.question}
              onChange={(e) => {
                const updatedQuestions = [...questions];
                updatedQuestions[index].question = e.target.value;
                setQuestions(updatedQuestions);
              }}
              className="form-control"
            />
            <label htmlFor={`attempts-${index}`}>Max Attempts:</label>
            <input
              type="number"
              id={`attempts-${index}`}
              value={question.attempts}
              onChange={(e) => {
                const updatedQuestions = [...questions];
                updatedQuestions[index].attempts = e.target.value;
                setQuestions(updatedQuestions);
              }}
              className="form-control"
              min="1"
            />
          </div>
        ))}
        <button type="button" className="btn btn-add" onClick={handleAddQuestion}>
          Add Question
        </button>
        <button type="button" className="btn btn-submit" onClick={handleSubmit}>
          Post Job
        </button>
      </form>

      {/* Success dialog with tick mark */}
      {showSuccess && (
        <div className="success-dialog">
          <FaCheckCircle className="success-icon" />
          <p>Job posted successfully!</p>
        </div>
      )}
    </div>
  );
};

export default PostJobPage;
