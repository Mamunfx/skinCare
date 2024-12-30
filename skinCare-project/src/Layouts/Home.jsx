import React from 'react';
import Slider from './../Components/Slider';
import RecentQue from '../Components/RecentQue';

const Home = () => {
    return (
        <div className='w-11/12 mx-auto my-8'>
            <Slider></Slider>
            <RecentQue></RecentQue>
        </div>
    );
};

export default Home;