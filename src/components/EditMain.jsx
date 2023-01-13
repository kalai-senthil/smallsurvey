import React, { useContext, useEffect, useRef, useState } from 'react'
import forwardIcon from "../assets/forward.svg"
import editIcon from "../assets/edit.svg"
import doneIcon from "../assets/selected.svg"
import { Link } from 'react-router-dom';
function EditMain({ questions, setCategory, depts, isSubmitting, isQuesSubmitted, submitQuestions, setQues, selectedIndex, navigateToNextQuestion }) {
    const [categories, setCategories] = useState([])
    const ele = useRef();
    const headRef = useRef()
    const [edit, setEdit] = useState(false);
    useEffect(() => {
        const d = ["College"]
        depts.forEach(dept => {
            dept['courses'].forEach(cat => {
                d.push(cat)
            })
        })
        setCategories(d);
        return () => {

        }
    }, [depts])
    if (isSubmitting)
        return <h2>Questions Submitting</h2>
    if (isQuesSubmitted)
        return <div>
            <h2>Questions Submitted</h2>
            <Link to="/admin"><button className='btn'>Go to Dashboard</button></Link>
        </div>
    return (
        <React.Fragment>
            <div className='main-content-'>
                <p className="what-ques">QUESTION {selectedIndex + 1} / {questions.length}</p>
                <p className='text-regular'>Select the course to set the question</p>
                <select className='input'>
                    {categories.map(cat => <option onClick={() => {
                        setCategory(selectedIndex, cat);
                    }} key={cat} className={questions[selectedIndex]['category'] === cat ? "selected" : ""}>{cat}</option>)}
                </select> 
                <div className='fromAdmin'>
                    {edit
                        ? <input className='input- support' ref={ele} autoFocus onKeyUp={(e) => {
                            if (e.key === "Enter") {
                                setQues(selectedIndex, ele.current.value);

                            }
                        }} onBlur={() => {
                            setQues(selectedIndex, ele.current.value);
                        }} placeholder='Type Question?...' /> : 
                        <h3  ref={headRef} autoFocus className='question'>{questions[selectedIndex]['question']}</h3>
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
                questions.length - 1 === selectedIndex ? 
                <button onClick={submitQuestions} disabled={questions[selectedIndex]['questionEdited'] === false} 
                style={{ "float": "right", "margin": "5em 0" }} className='btn--    '><img src={forwardIcon} alt="" />Submit Questions</button> :
                    <button disabled={questions[selectedIndex]['questionEdited'] === false} onClick={() => {
                        headRef.current.classList.add("changed");
                        setTimeout(() => {
                            headRef.current.classList.remove("changed");
                            navigateToNextQuestion();
                        }, 300);

                    }} style={{ "float": "right", "margin": "5em 0" }} className='btn--'><img src={forwardIcon} alt="" /> Next</button>
            }
        </React.Fragment>
    )
}

export default EditMain


