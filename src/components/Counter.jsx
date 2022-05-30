import React from 'react';

import { useSharedState } from '../utils/store';

const Counter = () => {
  const [state, setState] = useSharedState();
  const increment = () => {
    setState((prev) => ({ ...prev, count: prev.count + 1 }));
  };
  return (
    <div>
      {state.count}
      <button onClick={increment}>+1</button>
      {Math.random()}
    </div>
  );
};

export default Counter;