import {useState} from 'react';
import reCaptchaLogo from '../../assets/images/recaptcha-logo.png';
import checkIcon from '../../assets/icons/circle-check.png';
import {shuffle} from '../../utils/common';

const getImageNumbers = (number: number) => Array(number).fill(0).map((_, i) => i + 1);
const getRandomImageNumbers = (number: number) => shuffle(Array(number).fill(0).map((_, i) => i + 1));

interface Problem {
  keyword: string;
  question: string;
  imageNumbers: number[];
  correctNumber: number;
}

const PROBLEMS: Problem[] = [
  {
    keyword: 'wedding',
    question: '최고의 커플은?',
    imageNumbers: getRandomImageNumbers(9),
    correctNumber: 9,
  }, 
  {
    keyword: 'beauty',
    question: '미녀의 얼굴은?',
    imageNumbers: getImageNumbers(12),
    correctNumber: 4,
  },
  {
    keyword: 'happy',
    question: '세상에서 가장 행복한 남자의 얼굴은?',
    imageNumbers: getImageNumbers(12),
    correctNumber: 3,
  }
];

interface ReCaptchaProps {
  onSubmit?: () => void;
}

function ReCaptcha({onSubmit}: ReCaptchaProps) {
  const [isChecked, setIsChecked] = useState(false);

  const [step, setStep] = useState(0);
  const [questions, setQuestions] = useState(shuffle<Problem>([...PROBLEMS]));
  const [clicked, setClicked] = useState(0);

  const handleChange = (e: any) => {
    setIsChecked(e.target.checked);
  };

  const handleClick = (number: number) => {
    setClicked(prevNumber => prevNumber !== number ? number : 0);
  };

  const handleVerify = (question: Problem) => {
    const isCorrect = clicked === question.correctNumber;

    if (!isCorrect) {
      resetClicked();
      if (step === questions.length - 1) {
        resetQuestions();
      } else {
        nextStep();
      }
    } else {
      onSubmit?.();
    }
  };

  const resetQuestions = () => {
    // TODO: imageNumbers 도 다시 부를 수 있도록!
    setQuestions(shuffle<Problem>([...PROBLEMS]));
  };
  const resetClicked = () => setClicked(0);
  const nextStep = () => setStep(prevStep => prevStep + 1);

  const currentQuestion = questions[step];
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
              <p className="text-white">{questions[step].question}</p>
            </div>
            <div className={`grid grid-cols-3 gap-1 mx-1 mb-1`}>
              {currentQuestion.imageNumbers.map((imageNumber, i) => (
                <div
                  key={`${currentQuestion.keyword}-${imageNumber}`}
                  className={`relative ${imageNumber === clicked ? 'p-2' : ''}`}
                  onClick={() => handleClick(imageNumber)}
                >
                  <img
                    src={require(`../../assets/images/${currentQuestion.keyword}/${imageNumber}.jpg`)}
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
                onClick={() => handleVerify(currentQuestion)}
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
