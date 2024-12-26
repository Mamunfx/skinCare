import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from './../AuthProvider';
import LoadingState from "../Components/LoadingState";

const Signup = () => {
  const { handleGoogleSignIn, createNewUser, updateUserProfile,loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [errorMessage, setErrorMessage] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    setErrorMessage('');
    const email = e.target.email.value;
    const password = e.target.password.value;
    const Name = e.target.Name.value;
    const photo = e.target.photo?.value;

    createNewUser(email, password)
      .then((result) => {
        updateUserProfile({ displayName: Name, photoURL: photo })
          .then(() => {
            navigate(from, { replace: true });
          })
          .catch((err) => {
            setErrorMessage(err.message);
          });
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  };

  return (
    <div>
      {
        loading?
        <LoadingState></LoadingState>
        :
        <div className="hero bg-blue-600 min-h-fit rounded-lg py-24">
        <div className="hero-content flex-col lg:flex-row-reverse gap-16">
          <div className="text-center lg:text-left text-white">
            <h1 className="text-5xl font-bold">Sign up now!</h1>
            <p className="py-6 lg:w-3/4">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body" onSubmit={handleSignup}>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="input input-bordered"
                  name="Name"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your Photo URL"
                  className="input input-bordered"
                  name="photo"
                />
              </div>
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
              </div>
              {errorMessage && (
                <p className="text-red-600 mb-4">{errorMessage}</p>
              )}
              <div className="form-control mt-6">
                <button type="submit" className="btn text-white bg-blue-600">
                  Signup
                </button>
              </div>
              <div>
                <button
                  type="button"
                  className="submit btn text-white bg-blue-600 w-full"
                  onClick={() => handleGoogleSignIn()
                    .then(() => {
                      navigate(from, { replace: true });
                    })
                    .catch((err) => {
                      setErrorMessage(err.message);
                    })
                  }
                >
                  <div className="flex gap-2 items-center">
                    <p>Google</p>
                    <FcGoogle className="text-lg" />
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      }
    </div>
  );
};

export default Signup;
