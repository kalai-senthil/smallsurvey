import React, { useContext, useRef } from 'react'
import forwardIcon from "../assets/forward.svg"
import { AppContext } from '../App'
import selectedIcon from "../assets/selected.svg"
import { Link } from 'react-router-dom';
function Main() {
    const ele = useRef();
    const { questions, selectedIndex, answer, navigateToNextQuestion } = useContext(AppContext);
    return (
        <React.Fragment>
            <div className='main-content'>
                <p className="what-ques">QUESTION {selectedIndex + 1} / {questions.length}</p>
                <h2 className='question' ref={ele}>{questions[selectedIndex]['question']}</h2>
                <div className="options">
                    {questions[selectedIndex]['options'].map(option => {
                        let answerSelected = questions[selectedIndex]['answer'] === option;
                        return <div key={option} onClick={() => {
                            answer(selectedIndex, option, ele.current);

                        }} className={`option ${answerSelected && "selected"}`}>
                            <img className={`${answerSelected && "selected"}`} src={selectedIcon} alt="" />
                            <span>
                                {option}
                            </span>

                        </div>
                    }
                    )}
                </div>

            </div>
            {
                questions.length - 1 === selectedIndex ? <Link to="/view" disabled={questions[selectedIndex]['answer'] === undefined} style={{ "float": "right", "margin": "5em 0" }} className='btn'><img src={forwardIcon} alt="" />View</Link> :
                    <button disabled={questions[selectedIndex]['answer'] == undefined} onClick={() => {
                        ele.current.classList.add("changed");
                        setTimeout(() => {
                            ele.current.classList.remove("changed");
                            navigateToNextQuestion();
                        }, 300);

                    }} style={{ "float": "right", "margin": "5em 0" }} className='btn'><img src={forwardIcon} alt="" /> Next</button>
            }
        </React.Fragment>
    )
}

export default Main


