import React from 'react'
function Header({ questions, selectedIndex }) {

    return (
        <header className='header'>
            <div className="progress-bar">
                {questions.map((_, i) => <div key={i} className={selectedIndex >= i ? "finished" : ''} />)}
            </div>
        </header>
    )
}

export default Header