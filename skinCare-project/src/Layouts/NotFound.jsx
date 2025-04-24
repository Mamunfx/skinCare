


import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-500 to-pink-400 text-white">
            <div className="text-center">
                
                <h1 className="text-9xl font-extrabold tracking-wide mb-4">404</h1>

                <p className="text-2xl font-medium mb-6">
                    Uh-oh! You seem lost in the digital space.
                </p>

                <Link
                    to="/"
                    className="inline-block px-8 py-4 bg-pink-300 text-gray-800 rounded-xl text-lg shadow-md hover:bg-pink-500 transform hover:scale-105 transition-transform duration-300"
                >
                    Take Me Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
