import {useRef, useState} from 'react';
import lottie from 'lottie-web';
import EnterCode from '../components/common/EnterCode';
import ReCaptcha from '../components/common/ReCaptcha';

const ENTER_CODE = '1234';

interface IntroPageProps {
  onNext?: () => void;
}

function IntroPage({onNext}: IntroPageProps) {
  const effectRef = useRef<HTMLDivElement>(null);

  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

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
        setIsVerified(isCorrect);
      });
      lt.play();
    }
  };

  const handleSubmitReCaptcha = () => {
    onNext && onNext();
  };

  const borderColor = isSuccess 
    ? 'border-green-500'
    : isFailed ? 'border-rose-500' : '';

  return (
    <main className="h-screen bg-gray-100 flex flex-col items-center justify-center relative">
      <div className="mb-16 text-center text-4xl font-bold">
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
  );
}

export default IntroPage;
