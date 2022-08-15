import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { UserContext } from '../contexts/user'
import { useState } from 'react';
import { User } from '../types/user';

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User>();

  return (
    <UserContext.Provider value={{user, setUser}}>
      <Component {...pageProps} />
    </UserContext.Provider>
  )
}

export default MyApp
