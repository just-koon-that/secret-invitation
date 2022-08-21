import {useEffect, useState} from 'react';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

export default function useWindowDimensions(update = true) {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    update && window.addEventListener('resize', handleResize);
    return () => {
      update && window.removeEventListener('resize', handleResize);
    }
  }, [update]);

  return windowDimensions;
}
