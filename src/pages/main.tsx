import {useEffect} from 'react';
import IntroSection from '../components/IntroSection';
import LocationSection from '../components/LocationSection';
import StartTimeSection from '../components/StartTimeSection';
import SleepEatSection from '../components/SleepEatSection';
import ProgramSection from '../components/ProgramSection';
import ImageSection from '../components/ImageSection';

function MainPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="bg-gray-200">
      <div className="max-w-md m-auto  bg-white">
        <IntroSection />
        <div className="mb-32 text-2xl text-center font-custom">
          <h1 className="text-4xl font-bold mb-8">
            어서와, 결혼엠티는 처음이지?
          </h1>
          <div className="mb-8">
            <p>응, 나도 처음이야.</p>
          </div>
          <img
            className="m-auto" 
            src={require('../assets/images/mudo_chic.png')}
            alt="Mudo Chic"
          />
        </div>
        <LocationSection />
        <StartTimeSection />
        <SleepEatSection />
        <ProgramSection />
        <ImageSection />

        <div className="pb-32 text-2xl text-center font-custom">
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
