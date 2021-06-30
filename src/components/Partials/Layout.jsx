import React from 'react';
import Footer from './Footer';
import Header from './Header';
import Navbar from './Navbar';

import "./partial.css";

function Layout({children}) {
    return (
        <>
            <Header/>
            <Navbar/>
            <main id="main">
                {children}
            </main>
            <Footer/>
        </>
    )
}

export default Layout
