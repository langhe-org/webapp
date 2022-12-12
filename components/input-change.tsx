import TextField, { TextFieldProps } from '@mui/material/TextField/TextField';
import React from 'react';
import { SyntheticEvent, useState, useRef, useEffect } from 'react';

/*
  input component with real on change
*/

const InputChange = (props: TextFieldProps) => {
  const [value, setValue] = useState<string | undefined>(props.value as string | undefined);
  const inputRef = useRef<HTMLInputElement>(null);

  const onInput = (e: SyntheticEvent) => {
    setValue((e.target as HTMLInputElement).value);
  }
  const onChange = (e: Event) => {
    if(props.onChange) {
      props.onChange(e as any);
    }
  }
  
  // useEffect being called twice in dev mode, so getting double event listeners
  useEffect(() => {
    // real onchange handler (not oninput)
    inputRef.current!.addEventListener("change", (e: Event) => {
      onChange(e)
    });
  }, []);

  let newProps = removeValueAndOnChange(props);

  return (
    <TextField
      {...newProps}
      value={value}
      inputRef={inputRef}
      onInput={onInput}
    />
  )
}

export default InputChange

function removeValueAndOnChange(props:TextFieldProps): TextFieldProps {
  let {onChange, value, ...newProps} = props;
  return newProps;
}
