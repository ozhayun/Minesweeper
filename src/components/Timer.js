import React, { useState, useEffect } from "react";
import "./Timer.css"
export default function Timer({ time }) {

    return (
        <div className="Timer">
      <span role="img" aria-label="clock" style={{ paddingRight: 10 }}>
        ⏰
      </span>
            {time}
        </div>
    );
}