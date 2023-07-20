import Button from '@mui/material/Button'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import router from 'next/router'
import styles from './create-success.module.css';
import { useState } from 'react';
import Divider from '@mui/material/Divider';

export interface Props {
  id: number;
  token: string;
}

const CreateSuccess = (props: Props) => {
  const [tokenCopied, setTokenCopied] = useState<boolean>(false);
  const [idCopied, setIdCopied] = useState<boolean>(false);

  const copyToken = () => {
    navigator.clipboard.writeText(props.token)
      .then(() => {
        setTokenCopied(true);
      });
  }
  const copyId = () => {
    navigator.clipboard.writeText(props.id.toString())
      .then(() => {
        setIdCopied(true);
      });
  }
  const done = () => {
    router.push("/");
  }

  return (
    <div className={styles.main}>
      <Typography variant='h3' sx={{ fontSize: 16 }}>
        Your greenhouse has been created!
      </Typography>

      <div className={styles.tokenWrapper}>
        <Typography variant='h1' sx={{ fontSize: 14 }}>
          Copy the greenhouse&apos;s ID and token, and paste it into the greenhouse controller&apos;s code.
        </Typography>

        <Card>
          <CardContent className={styles.tokenCard}>
            <p className={styles.title}>Greenhouse ID</p>
            <p className={styles.value}>{props.id}</p>
            <Button className={styles.action} variant="contained" onClick={copyId}>
              {idCopied ? "Copied!" : "Copy"}
            </Button>
            <Divider className={styles.divider} />
            <p className={styles.title}>Token</p>
            <p className={styles.value}>{props.token}</p>
            <Button className={styles.action} variant="contained" onClick={copyToken}>
              {tokenCopied ? "Copied!" : "Copy"}
            </Button>
          </CardContent>
        </Card>
      </div>

      <Button variant="contained" onClick={done}>Done</Button>
    </div>
  )
}

export default CreateSuccess
