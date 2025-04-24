import React from 'react';
import Navbar from './../Components/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './../Components/Footer';

const Root = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className='my-8 w-11/12 mx-auto mt-28'>
            <Outlet></Outlet>
            </div>
            
            <Footer></Footer>
        </div>
    );
};

export default Root;