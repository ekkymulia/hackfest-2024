"use client"
import UserCard from '@/components/ui/user/usercard'
import { auth } from '@/utils/firebase'
// import { Box } from '@/components/ui/styles/box'
// import { Flex } from '@/components/ui/styles/flex'
import { Button } from '@nextui-org/react'
import { useSessionStorage } from '@uidotdev/usehooks'
import { FirebaseError } from 'firebase/app'
import firebase from 'firebase/auth'
import React, { useEffect, useState } from 'react'

const DashboardPage = () => {

    const [user, setUser] = useSessionStorage('user', null);
    const [isLoading, setIsLoading] = useState(false);
    const [loginSession, setLoginSession] = useSessionStorage('loginsession', null);
    const [fetchedUser, setFetchedUser] = useState([]);
    
    //handle logout dan hapus session
    const handleLogout = async () => {
        try {
            await auth.signOut()
            .then(() => {
                setIsLoading(true);
                setUser(null);
                setLoginSession(null);
            })
            .then(() => {
                window.location.href = '/';
            })
        } catch (error) {
            console.log(error);
        }
    }

    //fetch user data
    const fetchUser = async () => {
        try {
          const idToken = await auth.currentUser?.getIdToken(/* forceRefresh */ true);
          const res = await fetch(`http://localhost:8000/api/v1/users`, {
            method: "GET",
            headers: {
              "X-Firebase-AppCheck": idToken,
            },
          });
    
          const data = await res.json();

        if (data) {
            setFetchedUser(data.results.data);
        }
        } catch (err) {
          console.error("Fetch user error:", err);
          // Handle error, show user a message, etc.
        }
      };
    
      useEffect(() => {
        fetchUser();
      }, []);

    return (
        <>
        <UserCard handleLogout={handleLogout} isLoading={isLoading}  />
        {
            fetchedUser.length > 0 ? (
                <div>
                    {fetchedUser.map((user) => (
                        <div key={user.id}>
                            <div>{user.name}</div>
                            <div>{user.email}</div>
                        </div>
                    ))}
                </div>
            ) : (
                <div>Loading User...</div>
            )
        }
        </>
    )
}

export default DashboardPage