import React, { Component } from 'react';
import './Stopwatch.css';

class Stopwatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,             // Current time in milliseconds
      isRunning: false,    // Flag to check if the stopwatch is running
      lapTimes: [],        // Array to store lap times
    };
    this.timer = null;     // Reference to the timer
  }

  // Function to start the stopwatch
  startStopwatch = () => {
    if (!this.state.isRunning) {
      this.setState({ isRunning: true });
      this.timer = setInterval(() => {
        this.setState({ time: this.state.time + 10 });
      }, 10);
    } else {
      clearInterval(this.timer);
      this.setState({ isRunning: false });
    }
  };

  // Function to stop the stopwatch and record lap time
  stopAndRecord = () => {
    if (this.state.isRunning) {
      clearInterval(this.timer);
      const { time, lapTimes } = this.state;
      this.setState({
        lapTimes: [...lapTimes, time],
        time: 0,
      });
    }
  };

  // Function to reset the stopwatch and clear lap times
  resetStopwatch = () => {
    clearInterval(this.timer);
    this.setState({
      time: 0,
      isRunning: false,
      lapTimes: [],
    });
  };

  // Function to format time in "mm:ss.cs" format
  formatTime = (milliseconds) => {
    const centiseconds = Math.floor((milliseconds / 10) % 100);
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor(milliseconds / 60000);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  render() {
    const { time, isRunning, lapTimes } = this.state;
    return (
      <div className="stopwatch-container">
        <h2 className="stopwatch-title">Stopwatch</h2>
        <div className="time-display">{this.formatTime(time)}</div>
        <button className={`action-button start-button ${isRunning ? 'disabled' : ''}`} onClick={this.startStopwatch}>Start</button>
        <button className={`action-button stop-button ${!isRunning ? 'disabled' : ''}`} onClick={this.stopAndRecord}>Stop</button>
        <button className={`action-button reset-button ${isRunning ? 'disabled' : ''}`} onClick={this.resetStopwatch}>Reset</button>
        <button className={`action-button add-lap-button ${!isRunning ? 'disabled' : ''}`} onClick={this.stopAndRecord}>Add Lap</button>
        <ul className="lap-list">
          {lapTimes.map((lapTime, index) => (
            <li className="lap-item" key={index}>{this.formatTime(lapTime)}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Stopwatch;
