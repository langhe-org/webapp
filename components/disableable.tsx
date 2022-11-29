/*
  Can only reduce opacity of it's children, can't actually disable them.
  Has some hardcoded styles, can be moved to parent component if need to use this component in contexts that need different styles.
*/

import { ReactNode } from 'react';

const styles = {
  main: {
    display: "grid",
    gridGap: "20px",
  },
  isDisabled: {
    filter: "opacity(.5)",
  },
};

interface Props {
  isDisabled: boolean;
  children: ReactNode;
}

const Disableable = (props: Props) => {
  let mainStyles;
  if(props.isDisabled) {
    mainStyles = {
      ...styles.main,
      ...styles.isDisabled,
    }
  } else {
    mainStyles = styles.main;
  }
  return (
    <div style={mainStyles}>{props.children}</div>
  )
}

export default Disableable
