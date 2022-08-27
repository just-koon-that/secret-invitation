import { useEffect, useRef, useState } from 'react';
import useWindowDimensions from '../hooks/useWindowDimensions';
import {AWS_CDN_URL} from '../constants';

function IntroSection() {
  const gifRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const {height} = useWindowDimensions(false);

  useEffect(() => {
    if (isLoaded && gifRef.current) {
      gifRef.current.src = `${AWS_CDN_URL}/love-lettering.gif`;
    }
  }, [isLoaded]);

  return (
    <div className="relative mb-16">
      <img
        className="w-full object-cover"
        style={{height}}
        src={`${AWS_CDN_URL}/banner.jpeg`}
        onLoad={() => setIsLoaded(true)}
        alt="Main banner"
      />
      <img
        ref={gifRef}
        className={`absolute bottom-72 ${isLoaded ? 'block' : 'hidden'}`}
        alt="Love lettering"
      />
    </div>
  )
}

export default IntroSection;
