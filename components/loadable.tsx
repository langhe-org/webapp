import { CircularProgress } from '@mui/material';
import { ReactNode } from 'react';

const styles = {
  main: {
    display: "grid",
  },
  content: {
    gridColumn: 1,
    gridRow: 1,
  },
  contentLoading: {
    filter: "grayscale(1) opacity(.5)",
  },
  loader: {
    gridColumn: 1,
    gridRow: 1,
    display: "grid",
    placeItems: "center",
    zIndex: 1,
  },
};

interface Props {
  isLoading: boolean;
  children: ReactNode;
}

const Loadable = (props: Props) => {
  let contentStyles;
  if(props.isLoading) {
    contentStyles = {
      ...styles.content,
      ...styles.contentLoading,
    }
  } else {
    contentStyles = styles.content;
  }
  return (
    <div style={styles.main}>
      <div style={contentStyles}>{props.children}</div>
      {props.isLoading && (
        <div style={styles.loader}>
          <CircularProgress />
        </div>
      )}
    </div>
  )
}

export default Loadable
