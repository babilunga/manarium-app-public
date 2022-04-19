import '../../style/UI/game_card_image.css';

import { useState } from 'react';

function GameCardImage(props) {
  const { video, isBlured, image, index } = props.data;
  const [timeoutId, setTimeoutId] = useState(0);

  return (
    <div
      className={`games_image`}
      onMouseEnter={() => {
        if (index !== undefined) {
          clearTimeout(timeoutId);
          const videoEl = document.getElementById(`video${index + 1}`);
          videoEl !== null && videoEl.play();
        }
      }}
      onMouseLeave={() => {
        if (index !== undefined) {
          const videoEl = document.getElementById(`video${index + 1}`);
          videoEl !== null && videoEl.pause();
          setTimeoutId(
            setTimeout(() => {
              const videoLoad = document.getElementById(`video${index + 1}`);
              videoLoad !== null && videoLoad.load();
              clearTimeout(timeoutId);
            }, 500)
          );
        }
      }}
    >
      <img
        src={image}
        alt={`game${index + 1} thumbnail`}
        className={isBlured ? 'blured' : ''}
      />
      {video && index !== undefined ? (
        <video
          id={`video${index + 1}`}
          preload="auto"
          loop
          muted
          className="games_video"
          playsInline
          controls=""
        >
          <source src={video} type="video/mp4" />
        </video>
      ) : null}
    </div>
  );
}

export default GameCardImage;
