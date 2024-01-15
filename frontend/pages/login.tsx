'use client'
import { signIn, useSession } from 'next-auth/react';
import { Flex } from '../components/styles/flex';
import { LoginCard } from '../components/home/login-card';
import { Router, useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Box } from '../components/styles/box';

const Login = () => {
    const session = useSession();
    const { push } = useRouter();
    const [check, setCheck] = useState(false);


    return (
    <Box>
        <Flex
            css={{
            'gap': '$10',
            'padding': '$10',
            'alignItems': 'center',
            'justifyContent': 'center',
            '@sm': {
                flexWrap: 'nowrap',
            },
            }}
            direction={'row'}
        >
            <LoginCard />
        </Flex>
    </Box>
    )

    
};

export default Login;