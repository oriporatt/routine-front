import { useEffect,useRef,useState} from "react";
import { useDispatch,useSelector} from 'react-redux'
import { useNavigate } from "react-router";
import { ContactUs } from "../cmps/ContactUs";

export function HomePage() {
    const navigate = useNavigate()
	const dispatch = useDispatch()
    

    return (
    <section className="home-page">
        {/* <h4>Automations.Routines.AI</h4> */}

        <div className="poducts">
              
            <div id="remindme" className="remind-me">
                <div className="image-wrapper">
                    <img src="/img/remindme.jpg" alt="RemindMe Bot Screenshot" />
                </div>                
                <div className="remind-me-text-content">
                    <h2>RemindMe</h2>
                    <p>RemindMe is your smart WhatsApp assistant for remembering crucial tasks and routines, like taking medication. With support for voice, images, and natural reminders, it helps you get things done effortlessly.</p> 
                </div>


            </div>

            <div id="linky" className="linky">
                <div className="image-wrapper">
                    <img src="/img/linky.jpg" alt="RemindMe Bot Screenshot" />
                </div>  
                <div className="linky-text-content">
                    <h2>Linky</h2>
                    <p>Linky is your smart WhatsApp link manager — helping you store, organize, and quickly retrieve important links before they get lost.</p> 
                </div>

            </div>
        </div>

        <div id="about" className="about">
            <h2>About Us</h2>
            <p>At <span>Routine AI</span> we specialize in building smart automation tools that help individuals and businesses streamline their daily routines. Whether it's a WhatsApp bot that reminds you to take your medication, a link-saving assistant to organize your online content, or custom workflows for habit tracking and task management — our mission is to make routine tasks smarter, faster, and more reliable. </p>
        </div>

        < ContactUs />
    </section>
    )
}

