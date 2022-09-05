import {useRef, useState} from 'react';
import lottie from 'lottie-web';
import EnterCode from '../components/common/EnterCode';
import ReCaptcha from '../components/common/ReCaptcha';
import useWindowDimensions from '../hooks/useWindowDimensions';
import {isExpired} from '../utils/date';

const ENTER_CODE = '1015';

interface IntroPageProps {
  onNext?: () => void;
}

function IntroPage({onNext}: IntroPageProps) {
  const effectRef = useRef<HTMLDivElement>(null);

  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const {height} = useWindowDimensions(false);

  const handleSubmitCode = (value: string) => {
    const isCorrect = value === ENTER_CODE;

    if (isCorrect) {
      setIsSuccess(true);
    } else {
      setIsFailed(true);
    }
    
    if (effectRef.current) {
      lottie.destroy();

      const lt = lottie.loadAnimation({
        container: effectRef.current,
        renderer: 'svg',
        autoplay: false,
        loop: false,
        animationData: require(`../assets/lotties/${isCorrect ? 'success' : 'failed'}.json`),
      });
      lt.addEventListener('complete', () => {
        if (!isCorrect) {
          return;
        }
        const verifiedDate = window.localStorage.getItem('_kawlt');
        if (verifiedDate && !isExpired(verifiedDate)) {
          return onNext?.();
        }
        setIsVerified(isCorrect);
      });
      lt.play();
    }
  };

  const handleSubmitReCaptcha = () => {
    if (onNext) {
      window.localStorage.setItem('_kawlt', Date.now().toString());
      onNext();
    }
  };

  const borderColor = isSuccess 
    ? 'border-green-500'
    : isFailed ? 'border-rose-500' : '';

  return (
    <div className="bg-gray-100">
      <main
        className="h-screen flex flex-col items-center justify-center relative"
        style={{height}}
      >
        <div className="my-8 text-center text-5xl font-custom">
          <h1>어서와,</h1>
          <h1>결혼엠티는 처음이지?</h1>
        </div>
        <EnterCode
          length={4}
          onSubmit={handleSubmitCode}
          borderColor={borderColor}
          disabled={isSuccess}
        />
        {isVerified && (
          <ReCaptcha onSubmit={handleSubmitReCaptcha} />
        )}
        <div ref={effectRef} className="w-12 h-12 my-4" />
      </main>
    </div>
  );
}

export default IntroPage;
