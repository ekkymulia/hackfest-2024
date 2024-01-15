'use client'
import { signIn, useSession } from 'next-auth/react';
import { Flex } from '../components/styles/flex';
import { LoginCard } from '../components/home/login-card';
import { Router, useRouter } from 'next/router';
import { useEffect } from 'react';
import { Box } from '../components/styles/box';
import { Button } from '@nextui-org/react';

const Landing = () => {
    const session = useSession();
    const { push } = useRouter();



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
            <Button color="primary" css={{ marginTop: '$10'}} onClick={() => push('/login')}>
               Login Page
            </Button>
        </Flex>
    </Box>
    )

    
};

export default Landing;