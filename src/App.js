import React, { useState, useEffect } from 'react'

import quizApi from './components/quizApi'

import './App.scss'

function App() {
  const [state, setState] = useState({
    questionBank: [],
  })

  const getQuestions = () => {
    quizApi().then((question) => {
      setState({
        questionBank: question,
      })
    })
  }

  useEffect(() => {
    getQuestions()
  }, [])

  return (
    <div className='App'>
      <div className='container'>
        <div className='title'>
          <h3>Quiz Test</h3>
        </div>
        {state.questionBank.length > 0 &&
          state.questionBank.map(
            ({ question, answers, correct, questionId }) => <h4>{question}</h4>
          )}
      </div>
    </div>
  )
}

export default App
