import React, { useState, useEffect } from 'react';
import Slider from './../Components/Slider';
import RecentQue from '../Components/RecentQue';
import Products from '../Components/Products';
import NewSection from './../Components/NewSection';

const Home = () => {
    const [theme, setTheme] = useState(
        localStorage.getItem('theme') || 'light'
    );

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    const handleGetTouch = (e) => {
        e.preventDefault();
    };

    return (
        <div className="w-11/12 mx-auto my-4 space-y-8">
            {/* Dark Mode Toggle */}
            <div className="flex justify-end">
                <label className="flex items-center space-x-2">
                    <span className="text-sm font-medium dark:text-gray-300">
                        {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
                    </span>
                    <input
                        type="checkbox"
                        className="toggle toggle-md"
                        checked={theme === 'dark'}
                        onChange={toggleTheme}
                    />
                </label>
            </div>

            {/* Main Components */}
            <Slider />
            <RecentQue />
            <Products />
            <NewSection />

            {/* Contact Form */}
            <div>
                <div className="bg-base-100 dark:bg-gray-900 shadow-2xl rounded-lg py-16">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-8 dark:text-white">
                            Get in Touch
                        </h2>
                        <form
                            className="max-w-lg mx-auto"
                            onSubmit={handleGetTouch}
                        >
                            <div className="mb-4">
                                <label
                                    className="block text-sm font-medium mb-1 dark:text-gray-300"
                                    htmlFor="name"
                                >
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-sm font-medium mb-1 dark:text-gray-300"
                                    htmlFor="email"
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-sm font-medium mb-1 dark:text-gray-300"
                                    htmlFor="message"
                                >
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    className="w-full p-2 border rounded bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                                    required
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                className="btn bg-pink-200 w-full dark:bg-pink-400 dark:text-gray-100"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
