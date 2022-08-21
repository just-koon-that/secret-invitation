import { useEffect, useRef, useState } from 'react';
import mainBannerImage from '../assets/images/main-banner.jpeg';
import loveLetteringImage from '../assets/images/love-lettering.gif';
import useWindowDimensions from '../hooks/useWindowDimensions';

function IntroSection() {
  const gifRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const {height} = useWindowDimensions(false);

  useEffect(() => {
    if (isLoaded && gifRef.current) {
      gifRef.current.src = loveLetteringImage;
    }
  }, [isLoaded]);

  return (
    <div className="relative mb-16">
      <img
        className="w-full object-cover"
        style={{height}}
        src={mainBannerImage}
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
