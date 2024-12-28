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

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const notify = (message = 'Success!') => toast.success(message, {
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
      .finally(() => setLoading(false));
  };

  const userLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .catch(error => notifyError(error.message))
      .finally(() => setLoading(false));
  };

  const logOut = () => {
    if (!user) {
      return;
    }
    setLoading(true);
    return signOut(auth)
      .then(() => notifyError('Logged out'))
      .catch(error => notifyError(error.message))
      .finally(() => setLoading(false));
  };

  const googleProvider = new GoogleAuthProvider();
  const handleGoogleSignIn = () => {
    setLoading(true);
    signInWithPopup(auth, googleProvider)
      .then(result => {
        setUser(result.user);
        notify();
      })
      .catch(error => {
        notifyError('Google sign-in failed');
        setUser(null);
      })
      .finally(() => setLoading(false));
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
      console.log('Auth state changed:', currentUser);
      setUser(currentUser);
      setLoading(false);
    });

    // Cleanup subscription on unmount
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
