import React from 'react'
import { Routes, Route } from 'react-router'
import { useDispatch,useSelector} from 'react-redux'

import { HomePage } from './pages/HomePage'
import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { UserMsg } from './cmps/UserMsg.jsx'
import {CardIndex} from './pages/CardIndex.jsx'

export function RootCmp() {
    const showMenuMobile = useSelector(storeState => storeState.systemModule.showMenuMobile)
    const dispatch = useDispatch()

    return (
        <div >
            <AppHeader />
            <UserMsg />
            {/* <MenuMobile showMenuMobile={showMenuMobile} onCloseMenuModal={onCloseMenuModal} /> */}

            {/* <GigPreviewCarrousel/> */}
            <main className='main-container'>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/card" element={<CardIndex />} />
                    {/* <Route path="about" element={<AboutUs />}>
                        <Route path="team" element={<AboutTeam />} />
                        <Route path="vision" element={<AboutVision />} />
                    </Route>
                    <Route path="gig" element={<GigIndex />} />
                    <Route path="gig/:gigId" element={<GigDetails />} />
                    <Route path="user/:id" element={<UserDetails />} />
                    <Route path="review" element={<ReviewIndex />} />
                    <Route path="chat" element={<ChatApp />} />
                    <Route path="admin" element={<AdminIndex />} />
                    <Route path="login" element={<LoginSignup />}>
                        <Route index element={<Login />} />
                        <Route path="signup" element={<Signup />} />
                    </Route>
                    <Route path="seller" element={<SellerIndex />}></Route> */}
                </Routes>
            </main>
            {/* <AppFooter /> */}
        </div>
    )
}


