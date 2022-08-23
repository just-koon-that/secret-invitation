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
        <div className="mb-16 text-2xl text-center font-custom">
          <h1 className="text-4xl font-bold mb-8">
            어서와, 결혼엠티는 처음이지?
          </h1>
          <p>응, 나도 처음이야.</p>
        </div>
        <LocationSection />
        <StartTimeSection />
        <SleepEatSection />
        <ProgramSection />
        {/* TODO: 사진 영역 */}

        <div className="pb-16 text-2xl text-center font-custom">
          <h1 className="text-4xl font-bold mb-8">
            끝.
          </h1>
          <p>다양한 경품과 푸짐한 술&안주가 준비되어 있으니,</p>
          <p>세상 절겁게 놀다 가시길 바랍니다!</p>
        </div>
      </div>
    </main>
  );
}

export default MainPage;
