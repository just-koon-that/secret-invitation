
export function shuffle<T = any>(array: T[]) {
  const shuffledArray = [...array];
  for (let index = shuffledArray.length - 1; index > 0; index--) {
    const randomPosition = Math.floor(Math.random() * (index + 1));

    const temporary = shuffledArray[index];
    shuffledArray[index] = shuffledArray[randomPosition];
    shuffledArray[randomPosition] = temporary;
  }

  return shuffledArray;
}
