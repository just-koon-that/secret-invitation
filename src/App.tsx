import {useState} from 'react';
import Modal from 'react-modal';
import MainPage from './pages/main';
import IntroPage from './pages/intro';

Modal.setAppElement('#root');

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const handleNavigateMain = () => {
    setIsAuth(true);
  };
  return (
    <>
      {
        !isAuth
          ? <IntroPage onNext={handleNavigateMain} />
          : <MainPage />
      }
    </>
  );
}

export default App;
