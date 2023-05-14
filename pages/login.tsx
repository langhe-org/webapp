import type { NextPage } from 'next'
import Script from 'next/script'
import { NextRouter, useRouter } from 'next/router';
import { api, JWT_KEY } from '../services/api';
import { User } from '../types/user';
import { Typography } from '@mui/material';
import { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/user';

const Login: NextPage = () => {
  let router = useRouter();
  const {setUser} = useContext(UserContext);
  
  const onLogin = (user: User) => {
    setUser(user);
    if(!user.greenhouse_ids.length)
      router.push(`/create-greenhouse`);
    else
      router.push(`/`)
  }

  const styles = {
    main: {
      display: "grid",
      height: "100vh",
      alignContent: "center",
      justifyItems: "center",
      rowGap: "34px",
      backgroundColor: "#37562E",
      color: "#ffffff",
    },
    h1: {
      fontSize: 66,
    },
    copyright: {
      fontSize: 12,
      position: "absolute",
      bottom: 16,
      textAlign: "center",
      width: "100%",
    },
  }

  const year = new Date().getFullYear();

  return (
    <div style={styles.main}>
      <Typography variant='h1' sx={styles.h1}>langhe</Typography>
      <GoogleLoginButton onLogin={onLogin} />
      <Typography sx={styles.copyright}>© {year} langhe</Typography>
    </div>
  )
}

export default Login


if (typeof window !== 'undefined') {
  // @ts-ignore
  window.handleCredentialResponse = function (authResult) {
    if (authResult['credential']) {
      localStorage.setItem(JWT_KEY, authResult['credential']);
      api<User>(`/auth/google`, "POST")
        .then(user => {
          // @ts-ignore
          window.GoogleLoginButtonOnLogin(user);
        })
    } else {
      // There was an error.
      alert("Auth error")
    }
  }
}

interface GoogleLoginButtonProps {
  onLogin: (user: User) => void;
}
const GoogleLoginButton = (props: GoogleLoginButtonProps) => {

  useEffect(() => {
    // set on window so that it can be called from outside
    // @ts-ignore
    window.GoogleLoginButtonOnLogin = props.onLogin;

    () => {
      // @ts-ignore
      delete window.GoogleLoginButtonOnLogin;
    }
  }, []);
  return (
    // hardcoded height so that there are no content shifting when button is updating it's internal UI
    <div style={{height: 44}}>
      <Script src="https://accounts.google.com/gsi/client" />

      <div id="g_id_onload"
        data-client_id="671368880891-0oo7o2iek3f920j29po34dkbpk8ki18o.apps.googleusercontent.com"
        data-callback="handleCredentialResponse"
        data-auto_prompt="false"
      />
      <div className="g_id_signin" />
    </div>
  )
}
