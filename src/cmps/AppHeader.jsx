import { Link, NavLink ,useLocation} from 'react-router-dom'
import { useState,useEffect ,useRef} from 'react'
import { useNavigate } from 'react-router'
import { useSelector ,useDispatch} from 'react-redux'

import Routine from '../assets/svgs/Routine.svg?react'


export function AppHeader() {
	const location = useLocation();

	const dispatch = useDispatch()
	const systemMode = useSelector(storeState => storeState.systemModule.mode)
    const userId =useSelector(storeState => storeState.cardModule.filterBy.userId)


	return (
		<header className={`app-header main-container`}>
			<div className='header-elements'>
				{/* <div to="/" className="side-menu" onClick={()=>onToggleMenuModal()}>
					<img src="/img/menu.svg" alt="menu" className="menu-img"/>
				</div> */}

				<NavLink to="/" className="logo">
					<Routine/>
					<p className="linky-logo">Routine AI</p>
				</NavLink>

				<nav className='header-links'>
					<a className='remindme-link' href="#remindme">RemindMe</a>
					<a className='linky-link' href='#linky'>Linky</a>
					<a className='about-us-link' href="#about" >About</a>
					<a className='contact-us-link' href='#contact-us-href' >Contact Us</a>
					{/* <NavLink className='contact-us-link' >Contact Us</NavLink> */}
				</nav>
			</div>
		
		</header>
	)
}
