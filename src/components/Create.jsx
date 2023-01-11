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
    const { questions } = useContext(AppContext)
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
    function setQues(index, ques) {
        let d = createdQues;
        d[index]['question'] = ques;
        d[index]['questionEdited'] = true;
        setCreatedQues([...d])
    }
    return (
        <div className='view'>
            {createdQuesLength === null ? <div><h2>Create</h2><input ref={inop} type="number" min="1" /><button className='btn' onClick={() => {
                const d = []
                if (inop.current.valueAsNumber >= 10) {
                    setCreatedQuesLength(inop.current.valueAsNumber)
                    for (let i = 0; i < inop.current.valueAsNumber; i++) {
                        d.push({ 'question': `Question ${i + 1}`, "options": ['Positive', "Neutral", "Negative"], "questionEdited": false })
                    }
                    setCreatedQues(d)
                    return
                }
                alert("Greator than 9")
            }}>Create createdQues</button></div> :
                <>
                    <Header questions={createdQues} selectedIndex={selectedIndex} />
                    <button disabled={selectedIndex === 0} onClick={navigateToPrevQuestion} className='btn'>
                        <img src={backIcon} alt="back" />
                        Previous
                    </button>
                    <EditMain isQuesSubmitted={isQuesSubmitted} isSubmitting={isSubmitting} submitQuestions={submitQuestions} setQues={setQues} questions={createdQues} selectedIndex={selectedIndex} navigateToNextQuestion={navigateToNextQuestion} />
                </>
            }
        </div>
    )
}

export default Create