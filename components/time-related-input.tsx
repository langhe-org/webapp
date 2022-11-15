import React from 'react';
import { SyntheticEvent, KeyboardEvent, useState, useRef, useEffect } from 'react';

interface Props {
  onChange: (value: string) => void;
  type: "time" | "date" | "datetime-local",
  value: string,
}

/*
  Component explanation:

  This component is a wrapper around the input element that is limiting the times when onChange is fired to times when the user is most likely to have finished making their changes, somewhat similar to the native browser onchange event but a bit more limited than that.
  onChange will be fired in any of the following cases:
  1. when the browser fires an onchange event (not oninput) AND the input is not coming from the keyboard* (onkeydown).
  2. when the user presses the enter key (onkeyup && key == "Enter")
  3. when the user focuses away from the input (onblur) AND the value has changed.

  * change events coming from keyboard are being ignored because browses fire onchange event events on time related inputs whenever the input is valid, unlike other inputs where the browser is waiting for the user the hint that they're done.
*/

const TimeRelatedInput = (props: Props) => {
  const [value, setValue] = useState(props.value);
  const [keyHeldDown, setKeyHeldDown] = useState(false);
  const keyHeldDownRef = useRef(keyHeldDown);
  const inputRef = useRef<HTMLInputElement>(null);

  const onInput = (e: SyntheticEvent) => {
    setValue((e.target as HTMLInputElement).value);
  }
  const onChange = (e: Event) => {
    if(!keyHeldDownRef.current) {
      props.onChange(value);
    }
  }
  const keyUp = (e: KeyboardEvent) => {
    if(e.key === "Enter") {
      props.onChange(value);
    }
  }
  const keyDown = (e: KeyboardEvent) => {
    setKeyHeldDown(true);

    setTimeout(() => {
      setKeyHeldDown(false);
    })
  }
  const onBlur = (e: SyntheticEvent) => {
    if(props.value !== value) {
      props.onChange(value);
    }
  }

  useEffect(() => {
    // real onchange handler (not oninput)
    inputRef.current!.addEventListener("change", (e: Event) => {
      onChange(e)
    });
  }, []);

  useEffect(() => {
    keyHeldDownRef.current = keyHeldDown;
  }, [keyHeldDown]);

  return (
    <input
      type={props.type}
      value={value}
      ref={inputRef}
      onInput={onInput}
      onKeyUp={keyUp}
      onKeyDown={keyDown}
      onBlur={onBlur}
    />
  )
}

export default TimeRelatedInput
