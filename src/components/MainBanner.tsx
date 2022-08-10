import { useEffect, useRef, useState } from 'react';
import mainBannerImage from '../assets/images/main-banner.jpg';
import loveLetteringImage from '../assets/images/love-lettering.gif';

function MainBanner() {
  const gifRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isLoaded && gifRef.current) {
      gifRef.current.src = loveLetteringImage;
    }
  }, [isLoaded]);

  return (
    <div className="relative">
      <img
        className="h-screen w-full object-cover"
        src={mainBannerImage}
        onLoad={() => setIsLoaded(true)}
        alt="Main banner"
      />
      <img
        ref={gifRef}
        className={`absolute top-10 ${isLoaded ? 'block' : 'hidden'}`}
        alt="Love lettering"
      />
    </div>
  )
}

export default MainBanner;
