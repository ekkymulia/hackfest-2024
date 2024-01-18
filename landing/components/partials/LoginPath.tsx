import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import {
  User,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { useSessionStorage } from "@uidotdev/usehooks";
import { usePathname } from "next/navigation";
import { auth } from "@/utils/firebase";

type LoginPathProps = {};

const LoginPath: React.FC<LoginPathProps> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useSessionStorage<User | null>("user", null);
  const [loginSession, setLoginSession] = useSessionStorage(
    "loginsession",
    null
  );
  const pathname = usePathname();

  const checkUser = async (mail: string) => {
    try {
      const idToken = await auth.currentUser?.getIdToken(/* forceRefresh */ true);
      const res = await fetch(`http://localhost:8000/api/v1/users`, {
        method: "POST",
        body: JSON.stringify({ email: mail }),
        headers: {
          "Content-Type": "application/json",
          "X-Firebase-AppCheck": idToken,
        },
      });

      const data = await res.json();
      console.log(data)

      if (data.success) {
        window.location.href = '/dashboard';
      }else{
        window.location.href = '/register';
      }
    
    } catch (err) {
      console.error("Fetch user error:", err);
      // Handle error, show user a message, etc.
    }
  };

  const handleSignIn = async () => {
    try {
      if (!auth.currentUser) {
        const googleProvider = new GoogleAuthProvider();
        await signInWithRedirect(auth, googleProvider);
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await auth
        .signOut()
        .then(() => {
          setIsLoading(true);
          setUser(null);
          setLoginSession(null);
        })
        .then(() => {
          window.location.href = "/";
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        setIsLoading(true);
        const response = await getRedirectResult(auth);

        if (response !== null) {
          setUser(response.user);

          console.log(response.user);

          // if (response.user !== null) {
          //   window.location.href = "/dashboard";
          // }

          if (response.user) {
            await checkUser(response.user.email);
          }
  
        } else {
          console.error("No redirect result available.");
        }
      } catch (error) {
        console.error("Error during redirect result:", error);
      } finally {
        setIsLoading(false);
      }
    };

    handleRedirectResult();
  }, []);

  return (
    <div>
      {user ? (
        pathname === "/" ? (
          <Button onClick={() => (window.location.href = "/dashboard")}>
            Dashboard
          </Button>
        ) : (
          <Button color="primary" onClick={handleLogout}>
            Logout
          </Button>
        )
      ) : (
        (pathname === "/" || pathname === "/about" || pathname === "/contact") && <Button color="primary" onClick={handleSignIn}>Login</Button>
      )}
    </div>
  );
};

export default LoginPath;
