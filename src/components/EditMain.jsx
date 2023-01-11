import React, { useContext, useRef, useState } from 'react'
import forwardIcon from "../assets/forward.svg"
import { AppContext } from '../App'
import selectedIcon from "../assets/selected.svg"
import editIcon from "../assets/edit.svg"
import doneIcon from "../assets/selected.svg"
import { Link } from 'react-router-dom';
function EditMain({ questions, isSubmitting, isQuesSubmitted, submitQuestions, setQues, selectedIndex, navigateToNextQuestion }) {
    const ele = useRef();
    const headRef = useRef()
    const [edit, setEdit] = useState(false);
    if (isSubmitting)
        return <h2>Questions Submitting</h2>
    if (isQuesSubmitted)
        return <>
            <h2>Questions Submitted</h2>
            <Link to="/admin"><button className='btn'>Go to Dashboard</button></Link>
        </>
    return (
        <React.Fragment>
            <div className='main-content'>
                <p className="what-ques">QUESTION {selectedIndex + 1} / {questions.length}</p>
                <div className='option fromAdmin'>
                    {edit
                        ? <input ref={ele} autoFocus onKeyUp={(e) => {
                            if (e.key === "Enter") {
                                setQues(selectedIndex, ele.current.value);

                            }
                        }} onBlur={() => {
                            setQues(selectedIndex, ele.current.value);
                        }} placeholder='Type Question?...' /> : <h2 ref={headRef} autoFocus className='question'>{questions[selectedIndex]['question']}</h2>
                    }
                    <img className='selected' onClick={() => {
                        setEdit(!edit)
                    }} src={edit ? doneIcon : editIcon} alt="done" />
                </div>
                <div className="options">
                    {questions[selectedIndex]['options'].map(option => {
                        let answerSelected = questions[selectedIndex]['answer'] === option;
                        return <div key={option} className={`option ${answerSelected && "selected"}`}>
                            <span>
                                {option}
                            </span>
                        </div>
                    }
                    )}
                </div>
            </div>
            {
                questions.length - 1 === selectedIndex ? <button onClick={submitQuestions
                } disabled={questions[selectedIndex]['questionEdited'] === false} style={{ "float": "right", "margin": "5em 0" }} className='btn'><img src={forwardIcon} alt="" />Submit Questions</button> :
                    <button disabled={questions[selectedIndex]['questionEdited'] === false} onClick={() => {
                        headRef.current.classList.add("changed");
                        setTimeout(() => {
                            headRef.current.classList.remove("changed");
                            navigateToNextQuestion();
                        }, 300);

                    }} style={{ "float": "right", "margin": "5em 0" }} className='btn'><img src={forwardIcon} alt="" /> Next</button>
            }
        </React.Fragment>
    )
}

export default EditMain


