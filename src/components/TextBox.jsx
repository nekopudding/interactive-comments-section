import React from 'react';

import { useSharedState } from 'utils/store';

const TextBox = () => {
  const [state, setState] = useSharedState();
  const setText = (text) => {
    setState((prev) => ({ ...prev, text }));
  };
  return (
    <div>
      {state.text}
      <input value={state.text} onChange={(e) => setText(e.target.value)} />
    </div>
  );
};

export default TextBox;