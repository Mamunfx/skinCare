import React from 'react';
import { Link } from 'react-router-dom';

const Slider = () => {
    return (
        <div>
           <div className="carousel w-full rounded-lg">
  <div id="slide1" className="carousel-item relative w-full">
    <div className="hero  dark:bg-gray-900 h-fit py-16">
      <div className="hero-content flex flex-col lg:flex-row-reverse gap-8 p-4">
        <div className="w-full lg:w-1/2">
          <img
            src="https://i.ibb.co.com/f4GTXZW/16348288-Woman-with-magnifier-analyzing-question-marks-1.jpg"
            className="rounded-lg shadow-2xl w-full h-96 object-scale-down"
            alt="Product Analysis"
          />
        </div>
        <div className="w-full lg:w-1/2 text-center lg:text-left space-y-4">
          <h1 className="text-lg text-pink-300">Explore Product Alternatives</h1>
          <h1 className="text-3xl lg:text-5xl font-bold mt-4 lg:mt-0">
            Find Your Ideal Product
          </h1>
          <p className="py-4 lg:py-6 ">
            Discover detailed recommendations and alternatives for the products you query about. Make informed decisions based on comprehensive insights and user recommendations.
          </p>
          <div className="flex justify-center lg:justify-start gap-4 pt-4">
            <Link to="/Queries" className="btn bg-pink-300 ">View Queries</Link>
            <Link to="/Myque" className="btn btn-outline border-2 border-pink-300">Learn More</Link>
          </div>
        </div>
      </div>
    </div>
    <div className="absolute left-0 right-0 bottom-36 flex -translate-y-1/2 transform justify-between">
      <a href="#slide3" className="btn btn-circle">
        ❮
      </a>
      <a href="#slide2" className="btn btn-circle">
        ❯
      </a>
    </div>
  </div>

  <div id="slide2" className="carousel-item relative w-full">
    <div className="hero dark:bg-gray-900 h-fit py-16">
      <div className="hero-content flex flex-col lg:flex-row-reverse gap-8 p-4">
        <div className="w-full lg:w-1/2">
          <img
            src="https://i.ibb.co.com/LtPFVrT/22445014-2112-w037-n003-68-B-p1-68-1.jpg"
            className="rounded-lg shadow-2xl w-full h-96 object-center"
            alt="User Recommendations"
          />
        </div>
        <div className="w-full lg:w-1/2 text-center lg:text-left space-y-2">
          <h1 className="text-lg text-pink-300">User Insights</h1>
          <h1 className="text-3xl lg:text-5xl font-bold mt-4 lg:mt-0">
            Trusted Recommendations
          </h1>
          <p className="py-4 lg:py-6">
            Get insights from other users' recommendations to find the best products for your needs. Share your own experiences and help others make informed choices.
          </p>
          <div className="flex justify-center lg:justify-start gap-4 pt-8">
            <Link to="/Queries" className="btn bg-pink-300 ">Recommendations</Link>
            <Link to="/Myque" className="btn btn-outline border-2 border-pink-300">Learn More</Link>
          </div>
        </div>
      </div>
    </div>
    <div className="absolute left-0 right-0 bottom-32 flex -translate-y-1/2 transform justify-between">
      <a href="#slide1" className="btn btn-circle">
        ❮
      </a>
      <a href="#slide3" className="btn btn-circle">
        ❯
      </a>
    </div>
  </div>

  <div id="slide3" className="carousel-item relative w-full">
    <div className="hero  dark:bg-gray-900 h-fit py-16">
      <div className="hero-content flex flex-col lg:flex-row-reverse gap-8 p-4">
        <div className="w-full lg:w-1/2">
          <img
            src="https://i.ibb.co.com/2Y89KHN/11667041-20943401-1.jpg"
            className="rounded-lg shadow-2xl w-full h-96 object-scale-down"
            alt="Expert Advice"
          />
        </div>
        <div className="w-full lg:w-1/2 text-center lg:text-left space-y-2">
          <h1 className="text-lg text-pink-300">Expert Guidance</h1>
          <h1 className="text-3xl lg:text-5xl font-bold mt-4 lg:mt-0">
            Make Informed Choices
          </h1>
          <p className="py-4 lg:py-6 ">
            Our platform provides expert advice and detailed analysis to help you choose the right products. Get personalized recommendations based on your needs.
          </p>
          <div className="flex justify-center lg:justify-start gap-4 pt-12">
            <Link to="/AddQue" className="btn bg-pink-300 ">Get Expert Advice</Link>
          </div>
        </div>
      </div>
    </div>
    <div className="absolute left-0 right-0 bottom-36 flex -translate-y-1/2 transform justify-between">
      <a href="#slide2" className="btn btn-circle ">
        ❮
      </a>
      <a href="#slide1" className="btn btn-circle">
        ❯
      </a>
    </div>
  </div>
</div>

        </div>
    );
};

export default Slider;
