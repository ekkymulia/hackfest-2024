'use client'
import React, { useEffect, useState } from 'react';
import { Button } from '@nextui-org/react';
import { auth } from '@/utils/firebase';
import { GoogleAuthProvider, signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { useSessionStorage } from "@uidotdev/usehooks";
import UserCard from '@/components/ui/user/usercard';

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [uname, setUname] = useState('');
  const [user, setUser] = useSessionStorage('user', null);
  const [loginSession, setLoginSession] = useSessionStorage('loginsession', null);

  // handle session setelah signin
  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        setIsLoading(true);
        const response = await getRedirectResult(auth);
        setUser(response.user);
        setUname(response.user.displayName);
        setLoginSession(response);
  
        // Redirect to dashboard when user is available
        if (response.user !== null) {
          window.location.href = '/dashboard';
        }
      } catch (error) {
        console.error('Error during redirect result:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    handleRedirectResult();
  }, []);
  

  //handle google signin
  const handleSignIn = async () => {
    try {
      if (!auth.currentUser) {
        const googleProvider = new GoogleAuthProvider();
        await signInWithRedirect(auth, googleProvider);
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };

  //handle logout dan hapus session
  const handleLogout = async () => {
    try {
      auth.signOut()
      .then(() => {
        setUser(null);
        setUname('');
        setLoginSession(null);
      })
    } catch (error) {
      console.log(error);
    }
  }

  // contoh penggunaan session
  useEffect(() => {
    //redirect ke dashboard
    if (user !== null) {
      window.location.href = '/dashboard';
    }

    setUname(user?.displayName);
  }, [user])

  return (
    <UserCard handleLogout={handleLogout} handleSignIn={handleSignIn} isLoading={isLoading} />
  );
};

export default LoginPage;
