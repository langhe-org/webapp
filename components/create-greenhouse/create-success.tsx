import Button from '@mui/material/Button'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import router from 'next/router'
import styles from './create-success.module.css';
import { useState } from 'react';

interface Props {
  token: string;
}

const CreateSuccess = (props: Props) => {
  const [copied, setCopied] = useState<boolean>(false);

  const copy = () => {
    navigator.clipboard.writeText(props.token)
      .then(() => {
        setCopied(true);
      });
  }
  const done = () => {
    router.push("/");
  }

  return (
    <div className={styles.main}>
      <Typography variant='h3' sx={{ fontSize: 16,  }}>
        Your greenhouse has been created!
      </Typography>

      <div className={styles.tokenWrapper}>
        <Typography variant='h1' sx={{ fontSize: 14 }}>
          Copy the greenhouse&apos;s token, and paste it into the greenhouse-controller&apos;s code.
        </Typography>

        <Card>
          <CardContent className={styles.tokenCard}>
            <p className={styles.token}>{props.token}</p>
            <Button variant="contained" onClick={copy}>
              {copied ? "Copied!" : "Copy"}
            </Button>
          </CardContent>
        </Card>
      </div>

      <Button variant="contained" onClick={done}>Done</Button>
    </div>
  )
}

export default CreateSuccess
