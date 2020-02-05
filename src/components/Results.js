import React from 'react'

function Results({ score, playAgain }) {
  return (
    <div className='score-board'>
      <div className='score'>You scored {score} / 6 correct answers!</div>
      <button className='playBtn' onClick={playAgain}>
        Play again!
      </button>
    </div>
  )
}

export default Results
