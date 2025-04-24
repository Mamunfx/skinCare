import React from 'react';

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-10 px-6 my-32 rounded-lg">
            <div className="max-w-6xl mx-auto">


                <header className="text-center mb-10">
                    <h1 className="text-5xl font-bold text-gray-800 mb-4">About Us</h1>
                    <p className="text-lg text-gray-600">
                        Discover how <span className="font-semibold text-pink-500">Care</span> is revolutionizing personalized recommendations to enhance everyday decisions.
                    </p>
                </header>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Overview</h2>
                    <p className="text-gray-600 leading-7">
                        <strong>Care</strong> is a recommendation-giving platform providing personalized product suggestions based on user preferences, past interactions, and advanced algorithms. We prioritize simplicity, scalability, and security to deliver an exceptional user experience.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Our Vision</h2>
                    <p className="text-gray-600 leading-7">
                        At <strong>Care</strong>, our vision is to empower individuals to make confident and informed choices by delivering tailored recommendations that seamlessly align with their preferences, lifestyles, and goals. We aspire to be the go-to platform for discovering products that truly resonate with each user.
                    </p>
                </section>


                <section className="mb-10">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Our Mission</h2>
                    <p className="text-gray-600 leading-7">
                        Our mission is to combine cutting-edge technology with user-centric design to create an intuitive platform where personalized recommendations are both reliable and accessible. By fostering community-driven insights and leveraging advanced analytics, we aim to continuously enhance user satisfaction and build lasting trust.
                    </p>
                </section>


                <section className="mb-10">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Key Features</h2>
                    <ul className="list-disc list-inside text-gray-600 leading-7">
                        <li><strong>Personalized Recommendations</strong>: Tailored suggestions based on user profiles.</li>
                        <li><strong>Advanced Search & Filtering</strong>: Flexible and granular search options.</li>
                        <li><strong>User-Generated Content</strong>: Reviews, ratings, and Q&A features for community-driven insights.</li>
                        <li><strong>Social Sharing & Discovery</strong>: Share recommendations across social platforms.</li>
                        <li><strong>Data-Driven Insights</strong>: Analyze user behavior for continuous improvement.</li>
                    </ul>
                </section>


                <section className="mb-10">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Technologies Used</h2>
                    <p className="text-gray-600 leading-7">
                        Built using modern technologies like <strong>React.js</strong>, <strong>Firebase Authentication</strong>, and <strong>Bootstrap</strong> to create a seamless and responsive experience.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Contact Information</h2>
                    <div className="text-gray-600 leading-7">
                        <p><strong>Address:</strong>Army society Main Street, Dhaka, Bangladesh</p>
                        <p><strong>Phone:</strong> +880 1234-567-890</p>
                        <p><strong>Email:</strong> support@care.com</p>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default AboutUs;
