import { useContext, useEffect, useState } from 'react'
import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import './App.css'
import backIcon from "./assets/back.svg"
import Header from './components/Header';
import { createContext, } from 'react';
import Main from './components/Main';
import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, setDoc } from "firebase/firestore"
import db from './firebase';
import ViewResult from './components/ViewResult';
import Admin from './components/Admin';
import Create from './components/Create';

export const AppContext = createContext();
function App() {
  const [client, setClient] = useState({ 'name': null, "regno": null, "department": null, "year": null })
  const [gotDetails, setGotDetails] = useState(false)
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [depts, setDepts] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  async function getQuestions() {
    const d = await getDocs(query(collection(db, "questions"), orderBy("order")));
    const tempQues = [];
    d.docs.forEach(doc => {
      tempQues.push({ ...doc.data(), "id": doc.id });
    })
    setQuestions(tempQues);
    setLoading(false)
  }
  async function getDepts() {
    const docsRef = await getDocs(collection(db, "departments"));
    const _depst = []
    for (let i = 0; i < docsRef.docs.length; i++) {
      const doc = docsRef.docs[i];
      _depst.push({ ...doc.data(), id: doc.id });

    }
    setDepts(_depst);
    getQuestions();

  }
  function getDetails(choice, val) {
    setClient({ ...client, [choice]: val })
  }
  useEffect(() => {
    getDepts();
    return () => { }
  }, [])
  async function submitFeedback() {
    setIsSubmitting(true);
    const userDoc = doc(db, `feedbacksUsers/${client.regno}`);
    const _ref = await getDoc(userDoc)
    if (!_ref.exists()) {
      await setDoc(userDoc, client);
      for (let i = 0; i < questions.length; i++) {
        const ques = questions[i];
        await addDoc(collection(db, "feedbacks"), { ...ques, "submittedBy": _ref.id, "index": i });
      }
      setIsSubmitting(false);
      setIsFormSubmitted(true);
    }
  }
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  function navigateToNextQuestion() {
    if (gotDetails) {
      const nxt = selectedIndex + 1;
      if (nxt < questions.length) {
        setSelectedIndex(selectedIndex + 1)
      }
      return;
    }
    if (client.department !== null && client.name !== null && client.name !== null && client.year !== null) {
      setGotDetails(true);
    }
  }
  function navigateToPrevQuestion() {
    const nxt = selectedIndex - 1;
    if (nxt !== -1) {
      setSelectedIndex(selectedIndex - 1)
    }
  }
  function answer(quesIndex, answer) {
    let d = questions;
    d[quesIndex]['isAnswered'] = true;
    d[quesIndex]['answer'] = answer;
    setQuestions([...d]);
  }
  return (
    <AppContext.Provider value={{ getDetails, gotDetails, navigateToNextQuestion, submitFeedback, depts, isFormSubmitted, isSubmitting, answer, questions, loading, selectedIndex, navigateToNextQuestion, navigateToPrevQuestion }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route element={<ViewResult />} path='/view' />
          <Route element={<Admin />} path='/admin' />
          <Route element={<Create />} path='/create' />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  )
}




function Home() {
  const { loading, getDetails, gotDetails, navigateToPrevQuestion, navigateToNextQuestion, depts, selectedIndex, questions } = useContext(AppContext);

  return !gotDetails ?
    <div>
      <div>
        <h1>FEEDBACK FORM</h1>
        <p>Enter the details to jump into the survey</p>
      </div >
      <div>
        <label>Name :</label>
        <input onChange={(v) => {
          getDetails('name', v.target.value.toUpperCase());
        }} type="text" required />
      </div><div>
        <label>Register No:</label>
        <input
          onChange={(v) => {
            getDetails('regno', v.target.value.toUpperCase());
          }}
          type="text" required />
      </div>
      <label>Department</label>
      <select
        onChange={(v) => {
          getDetails('department', v.target.value);
        }}
      >
        <option value="">Select Department</option>
        {depts.map(dept => <option key={dept.id} value={dept.abbr}>{dept.name}</option>)}

      </select>
      <div></div>
      <label>Year</label>
      <select
        onChange={(v) => {
          getDetails('year', v.target.value);
        }}
      >
        <option>Select Year</option>
        <option >I</option>
        <option >II</option>
        <option >III</option>
        <option >IV</option>
      </select>
      <button onClick={navigateToNextQuestion} className='btn'>Next</button>
    </div>
    :
    (
      loading ? "Loading..." :
        <div className='app'>
          <Header questions={questions} selectedIndex={selectedIndex} />
          <button disabled={selectedIndex === 0} onClick={navigateToPrevQuestion} className='btn'>
            <img src={backIcon} alt="back" />
            Previous
          </button>
          <Main />
        </div>
    )
}

export default App;
