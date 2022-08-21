import {useState} from 'react';
import reCaptchaLogo from '../../assets/images/recaptcha-logo.png';
import checkIcon from '../../assets/icons/circle-check.png';
import {shuffle} from '../../utils/common';

const CORRECT_NUMBER = 9;
const getRandomImageNumbers = () => shuffle(Array(9).fill(0).map((_, i) => i + 1));

interface ReCaptchaProps {
  onSubmit?: () => void;
}

function ReCaptcha({onSubmit}: ReCaptchaProps) {
  const [imageNumbers, setImageNumbers] = useState(getRandomImageNumbers());
  const [isChecked, setIsChecked] = useState(false);
  const [clicked, setClicked] = useState(0);

  const handleChange = (e: any) => {
    setIsChecked(e.target.checked);
  };

  const handleClick = (number: number) => {
    setClicked(prevNumber => prevNumber !== number ? number : 0);
  };

  const handleVerify = () => {
    const isCorrect = clicked === CORRECT_NUMBER;

    if (!isCorrect) {
      resetImages();
    } else {
      onSubmit?.();
    }
  };

  const resetImages = () => {
    setClicked(0);
    setImageNumbers(getRandomImageNumbers());
  };

  return (
    <div className="relative z-10">
      <div className="border-2 rounded bg-white p-4 flex flex-row align-center w-80">
        <input
          type="checkbox"
          className="w-8 h-8 m-4"
          onChange={handleChange}
          checked={isChecked}
        />
        <div className="flex flex-1 align-center">
          <p className="flex-1 my-auto">I'm not a stranger</p>
          <div>
            <img
              className="w-16 h-16"
              src={reCaptchaLogo}
              alt="ReCaptcha Logo"
            />
          </div>
        </div>
      </div>
      {isChecked && (
        <div className="absolute top-0">
          <div className="border-2 rounded bg-white flex flex-col align-center w-80 mb-8">
            <div className="m-1 p-4 bg-blue-400 flex-1">
              <p className="text-white">최고의 커플은?</p>
            </div>
            <div className="grid grid-cols-3 gap-1 mx-1 mb-1">
              {imageNumbers.map((imageNumber, i) => (
                <div
                  key={i}
                  className={`relative ${imageNumber === clicked ? 'p-2' : ''}`}
                  onClick={() => handleClick(imageNumber)}
                >
                  <img
                    src={require(`../../assets/images/wedding/00${imageNumber}.jpg`)}
                    alt={`Sample ${imageNumber}`}
                  />
                  {imageNumber === clicked && (
                    <img className="absolute top-0 left-0" src={checkIcon} alt="Check Icon" />
                  )}
                </div>
              ))}
            </div>
            <div className="border-t-2 p-2 flex justify-end">
              <button
                className={`px-6 py-2 ${!clicked ? 'bg-gray-400' : 'bg-blue-400'} text-white`}
                disabled={!clicked}
                onClick={handleVerify}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReCaptcha;
