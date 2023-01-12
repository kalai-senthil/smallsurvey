import React, { useContext, useRef, useState } from 'react'
import Header from './Header';
import EditMain from './EditMain';
import backIcon from "../assets/back.svg"
import { addDoc, deleteDoc, doc } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import db from '../firebase';
import { AppContext } from '../App';

function Create() {
    const [createdQues, setCreatedQues] = useState([]);
    const inop = useRef()
    const { questions, depts } = useContext(AppContext)
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isQuesSubmitted, setIsQuesSubmitted] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [createdQuesLength, setCreatedQuesLength] = useState(null);
    function navigateToNextQuestion() {
        const nxt = selectedIndex + 1;
        if (nxt < createdQues.length) {
            setSelectedIndex(selectedIndex + 1)
        }
    }
    function navigateToPrevQuestion() {
        const nxt = selectedIndex - 1;
        if (nxt !== -1) {
            setSelectedIndex(selectedIndex - 1)
        }
    }
    async function deleteQuestions() {
        for (let i = 0; i < questions.length; i++) {
            const { id } = questions[i];
            await deleteDoc(doc(db, `questions/${id}`));
        }
        for (let i = 0; i < createdQues.length; i++) {
            const ques = createdQues[i];
            delete ques['questionEdited'];
            await addDoc(collection(db, "questions"), { ...ques, order: i })
        }
        setIsSubmitting(false);
        setIsQuesSubmitted(true);
    }
    async function submitQuestions() {
        setIsSubmitting(true);
        deleteQuestions();
    }
    function setCategory(index, cate) {
        const d = createdQues;
        d[index]['category'] = cate;
        setCreatedQues([...d]);
    }
    function setQues(index, ques) {
        let d = createdQues;
        d[index]['question'] = ques;
        d[index]['questionEdited'] = true;
        setCreatedQues([...d])
    }
    return (
        <div >
            
            {createdQuesLength === null ?
            <div className='view-  main-content'>
                <div>
                    <h2>QUESTIONARIES</h2>
                    <p className='text-regular'>Enter the number of questions have to be created</p> 
                </div>
                <div className='login-form-content'>
                    <input placeholder='Example:10' className='input' ref={inop} type="number" min="1" />
                    <button className='btn' onClick={() => {
                    const d = []
                    if (inop.current.valueAsNumber >= 10) {
                        setCreatedQuesLength(inop.current.valueAsNumber)
                        for (let i = 0; i < inop.current.valueAsNumber; i++) {
                            d.push({ 'question': `Question ${i + 1}`, "options": ['Positive', "Neutral", "Negative"], "questionEdited": false, "category": "College" })
                        }
                        setCreatedQues(d)
                        return
                    }
                    alert("Greater than 9")
                    }}>Create</button>
                </div>
            </div>
              :
                <div className='app'>
                    <Header questions={createdQues} selectedIndex={selectedIndex} />
                    <button disabled={selectedIndex === 0} onClick={navigateToPrevQuestion} className='btn-'>
                        <img src={backIcon} style={{"height":"20px "}}  alt="back" />
                        Previous
                    </button>
                    <EditMain setCategory={setCategory} isQuesSubmitted={isQuesSubmitted} depts={depts} isSubmitting={isSubmitting} submitQuestions={submitQuestions} setQues={setQues} questions={createdQues} selectedIndex={selectedIndex} navigateToNextQuestion={navigateToNextQuestion} />
                </div>
            }
        </div>
    )
}

export default Create