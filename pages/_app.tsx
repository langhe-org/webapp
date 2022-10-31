import '../styles/globals.css'
import { UserContext } from '../contexts/user'
import { useState } from 'react';
import { User } from '../types/user';
import { CacheProvider, ThemeProvider } from '@emotion/react';
import Head from 'next/head';
import createEmotionCache from '../src/createEmotionCache';
import theme from '../src/theme';
import PropTypes from 'prop-types';

const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props: any) {
  const [user, setUser] = useState<User>();

  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Langhe</title>
        <meta name="theme-color" content={theme.palette.primary.main} />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
        {/* CSS reset */}
        <style>{`
          @namespace svg "http://www.w3.org/2000/svg";
          :not(svg|*) {
            all: unset;
            display: revert;
            box-sizing: border-box;
          }

          [default-styles] {
            all: revert;
          }
        `}</style>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Head>
      <ThemeProvider theme={theme}>
        <UserContext.Provider value={{user, setUser}}>
          <Component {...pageProps} />
        </UserContext.Provider>
      </ThemeProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
