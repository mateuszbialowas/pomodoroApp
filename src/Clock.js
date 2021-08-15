import "./css/Clock.css";
import React from "react";

function normalizeTimeValues(minutes, seconds) {
  minutes = minutes < 0 ? 0 : minutes > 60 ? 59 : minutes;
  seconds = seconds < 0 ? 0 : seconds > 60 ? 59 : seconds;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  return [minutes, seconds];
}

export function Clock({ minutes = 0, seconds = 0 }) {
  // [minutes, seconds] = normalizeTimeValues(minutes, seconds);
  return (
    <div className="Clock">
      <span>
        {minutes}:{seconds}
      </span>
    </div>
  );
}
