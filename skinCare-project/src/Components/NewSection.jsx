import React from 'react';
import "daisyui";

const careFeatures = [
    {
        icon: "🔍",
        title: "Advanced Search & Filtering",
        description: "Explore products with flexible search and granular filters.",
    },
    {
        icon: "🤝",
        title: "Personalized Recommendations",
        description: "Get tailored suggestions based on your profile and interests.",
    },
    {
        icon: "⭐",
        title: "Product Reviews & Ratings",
        description: "Make informed decisions with user-generated reviews and ratings.",
    },
    {
        icon: "📈",
        title: "Data-Driven Insights",
        description: "Benefit from analytics-driven recommendations for better choices.",
    },
    {
        icon: "🔗",
        title: "Social Sharing",
        description: "Share your favorite products and reviews with your community.",
    },
];

const FeatureCard = ({ icon, title, description }) => (
    <div className="p-6 shadow-lg rounded-lg m-4 bg-white transform transition-transform hover:scale-105 hover:shadow-xl flex flex-col items-center text-center">
        <div className="text-5xl mb-4">{icon}</div>
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p>{description}</p>
        <div className="mt-4 w-16 h-1 bg-pink-300 rounded-full"></div>
    </div>
);

const NewSection = () => {
    return (
        <div className="py-12 pt-16">
            <h2 className="text-4xl font-bold text-center mb-6">Why Choose Care?</h2>
            <p className="text-center mb-10 text-gray-600 w-7/12 mx-auto">
                Care provides personalized recommendations and powerful tools to help users find the products they love, faster and smarter. Here's what makes Care stand out:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {careFeatures.map((feature, index) => (
                    <FeatureCard
                        key={index}
                        icon={feature.icon}
                        title={feature.title}
                        description={feature.description}
                    />
                ))}
            </div>
        </div>
    );
};

export default NewSection;
