import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer className="footer bg-base-200 text-base-content pb-4">
      <div>
        <Link className="btn btn-ghost">
          <div className="flex  items-center">
            <img
              src="https://i.ibb.co.com/xgb3fnn/Arsenal-removebg-preview.png"
              alt=""
              className="h-24"
            />
            <h1 className="text-4xl">Care</h1>
          </div>
        </Link>
      </div>
      </footer>
      <footer className="footer bg-base-200 text-base-content p-10 text-lg ">

        <nav>
          <h6 className="footer-title ">Services</h6>
          <Link className="link link-hover " to="/Queries">Queries</Link>
          <Link className="link link-hover " to="/AddQue">Add query</Link>
          <Link className="link link-hover " to="/Myque">My queries</Link>
          <Link className="link link-hover " to="/RcForMe">Recommendations</Link>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <Link className="link link-hover " to="/AboutUs">About us</Link>
          <Link className="link link-hover " to="/AboutUs">Contact</Link>
          <Link className="link link-hover " to="/AboutUs">Press kit</Link>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <Link className="link link-hover " to="/AboutUs">Terms of use</Link>
          <Link className="link link-hover " to="/AboutUs">Privacy policy</Link>
          <Link className="link link-hover " to="/AboutUs">Cookie policy</Link>
        </nav>
      </footer>

      <footer className="footer bg-base-200 text-base-content border-base-300 border-t px-10 py-4">
        <aside className="grid-flow-col items-center">
          <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
        </aside>
        
      </footer>
    </div>
  );
};

export default Footer;
