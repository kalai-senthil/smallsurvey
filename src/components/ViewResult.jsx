import React, { useContext } from 'react'
import { AppContext } from './../App';
import selectedIcon from "../assets/selected.svg"

function ViewResult() {
    const { questions, submitFeedback, isSubmitting, isFormSubmitted } = useContext(AppContext);
    return (
        <div className='view'>
            <h3 className='header'>Your Feedbacks</h3>
            {isFormSubmitted ? <div>Feedback Submitted</div> :
                <div className='bg'>
                    {isSubmitting ? <div>Form Submitting</div> : questions.map((ques, i) => <ShowQuestion key={ques.id} index={i + 1} {...ques} />)}
                    <button onClick={submitFeedback} style={{ 'float': "right", "margin": "1em 2em" }} className='btn'>
                        Submit
                    </button>
                </div>
            }
        </div>
    )
}

export default ViewResult
function ShowQuestion({ question, options, index, answer }) {
    return <div className='main-content'>
        <p className="what-ques">QUESTION {index}</p>
        <h2 className='question'>{question}</h2>
        <div className="options">
            {options.map(_option => {
                let answerSelected = _option === answer;
                return <div key={_option} className={`option ${answerSelected && "selected"}`}>
                    <img className={`${answerSelected && "selected"}`} src={selectedIcon} alt="" />
                    <span>
                        {_option}
                    </span>

                </div>
            }
            )}
        </div>

    </div>
}