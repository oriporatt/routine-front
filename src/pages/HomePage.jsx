import { useEffect,useRef,useState} from "react";
import { useDispatch,useSelector} from 'react-redux'
import { useNavigate } from "react-router";


export function HomePage() {
    const navigate = useNavigate()
	const dispatch = useDispatch()


    return (
        <section className='home-page '>
          <p>Home Page</p>

        </section >
    )
}

