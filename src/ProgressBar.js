import "./css/ProgressBar.css";
import React from "react";

export function ProgressBar({ percent = 25, trackRemaining = false }) {
  const style = trackRemaining
    ? {
        "--progress-bar": `${100 - percent}%`,
        flexDirection: "row-reverse",
      }
    : { "--progress-bar": `${percent}%` };
  return <div style={style} className={"ProgressBar"}></div>;
}
