import React, { useState } from 'react';
import './PostJobPage.css';
import { FaCheckCircle } from 'react-icons/fa'; // Import tick icon

const PostJobPage = () => {
  const [position, setPosition] = useState('');
  const [skills, setSkills] = useState('');
  const [experience, setExperience] = useState('');
  const [questions, setQuestions] = useState([{ question: '', type: 'text', attempts: 1 }]);
  const [showSuccess, setShowSuccess] = useState(false); // State to show success dialog

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: '', type: 'text', attempts: 1 }]);
  };

  const handleSubmit = () => {
    const jobData = { position, skills: skills.split(','), experience, questions };
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
            <label htmlFor={`type-${index}`}>Answer Type:</label>
            <select
              id={`type-${index}`}
              value={question.type}
              onChange={(e) => {
                const updatedQuestions = [...questions];
                updatedQuestions[index].type = e.target.value;
                setQuestions(updatedQuestions);
              }}
              className="form-control"
            >
              <option value="text">Text</option>
              <option value="video">Video</option>
            </select>
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
