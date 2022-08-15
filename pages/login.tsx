import type { NextPage } from 'next'
import Script from 'next/script'
import { NextRouter, useRouter } from 'next/router';
import { api, JWT_KEY } from '../services/api';
import { User } from '../types/user';
import { Typography } from '@mui/material';

let outsideRouterRef: NextRouter;

const Login: NextPage = () => {
  let router = useRouter()
  outsideRouterRef = router;

  const styles = {
    main: {
      textAlign: "center",
      display: "grid",
      height: "100vh",
      alignContent: "baseline",
      justifyItems: "center",
      rowGap: "40px",
      padding: "100px 0",
    },
  }

  return (
    <div style={styles.main}>
      <Typography variant='h2' sx={{fontSize: 22}}>Welcome to Langhe</Typography>
      <Typography variant='h2' sx={{fontSize: 18}}>Please log in</Typography>
      <GoogleLoginButton />
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
          console.log(user);
          outsideRouterRef.push("/");
        })
    } else {
      // There was an error.
      alert("Auth error")
    }
  }
}

const GoogleLoginButton = () => {
  return (
    <div>
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
