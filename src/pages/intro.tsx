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

  const handleSubmit = (value: string) => {
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
  const borderColor = isSuccess 
    ? 'border-green-500'
    : isFailed ? 'border-rose-500' : '';
  return (
    <main className="h-screen bg-gray-100 flex flex-col items-center justify-center relative">
      <h1 className="text-4xl font-bold font-nanum mb-16">
        어서와, 결혼엠티는 처음이지?
      </h1>
      <EnterCode
        length={4}
        onSubmit={handleSubmit}
        borderColor={borderColor}
        disabled={isSuccess}
      />
      {isVerified && (
        <ReCaptcha />
      )}
      <div ref={effectRef} className="w-12 h-12" />
    </main>
  );
}

export default IntroPage;
