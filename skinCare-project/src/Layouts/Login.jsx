import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from './../AuthProvider';
import LoadingState from './../Components/LoadingState';
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { userLogin, user, notifyError, notify, loading, handleGoogleSignIn } = useContext(AuthContext);
  const navigate = useNavigate(); 
  const location = useLocation(); 
  const from = location.state?.from?.pathname || '/';
  
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!user) {
      try {
        await userLogin(email, password);
        navigate(from, { replace: true });
      } catch (error) {
        notifyError(error.message);
        setErrorMessage(error.message);
      }
    } else {
      setErrorMessage('Already logged in.');
    }
  };

  return (
    <div>
      {loading ? 
        <LoadingState /> 
        : 
        <div className="hero bg-pink-50 min-h-fit rounded-lg py-24">
          <div className="hero-content flex-col lg:flex-row-reverse gap-16">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Sign in now!</h1>
              <p className="py-6 lg:w-3/4">
                Join and explore our hundreds of sports equipment! We ensure quality over quantity and make sure you get the right product for your need!
              </p>
            </div>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
              <form className="card-body" onSubmit={handleSignup}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    className="input input-bordered"
                    name="email"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="password"
                    className="input input-bordered"
                    name="password"
                    required
                  />
                  <label className="label">
                    <Link to="/Signup">
                      Don't have an account?
                      <span className="text-pink-300 font-semibold"> Sign up</span>
                    </Link>
                  </label>
                </div>
                {errorMessage && (
                  <p className="text-red-600 mb-4">{errorMessage}</p>
                )}
                <div className="form-control mt-6">
                  <button type="submit" className="btn bg-pink-200">
                    Sign In
                  </button>
                </div>
                <button
                  type="button"
                  className="submit btn bg-pink-200 w-full"
                  onClick={() => {
                    handleGoogleSignIn()
                      .then(() => {
                        navigate("/");
                      })
                      .catch((err) => {
                        setErrorMessage(err.message);
                      });
                  }}
                >
                  <div className="flex gap-2 items-center">
                    <p>Google</p>
                    <FcGoogle className="text-lg" />
                  </div>
                </button>
              </form>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default Login;
