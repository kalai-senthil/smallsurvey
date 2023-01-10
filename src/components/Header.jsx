import React, { useContext } from 'react'
import { AppContext } from '../App'
function Header() {
    const { questions, selectedIndex } = useContext(AppContext)
    return (
        <header className='header'>
            <div className="progress-bar">
                {questions.map((_, i) => <div key={_.id} className={selectedIndex >= i ? "finished" : ''} />)}
            </div>
        </header>
    )
}

export default Header