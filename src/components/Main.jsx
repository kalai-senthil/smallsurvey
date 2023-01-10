import React, { useContext } from 'react'
import { AppContext } from '../App'

function Main() {
    const { questions, selectedIndex } = useContext(AppContext)
    return (
        <div className='main-content'>
            <p className="what-ques">Question {selectedIndex + 1} /{questions.length}</p>
            <h2>{questions[selectedIndex]['ques']}</h2>
            <div className="options">
                {questions[selectedIndex]['options'].map(option =>
                    <div className='option'>
                        {option}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Main