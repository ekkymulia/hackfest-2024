'use client'
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Input, Select, SelectItem } from '@nextui-org/react';
import { auth } from '@/utils/firebase';
import { GoogleAuthProvider, signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { useSessionStorage } from "@uidotdev/usehooks";
const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [uname, setUname] = useState("");
  const [user, setUser] = useSessionStorage("user", null);
  const [loginSession, setLoginSession] = useSessionStorage(
    "loginsession",
    null
  );

  const [userForm, setUserForm] = useState({
        name: user?.displayName,
        email: user?.email,
        phone: '',
        role: '', // assuming you have a property for the user type
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setUserForm((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const submitUser = async () => {
    try {
      const idToken = await auth.currentUser?.getIdToken(/* forceRefresh */ true);
      const res = await fetch(`http://localhost:8000/api/v1/users/addnew`, {
        method: "POST",
        body: JSON.stringify(userForm),
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

  const handleRegister = async () => {
    try {
      const user = await submitUser();

      if(user?.success == true){
        window.location.href = '/dashboard';
      }

    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };

  useEffect(() => {
    setUname(user?.displayName);
  }, []);

  const tipeUser = [{label: "Client", value: "2", description: "Memiliki Pekerjaan dan sedang mencari freelancer"},{label: "Freelancer", value: "3", description: "Memiliki skill dan sedang mencari penghasilan"}]
  
  return (
    <div className='w-full flex flex-col gap-4'>
        <div className='w-full mt-5'>

            
            <div className='col-span-12 flex flex-col justify-center gap-3'>
                <h1 className='col-span-6 mt-5 mb-2 flex justify-center gap-3 text-3xl'>Hola, {uname}! 👋</h1>
                <h2 className='col-span-6 mb-10 flex justify-center gap-3 text-xl'>Lengkapi Akunmu dulu yuk!</h2>
            </div>

            <div className='grid grid-cols-12 col-span-12 justify-center flex flex-col gap-4'>
                <div className='col-span-12 flex justify-center gap-3'>
                    <Input size={'md'} type="text" className='col-span-6 max-w-md' value={user?.displayName} name='name' onChange={handleInputChange} label="Name" placeholder="Enter your name" />
                    <Input size={'md'} type="email" className='col-span-6 max-w-md' value={user?.email} name='email' onChange={handleInputChange} label="Email" placeholder="Enter your email" />
                </div>

                {/* <div className='col-span-12 flex justify-center gap-3'>
                    <Input size={'md'} type="password" className='col-span-6 max-w-md' label="Password" placeholder="Enter your password" />
                    <Input size={'md'} type="password" className='col-span-6 max-w-md' label="Password Confirmation" placeholder="Enter your password again" />
                </div> */}

                <div className='col-span-12 flex justify-center gap-3'>
                    <Input size={'md'} type="number" className='col-span-6 max-w-md' label="Phone Number" value={user?.phoneNumber} name='phone' onChange={handleInputChange} placeholder="Enter your phone number" />
                    <Select
                    items={tipeUser}
                    label="Saya adalah"
                    placeholder="Pilih Tipe User"
                    className="max-w-md"
                    name='role'
                    onChange={handleInputChange}
                    >
                    {(tipeUser) => <SelectItem key={tipeUser.value}>{tipeUser.label}</SelectItem>}
                    </Select>
                </div>

                <div className='col-span-12 flex justify-center gap-3'>
                    <Button color='success' className='col-span-6 mt-4 flex justify-center gap-3' onClick={handleRegister}>Okay, Done!</Button>
                </div>

            </div>
            
        </div>
    </div>
  );
};

export default RegisterPage;