'use client'
import React, { useEffect, useState } from 'react';
import { Button } from '@nextui-org/react';
import { auth } from '@/utils/firebase';
import { GoogleAuthProvider, signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { useSessionStorage } from "@uidotdev/usehooks";
const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [uname, setUname] = useState("");
  const [user, setUser] = useSessionStorage("user", null);
  const [loginSession, setLoginSession] = useSessionStorage(
    "loginsession",
    null
  );

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

  const checkUser = async () => {
    try {
      const idToken = await auth.currentUser?.getIdToken(/* forceRefresh */ true);
      const res = await fetch(`http://localhost:8000/api/v1/users`, {
        method: "POST",
        body: JSON.stringify({ email: auth.currentUser?.email }),
        headers: {
          "X-Firebase-AppCheck": idToken,
        },
      });

      const data = await res.json();
      console.log(data)

      if (data.status === "success") {
        window.location.href = '/dashboard';
      }else{
        window.location.href = '/register';
      }
    
    } catch (err) {
      console.error("Fetch user error:", err);
      // Handle error, show user a message, etc.
    }
  };

  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        setIsLoading(true);
        const response = await getRedirectResult(auth);
        setUser(response.user);
        setUname(response.user.displayName);
        setLoginSession(response);

        if (response.user) {
          await checkUser();
        }

  
      } catch (error) {
        console.error('Error during redirect result:', error);
      } finally {
        setIsLoading(false);
      }
    };

    handleRedirectResult();
  }, []);

  return (
    <div>
      {user ? (
        <div>Welcome, {uname}!</div>
      ) : (
        <Button onClick={handleSignIn}>Login</Button>
      )}
    </div>
  );
};

export default LoginPage;