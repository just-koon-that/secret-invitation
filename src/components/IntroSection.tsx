import { useEffect, useRef, useState } from 'react';
import mainBannerImage from '../assets/images/main-banner.jpeg';
import loveLetteringImage from '../assets/images/love-lettering.gif';

function IntroSection() {
  const gifRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isLoaded && gifRef.current) {
      gifRef.current.src = loveLetteringImage;
    }
  }, [isLoaded]);

  return (
    <div className="relative mb-16">
      <img
        className="h-screen w-full object-cover"
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
