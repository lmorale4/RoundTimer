import React from 'react';

const Timer = props => {
  let { minutes, seconds, currentRound, isBreak } = props;
  seconds = seconds === 60 || seconds < 0 ? 0 : seconds;
  minutes = minutes < 0 ? 0 : minutes;
  return (
    <div>
      {!isBreak ? (
        <h2>Current Round: {currentRound}</h2>
      ) : (
        <div>
          <h2>Break #{currentRound}</h2>
          <h3>Next Round {currentRound + 1}</h3>
        </div>
      )}
      <p>
        {minutes < 10 ? '0' + minutes : minutes} :{' '}
        {seconds < 10 ? '0' + seconds : seconds}
      </p>
    </div>
  );
};

export default Timer;
