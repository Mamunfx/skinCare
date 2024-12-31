import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './../AuthProvider';
const Navbar = () => {
  const {logOut,user}=useContext(AuthContext);
  
    return (
        <div>
            <div className="navbar bg-pink-50 rounded-lg">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
         <li><Link to="/">Home</Link></li>
        <li><Link to="/Queries">Querires</Link></li>
       
      {
        user?<li><Link to="/RcForMe">Recomendations</Link></li>:""
      }
      {
        user?<li><Link to="/Myque">My queries</Link></li>:""
      }
      {
        user?<li><Link to="/MyReco">My recomendations</Link></li>:""
      }
        
      </ul>
    </div>

    <div>
    <Link className="btn btn-ghost text-xl">
    <div className='flex  items-center'>
      <img src="https://i.ibb.co.com/xgb3fnn/Arsenal-removebg-preview.png" alt="" className='h-16'/>
      <h1 className='text-3xl'>Care</h1>
      </div>
      </Link>
    </div>
 
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal ">
        <li className='text-lg'><Link to="/">Home</Link></li>
        <li className='text-lg'><Link to="/Queries">Querires</Link></li> 
    
        {
        user?<li className='text-lg'><Link to="/RcForMe">Recomendations</Link></li>:null
      }
      {
        user?<li className='text-lg'><Link to="/Myque">My queries</Link></li>:null
      }
      {
        user?<li className='text-lg'><Link to="/MyReco">My recomendations</Link></li>:null
      }
    </ul>
  </div>
  <div className="navbar-end space-x-2">
    {
      user ? 
      <div className='flex gap-1'>
        <div className="relative group inline-block"> 
        <img src={user.photoURL} alt="" className="w-12 h-12 rounded-full p-1 border" /> 
        <div className="absolute top-1/2 right-full transform -translate-y-1/2 mr-2 px-2 py-1 bg-pink-200 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity"> 
            {user.displayName} 
            </div> 
            </div>
        <Link  className='btn bg-pink-200' onClick={logOut}>Sing out</Link>
      </div>
      :
      <div className='flex gap-1'>
        <Link to="/login" className='btn  bg-pink-200 '>Sing in</Link>
      </div>
    }
  
  </div>
  
</div>
        </div>
    );
};

export default Navbar;