import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from "firebase/auth";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createContext, useEffect, useState } from "react";
import { auth } from './firebase.init';
import LoadingState from './Components/LoadingState';
import axios from 'axios';
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const notify = (message = 'Success!') => toast.success(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
    });

  const notifyError = (message = 'Error!') => toast.error(message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });

  const createNewUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .catch(error => notifyError(error.message))
      .finally(() => {
        setLoading(false)
        alert("Signed up !")
      });
  };

  const userLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .catch(error => alert(error.message))
      .finally(() => {
        setLoading(false)
        notify("Logged in !")
      });
  };

  const logOut = () => {
    if (!user) {
      return;
    }
    setLoading(true);
    return signOut(auth)
      .catch(error => notifyError(error.message))
      .finally(() => {
        setLoading(false)
        notify('Logged out')
      });
  };

  const googleProvider = new GoogleAuthProvider();
const handleGoogleSignIn = () => {
  setLoading(true);
  return signInWithPopup(auth, googleProvider)
    .then(result => {
      setUser(result.user);
      notify("Google login Successful");
    })
    .catch(error => {
      alert('Google sign-in failed');
      setUser(null);
    })
    .finally(() => {
      setLoading(false)
    });
};


  const updateUserProfile = (profile) => {
    setLoading(true);
    return updateProfile(auth.currentUser, profile)
      .then(() => notify('Profile updated!'))
      .catch(error => notifyError(error.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      
      if (currentUser?.email) {
        const user = {email: currentUser.email};
        axios.post('https://a11-server-tau.vercel.app/JWT',user,{
          withCredentials:true
        })
        .then(res=> {
          //console.log('login token',res.data);
          setLoading(false)
        })
      }
      else{
        axios.post('https://a11-server-tau.vercel.app/logout',{},{
          withCredentials:true
        })
        .then(res=>{
          //console.log('logout',res.data);
          setLoading(false)
        })
      }
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    setUser,
    createNewUser,
    logOut,
    userLogin,
    loading,
    handleGoogleSignIn,
    notify,
    notifyError,
    updateUserProfile
  };

  if (loading) {
    return <LoadingState/>;
  }

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
      <ToastContainer />
    </AuthContext.Provider>
  );
};

export default AuthProvider;
