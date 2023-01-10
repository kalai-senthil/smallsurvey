import { useState } from 'react'
// import { Link } from "react-router-dom"
import './App.css'
import Header from './components/Header';
import { createContext, } from 'react';
import Main from './components/Main';
import forwardIcon from "./assets/forward.svg"

export const AppContext = createContext()
function App() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [questions, setQuestions] = useState([{ "ques": "Question1", "options": ["Positive", "Neutral", "Negative",], }, { "ques": "Question2", "options": ["Positive", "Neutral", "Negative",], }, { "ques": "Question3", "options": ["Positive", "Neutral", "Negative",], }, { "ques": "Question4", "options": ["Positive", "Neutral", "Negative",], }, { "ques": "Hia", "options": ["Positive", "Neutral", "Negative",], }, { "ques": "Hia", "options": ["Positive", "Neutral", "Negative",], }, { "ques": "Hia", "options": ["Positive", "Neutral", "Negative",], }, { "ques": "Hia", "options": ["Positive", "Neutral", "Negative",], }, { "ques": "Hia", "options": ["Positive", "Neutral", "Negative",], }, { "ques": "Hia", "options": ["Positive", "Neutral", "Negative",], }, { "ques": "Hia", "options": ["Positive", "Neutral", "Negative",], }, { "ques": "Hia", "options": ["Positive", "Neutral", "Negative",], }, { "ques": "Hia", "options": ["Positive", "Neutral", "Negative",], }, { "ques": "Hia", "options": ["Positive", "Neutral", "Negative",], }, { "ques": "Hia", "options": ["Positive", "Neutral", "Negative",], }, { "ques": "Hia", "options": ["Positive", "Neutral", "Negative",], }, { "ques": "Hia", "options": ["Positive", "Neutral", "Negative",], }, { "ques": "Hia", "options": ["Positive", "Neutral", "Negative",], }, { "ques": "Hia", "options": ["Positive", "Neutral", "Negative",], }, { "ques": "Hia", "options": ["Positive", "Neutral", "Negative",], }, { "ques": "Hia", "options": ["Positive", "Neutral", "Negative",], }, { "ques": "Hia", "options": ["Positive", "Neutral", "Negative",], }]);
  return (
    <AppContext.Provider value={{ questions, selectedIndex }}>
      <div className='app'>
        <Header />
        <Main />
        <button onClick={() => {

        }} style={{ "float": "right", "margin": "5em 0" }} className='btn'><img src={forwardIcon} alt="" /> Next</button>
      </div>
      {/* <Link to="/survey">Take Survey</Link> */}
    </AppContext.Provider>
  )
}

export default App
