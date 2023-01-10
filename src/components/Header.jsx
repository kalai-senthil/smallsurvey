import React,{useContext} from 'react'
import backIcon from "../assets/back.svg"
import { AppContext } from '../App'
function Header() {
    const { questions } = useContext(AppContext)
    return (
        <header className='header'>
            <h1>Header</h1>
            <div className="progress-bar">
                {[1, 2, 3, 4, 5, 6, 7, 8].map(e => <div />)}
            </div>
            <button className='btn'>
                <img src={backIcon} alt="back" />
                Previous
            </button>
        </header>
    )
}

export default Header