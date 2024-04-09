import { useState, useRef } from 'react';

export const UseRefComponent = () => {
  const [stateCounter, setStateCounter] = useState(0);

  const refCounter = useRef(0);

  const incrementRefCounter = () => {
    refCounter.current = refCounter.current + 1;
    console.log('refCounter= ', refCounter);
  }

  const incrementStateCounter = () => {
    setStateCounter(stateCounter => stateCounter + 1);
    console.log('stateCounter= ', refCounter);
  }

  return (
    <div>
      <p>refCounter: {refCounter.current}</p>
      <button onClick={incrementRefCounter}>Прибавить refCounter</button>
      <p>stateCounter: {stateCounter}</p>
      <button onClick={incrementStateCounter}>Прибавить stateCounter</button>
    </div>
  )
};
