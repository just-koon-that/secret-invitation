import {useEffect} from 'react';
import IntroSection from '../components/IntroSection';
import LocationSection from '../components/LocationSection';
import StartTimeSection from '../components/StartTimeSection';
import SleepEatSection from '../components/SleepEatSection';
import ProgramSection from '../components/ProgramSection';

function MainPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-gray-200">
      <div className="max-w-md m-auto  bg-white">
        <IntroSection />
        <div className="mb-16 font-custom">
          <h1 className="text-4xl font-bol text-center mb-8">
            어서와, 결혼엠티는 처음이지?
          </h1>
          <p className="text-lg text-center">
            응, 나도 처음이야.
          </p>
        </div>
        <LocationSection />
        <StartTimeSection />
        <SleepEatSection />
        <ProgramSection />
      </div>
    </main>
  );
}

export default MainPage;
