import React, { useState } from "react";

const TruncatedText = ({ text, maxLength = 350 }) => {
  const [showFullText, setShowFullText] = useState(false);

  const truncatedText =
    text.substring(0, maxLength) + (text.length > maxLength ? "..." : "");

  return (
    <span>
      {showFullText ? text : truncatedText}
      {text.length > maxLength && (
        <div className="btn-mult-puțin">
          <button onClick={() => setShowFullText(!showFullText)}>
            {showFullText ? "vezi mai puțin" : "vezi mai mult"}
          </button>
        </div>
      )}
    </span>
  );
};

export default TruncatedText;
