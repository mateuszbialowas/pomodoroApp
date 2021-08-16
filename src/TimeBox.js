import React from "react";
import { Clock } from "./Clock";
import { ProgressBar } from "./ProgressBar";
import "./css/TimeBox.css";

export class TimeBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRunning: false,
      isPaused: false,
      pauseCount: 0,
      toggleTrackRemaining: false,
      elapsedTimeInSeconds: 0,
    };
    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.togglePause = this.togglePause.bind(this);
  }

  ToggleTrackRemaining = () => {
    this.setState((prevState) => ({
      toggleTrackRemaining: !prevState.toggleTrackRemaining,
    }));
  };

  handleStart() {
    this.setState({
      isRunning: true,
    });
    this.startTimer();
  }

  handleStop() {
    this.setState({
      isRunning: false,
      isPaused: false,
      pauseCount: 0,
      elapsedTimeInSeconds: 0,
    });
    this.stopTimer();
  }

  // TogglePause = () => {
  //   this.setState((prevState) => ({
  //     const isPaused = !prevState.isPaused;
  //     // isPaused: !prevState.isPaused,
  //     // pauseCount: this.state.isPaused
  //     //   ? prevState.pauseCount + 1
  //     //   : prevState.pauseCount,
  //   }));
  //   if (this.state.isPaused) {
  //     this.stopTimer();
  //   } else {
  //     this.startTimer();
  //   }
  // };

  startTimer() {
    this.intervalId = window.setInterval(() => {
      this.setState((prevState) => ({
        elapsedTimeInSeconds: prevState.elapsedTimeInSeconds + 1,
      }));
    }, 1000);
    console.log("startTimer", this.intervalId);
  }

  stopTimer() {
    window.clearInterval(this.intervalId);
    console.log("stopTimer", this.intervalId);
  }

  togglePause() {
    if (this.state.isPaused) {
      this.startTimer();
    } else {
      this.stopTimer();
    }
    this.setState(function (prevState) {
      const isPaused = !prevState.isPaused;
      return {
        isPaused,
        pauseCount: isPaused ? prevState.pauseCount + 1 : prevState.pauseCount,
      };
    });
  }

  render() {
    const {
      isRunning,
      isPaused,
      pauseCount,
      toggleTrackRemaining,
      elapsedTimeInSeconds,
    } = this.state;
    const totalTimeInSeconds = 25;
    const timeLeftInSeconds = totalTimeInSeconds - elapsedTimeInSeconds;
    const minutesLeft = Math.floor(timeLeftInSeconds / 60);
    const secondsLeft = Math.floor(timeLeftInSeconds % 60);
    let progressInPercent = (elapsedTimeInSeconds / totalTimeInSeconds) * 100.0;
    progressInPercent = progressInPercent > 100 ? 0 : progressInPercent;
    // if (timeLeftInSeconds === 0) {
    //   this.handleStop();
    // }
    // if (elapsedTimeInSeconds > totalTimeInSeconds) {
    //   this.handleStop();
    //   window.clearInterval(this.intervalId);
    // }
    return (
      <div className="TimeBox">
        <h1>
          Pomodoro created with <span>React</span>
        </h1>
        <hr />
        <Clock minutes={minutesLeft} seconds={secondsLeft} />
        <ProgressBar
          percent={progressInPercent}
          trackRemaining={toggleTrackRemaining}
        />
        <div className="buttons-container">
          <button disabled={isRunning} onClick={this.handleStart}>
            Start
          </button>
          <button disabled={!isRunning} onClick={this.handleStop}>
            Stop
          </button>
          <button disabled={!isRunning} onClick={this.togglePause}>
            {isPaused ? "Run" : "Pause"}{" "}
          </button>
          <button onClick={this.ToggleTrackRemaining}>
            {toggleTrackRemaining ? "Track remaining" : "Track running"}
          </button>
        </div>
        <p>Pause Count: {pauseCount}</p>
      </div>
    );
  }
}
