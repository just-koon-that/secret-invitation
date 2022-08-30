import {useEffect, useRef} from 'react';
import lottie from 'lottie-web';

function Loading() {
  const effectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!effectRef.current) {
      return;
    }
    lottie.destroy();

    lottie.loadAnimation({
      container: effectRef.current,
      renderer: 'svg',
      animationData: require(`../../assets/lotties/loading.json`),
    }).play();
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 200,
      }}
    >
      <div ref={effectRef} className="w-screen h-screen" />
    </div>
  )
}

export default Loading;
