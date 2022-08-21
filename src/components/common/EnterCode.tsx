import {useEffect, useRef, useState} from 'react';

interface EnterCodeProps {
  length: number;
  onSubmit?: (value: string) => void;
  borderColor?: string;
  disabled?: boolean;
}

function EnterCode({length, onSubmit, borderColor = '', disabled}: EnterCodeProps) {
  const textInputs = useRef<HTMLInputElement[]>([]);
  const [inputs, setInputs] = useState<string[]>([]);

  useEffect(() => {
    setInputs(new Array(length).fill(''));
  }, [length]);

  const handleChange = (e: any) => {
    const currentIndex = Number(e.target.dataset.id);
    const nextIndex = currentIndex + 1;
    const value = e.target.value;

    if (isNaN(+value)) {
      return;
    }

    if (inputs[currentIndex] && value.length === 2) {
      const nextInputs = inputs.map((input, index) => (
        index === currentIndex 
          ? value[1]
          : index === currentIndex + 1 ? '' : input
      ));
      setInputs(nextInputs);
      if (nextIndex === length) {
        textInputs.current[currentIndex].blur();
        return;
      }
      textInputs.current[nextIndex].focus();
      return;
    }

    if (value.length > 1) {
      setInputs(prevInputs => (
        prevInputs.map((input, index) => (
          currentIndex <= index ? value[index - currentIndex] : input
        ))
      ));

      const nextIndex = currentIndex + value.length;
      if (nextIndex >= length) {
        textInputs.current[currentIndex].blur();
        return;
      }
      textInputs.current[nextIndex].focus();
      return;
    }

    const nextInputs = inputs.map((input, index) =>  (
      index === currentIndex 
        ? value 
        : index === currentIndex + 1 ? '' : input
    ))
    setInputs(nextInputs);

    if (nextIndex === length) {
      textInputs.current[currentIndex].blur();
      onSubmit?.(nextInputs.join(''));
      return;
    }
    textInputs.current[nextIndex].focus();
  };

  const handleKeyDown = (e: any) => {
    const currentIndex = Number(e.target.dataset.id);
    switch (e.keyCode) {
      case 8: {
        e.preventDefault();
        if (inputs[currentIndex]) {
          setInputs(prevInputs => prevInputs.map((input, i) => i === currentIndex ? '' : input));
        } else if (currentIndex !== 0) {
          textInputs.current[currentIndex - 1].focus();
        }
        break;
      }
    }
  };

  return (
    <div>
      {inputs.map((input, index) => {
        const color = borderColor 
          ? borderColor
          : !!input ? 'border-blue-600' : ''
        return ( 
          <input
            ref={(ref) => {
              if (ref) {
                textInputs.current[index] = ref;
              }
            }}
            data-id={index}
            key={index}
            type="text"
            pattern="[0-9]*"
            inputMode="numeric"
            className={`h-14 w-12 m-4 text-center text-3xl rounded-md drop-shadow border-2 ${color}`}
            min={0}
            max={9}
            autoFocus={index === 0}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            value={input}
            disabled={disabled}
          />
        )
      })}
    </div>
  );
}

export default EnterCode;
