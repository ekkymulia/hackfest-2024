'use client'
import { Button } from "@nextui-org/react";
import { useSessionStorage } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";

type UserCardProps = {
    handleLogout?: () => void;
    handleSignIn?: () => void;
    isLoading?: boolean;
}

const UserCard = ({ handleLogout, handleSignIn, isLoading }: UserCardProps) => {
  const [user, setUser] = useSessionStorage('user', null);
  const [uname, setUname] = useState('');

  useEffect(() => {
    setUname(user?.displayName);
  }, [uname]);

  return (
    <>
      {
        isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <div>LoginPage {uname}</div>
            {user ? (
              <Button color="primary" css={{ marginTop: '$10' }} onClick={handleLogout}>
                Logout Button
              </Button>
            ) : (
              <Button color="primary" css={{ marginTop: '$10' }} onClick={handleSignIn}>
                Login Button
              </Button>
            )}
          </>
        )
      }
    </>
  );
}

export default UserCard;