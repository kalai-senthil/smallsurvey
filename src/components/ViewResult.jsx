import React, { useContext } from 'react'
import { AppContext } from './../App';
import forward from '../assets/forward.svg';
import done from '../assets/done.gif';
import { useNavigate,Link } from 'react-router-dom';

function ViewResult() {
    const Navigation = useNavigate()
    const { questions, submitFeedback, isSubmitting, isFormSubmitted } = useContext(AppContext);
    return (
        <div className='view'>
            <div className='fixed header '>
            <img src={forward} onClick={()=>Navigation(-1)} style={{"transform":"rotate(180deg)","cursor":"pointer"}} alt="" />
            <h3>YOUR FEEDBACKS</h3>
            </div>
            
            {isFormSubmitted ? <div className='font-semibold bg'>
                <img src={done} className="gif" alt="" />
                <p>FEEDBACK SUBMITTED!</p>
                <button onClick={()=>{
                    window.location.href = '/';
                    setTimeout(() => {
                        window.location.reload();
                    }, 100);
                }} className='btn '>Done</button>
                </div> :
                <div className='bg'>
                    {isSubmitting ? <div>
                        <p className='font-medium'>Form Submitting...</p> 
                        <img src="" alt="" />
                    </div> : questions.map((ques, i) => <ShowQuestion key={ques.id} index={i + 1} {...ques} />)}
                    {!isSubmitting&&<button onClick={submitFeedback} style={{ 'float': "right", "margin": "1em 2em" }} className='btn   '>
                        SUBMIT
                    </button>}
                </div>
            }
        </div>
    )
}

export default ViewResult
function ShowQuestion({ question, options, index, answer }) {
    return <div className='main-content'>
        <p className="what-ques">QUESTION {index}</p>
        <h3 className='question'>{question}</h3>
        <div className="options">
            {options.map(_option => {
                let answerSelected = _option === answer;
                return <div key={_option} className={`option ${answerSelected && "selected"}`}>
                    <span>
                        {_option}
                    </span>

                </div>
            }
            )}
        </div>

    </div>
}