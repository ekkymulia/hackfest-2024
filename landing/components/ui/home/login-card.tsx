import {Button, Card, Text} from '@nextui-org/react';
import React from 'react';
import {Community} from '../icons/community';
import {Box} from '../styles/box';
import {Flex} from '../styles/flex';

import { signIn as nextAuthSignIn } from 'next-auth/react';
import { app, auth, firebase } from '../../utils/firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useRouter } from 'next/router';

export const LoginCard = () => {
   const { push } = useRouter();

   const handleSignIn = async () => {
      if (!auth.currentUser) {
         const googleProvider = auth;
         await signInWithPopup(auth, new GoogleAuthProvider);
      }

      await nextAuthSignIn('google', {callbackUrl: 'http://localhost:3000/dashboard'})
      
   //   push('/dashboard')
   };


   return (
      <Card
         css={{
            mw: '375px',
            bg: '$blue600',
            borderRadius: '$xl',
            px: '$6',
         }}
      >
         <Card.Body css={{py: '$10'}}>
            <Flex css={{gap: '$5'}}>
               <Community />
               <Flex direction={'column'}>
                  <Text span css={{color: 'white'}}>
                     ThenaWorks
                  </Text>
                  <Text span css={{color: 'white'}} size={'$xs'}>
                     Login Page
                  </Text>
               </Flex>
            </Flex>
            <Flex css={{gap: '$6', py: '$4'}} align={'center'}>
               <Text
                  span
                  size={'$xl'}
                  css={{color: 'white', marginTop: '$10'}}
                  weight={'semibold'}
               >
                 Welcome User
               </Text>
            </Flex>
            <Flex css={{gap: '$12'}} align={'center'}>
            <Button color="success" css={{ marginTop: '$10'}} onClick={handleSignIn}>
               Sign in With Google
            </Button>
            </Flex>
         </Card.Body>
      </Card>
   );
};
