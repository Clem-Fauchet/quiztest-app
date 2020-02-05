import React, { useState, useEffect } from 'react'

import quizApi from './components/quizApi'
import './components/assets/style.scss'

import './App.scss'
import QuestionBox from './components/QuestionBox'
import Results from './components/Results'

function App() {
  const [state, setState] = useState({
    questionBank: [],
    score: 0,
    responses: 0,
  })

  const computeAnswer = (answer, correctAnswer) => {
    if (answer === correctAnswer) {
      setState({
        ...state,
        responses: state.responses < 6 ? state.responses + 1 : 6,
        score: state.score + 1,
      })
    } else {
      setState({
        ...state,
        responses: state.responses < 6 ? state.responses + 1 : 6,
        score: state.score,
      })
    }
    console.log(state.score)
  }

  const playAgain = () => {
    quizApi().then((question) => {
      setState({
        ...state,
        questionBank: question,
        score: 0,
        responses: 0,
      })
    })
  }

  useEffect(() => {
    quizApi().then((question) => {
      setState({
        ...state,
        questionBank: question,
      })
    })
  }, [])

  return (
    <div className='App'>
      <div className='container'>
        <div className='title'>
          <h3>Quiz Test</h3>
        </div>
        {state.questionBank.length > 0 &&
          state.responses < 6 &&
          state.questionBank.map(
            ({ question, answers, correct, questionId }) => (
              <QuestionBox
                question={question}
                options={answers}
                key={questionId}
                selected={(answer) => computeAnswer(answer, correct)}
              />
            )
          )}

        {state.responses === 6 ? (
          <Results score={state.score} playAgain={playAgain} />
        ) : null}
      </div>
    </div>
  )
}

export default App
