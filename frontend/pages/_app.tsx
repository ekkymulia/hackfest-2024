import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { createTheme, NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';
import { authOptions } from './api/auth/[...nextauth]';
import { getSession } from 'next-auth/react'; // Fix import
import { Layout } from '../components/layout/layout';
import { useEffect, useState } from 'react';
import Login from './login';
import { useRouter } from 'next/router';
import Landing from '.';

const lightTheme = createTheme({
  type: 'light',
  theme: {
    colors: {},
  },
});

const darkTheme = createTheme({
  type: 'dark',
  theme: {
    colors: {},
  },
});


function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const sessionData = await getSession(authOptions); // Use the appropriate authOptions
        setSession(sessionData);
      } catch (error) {
        console.error('Error fetching session:', error);
        setSession(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []); // Empty dependency array ensures the effect runs only once

  const publicPaths = ['/login', '/'];

  useEffect(() => {
    // Check if the user is authenticated and redirect if needed
    if (!loading && !session && !publicPaths.includes(publicPaths)) {
      router.push('/login'); // Redirect to login page if not authenticated
    }
  }, [session, router]);

  if (loading) {
    // Render a loading indicator or message
    return <div>Loading...</div>;
  }

  return (
    <NextThemesProvider
      defaultTheme="system"
      attribute="class"
      value={{
        light: lightTheme.className,
        dark: darkTheme.className,
      }}
    >
      <NextUIProvider>
        <SessionProvider session={session}>
        {!session ? (
            router.pathname === '/login' ? <Login /> :
            router.pathname === '/' ? <Landing /> : null
          ) : (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          )}
        </SessionProvider>
      </NextUIProvider>
    </NextThemesProvider>
  );
}

export default MyApp;
