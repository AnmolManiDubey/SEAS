import React, { useState, useRef } from 'react';
import './InterviewPage.css'; // Ensure this CSS file is properly set up

function InterviewPage() {
  const [recording, setRecording] = useState(false);
  const [videoURL, setVideoURL] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answeredQuestions, setAnsweredQuestions] = useState([]); // Track answered questions
  const [isAnswered, setIsAnswered] = useState(false); // Track if the question is answered
  const [writtenAnswer, setWrittenAnswer] = useState(''); // Store written answer
  const videoRef = useRef();
  const mediaRecorderRef = useRef();
  const chunks = useRef([]);

  // Dummy questions data
  const questions = [
    "What motivates you to work in this field?",
    "Describe a challenging project you worked on.",
    "How do you handle stress and pressure?",
    // Add more questions as needed
  ];

  // Start recording video
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      videoRef.current.srcObject = stream; // Display video preview while recording

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = (e) => {
        chunks.current.push(e.data);
      };
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks.current, { type: 'video/mp4' });
        const videoUrl = URL.createObjectURL(blob);
        setVideoURL(videoUrl); // Set the recorded video URL
        chunks.current = [];

        // Stop the video stream (turn off camera) after recording
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        videoRef.current.srcObject = null;

        // Ensure video is ready for playback
        videoRef.current.src = videoUrl;
        videoRef.current.controls = true;
        videoRef.current.play(); // Trigger playback after recording
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setRecording(true);
    } catch (err) {
      console.error('Error accessing media devices:', err);
      alert('Could not access your camera or microphone. Please check permissions.');
    }
  };

  // Stop recording video
  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  // Switch to a specific question
  const goToQuestion = (index) => {
    if (!isAnswered) { // Restrict going back if question is answered
      setCurrentQuestion(index);
      setVideoURL(''); // Clear previous video when switching questions
      videoRef.current.srcObject = null; // Ensure the video is cleared
      videoRef.current.controls = false; // Disable controls until recording/playback
      setIsAnswered(false); // Reset answer status
      setWrittenAnswer(''); // Clear the written answer box
    }
  };

  // Handle written answer change
  const handleAnswerChange = (e) => {
    setWrittenAnswer(e.target.value);
  };

  // Submit answer (once clicked, can't go back)
  const submitAnswer = () => {
    if (writtenAnswer.trim()) {
      setIsAnswered(true);
      setAnsweredQuestions((prev) => [...prev, currentQuestion]);
    }
  };

  return (
    <div className="interview-page">
      <div className="sidebar">
        <h3>Questions</h3>
        <ul>
          {questions.map((question, index) => (
            <li
              key={index}
              onClick={() => goToQuestion(index + 1)}
              className={currentQuestion === index + 1 ? 'active' : ''}
            >
              Question {index + 1} {answeredQuestions.includes(index + 1) && '✔'} {/* Mark answered questions */}
            </li>
          ))}
        </ul>
      </div>

      <div className="main-content">
        <h1>Interview in Progress</h1>
        <div className="question-container">
          <h3>{questions[currentQuestion - 1]}</h3>
        </div>

        {!isAnswered ? (
          <div className="answer-section">
            <textarea
              placeholder="Write your answer here..."
              value={writtenAnswer}
              onChange={handleAnswerChange}
              className="answer-box"
            />
            <button onClick={submitAnswer} className="btn">Submit Answer</button>
          </div>
        ) : (
          <div className="video-section">
            <button onClick={startRecording} className="btn" disabled={recording}>
              {recording ? 'Recording...' : 'Record Your Answer'}
            </button>

            <div className="video-container">
              {/* Video preview for recording */}
              <video
                ref={videoRef}
                autoPlay={recording}
                muted={recording}
                className="video"
                playsInline
              />
            </div>

            {videoURL && !recording && (
              <div className="record-controls">
                <button onClick={() => setVideoURL('')} className="btn">Re-record</button>
                <button
                  onClick={() => goToQuestion(currentQuestion + 1)}
                  className="btn"
                  disabled={currentQuestion >= questions.length}
                >
                  Next Question
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default InterviewPage;
