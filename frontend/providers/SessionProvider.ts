'use client'

import { ReactNode } from 'react';
import { Session } from 'next-auth';
import { SessionProvider as Provider } from 'next-auth/react'; // Correct import

type Props = {
  children: ReactNode;
  // session: Session | null;
};

export default function SessionProvider ({ children }: Props) {
  return (
    <Provider> 
      {children}
    </Provider>
  );
};

