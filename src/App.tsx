import {useState} from 'react';
import MainPage from './pages/main';
import IntroPage from './pages/intro';

function App() {
  const [isAuth, setIsAuth] = useState(true);
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
