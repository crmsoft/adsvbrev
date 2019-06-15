import { useState, useEffect, useCallback } from 'react';

export default function useLongPress(callback = () => {}, ms = 300) {
  const [startLongPress, setStartLongPress] = useState(false);

  useEffect(() => {
    let timerId;
    if (startLongPress) {
      timerId = setTimeout(callback, ms);
    } else {
      clearTimeout(timerId);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [startLongPress]);

  const start = useCallback(() => {
    setStartLongPress(true);
  }, []);
  const stop = useCallback(() => {
    setStartLongPress(false);
  }, []);

  return {
    onMouseDown: start,
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchStart: start,
    onTouchEnd: stop,
  };
}

/*
function MyComponent (props) {
  const backspaceLongPress = useLongPress(props.longPressBackspaceCallback, 500);

  return (
    <Page>
      <Button {...backspaceLongPress}>
        Click me
      </Button>
    </Page>
  );
};

*/
