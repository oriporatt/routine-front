//check
import React, { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import PropTypes from 'prop-types'

export function AboutUs() {
    const [count, setCount] = useState(100)

    function onTellMeMore() {
        console.log('Telling you more')
    }
    return (
        <section>
            <h2>About Us</h2>
            <nav>
                <NavLink to="team">Team</NavLink> |
                <NavLink to="vision">Vision</NavLink>
            </nav>

            <section>
                <Outlet />
            </section>

            <SplitPane
                left={
                    <Contacts />
                }
                right={
                    <Projects />
                } />

            <FancyBox onClose={() => console.log('ok, closing')}>
                <h3>{count.toLocaleString()} Followers</h3>
                <button onClick={onTellMeMore}>Tell me More</button>
            </FancyBox>

            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni aperiam quo veniam velit dolor reprehenderit, laudantium consequatur neque numquam labore quae. Accusamus libero perferendis ducimus? Alias unde hic quisquam doloremque.</p>
        </section>
    )
}

export function AboutTeam() {
    return (
        <section>
            <h2>Best Team</h2>
            <ul>
                <li>Popo Decaprio </li>
                <li>Jini Baba</li>
            </ul>
        </section>
    )
}


export function AboutVision() {
    return (
        <section>
            <h2>Vision</h2>
            <ul>
                <li>Save the day</li>
                <li>Spread some love</li>
                <li>Take over the world</li>
            </ul>
        </section>
    )
}


function FancyBox(props) {
    return <div className="fancy-box">
        <button style={{ float: 'right' }} onClick={props.onClose}>x</button>
        {props.children}
    </div>
}

FancyBox.propTypes = {
    onClose: PropTypes.func.isRequired
}

function Contacts() {
    return <section style={{ height: '50vh', backgroundColor: 'pink' }}>
        <h2>Contacts</h2>
        <p>Click me</p>
    </section>
}

function Projects() {
    const [projs, setProjs] = useState(['Puki Proj', 'Muki Proj'])
    const projList = projs.map((proj, idx) => (
        <article className="proj-preview" key={proj} onClick={(ev) => {
            ev.stopPropagation()
            setProjs(projs.filter(p => p !== proj))
        }}>
            {proj}
        </article>
    ))
    return <section style={{ minHeight: '50vh', backgroundColor: 'lightblue' }}>
        <h2>Projects</h2>
        {projList}
        <button onClick={ev => {
            ev.stopPropagation()
            setProjs([...projs, 'Babu Proj' + Date.now() % 100])
        }}>Add</button>
    </section>
}

function SplitPane(props) {

    const [width, setWidth] = useState(30)

    if (false && width === 60) {
        throw new Error('Projects cannot load')
    }
    return (
        <div className="split-pane" style={{
            display: 'flex'
        }}>
            <div style={{ width: width + '%' }} onClick={() => {
                if (width + 10 <= 100) setWidth(width + 10)
            }}>
                {props.left}
            </div>
            <div style={{ flex: 1 }} onClick={() => {
                if (width > 10) setWidth(width - 10)
            }}>
                {props.right}
            </div>
        </div>
    )
}


