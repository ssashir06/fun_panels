// UserNamePrompt.tsx
import React, { useState } from 'react';

import useUserName from '../hooks/useUserName';

const UserNamePrompt: React.FC = () => {
  const { userName, setUserName } = useUserName();
  const [inputValue, setInputValue] = useState<string>(userName);

  const handleSubmit = () => {
    if (inputValue === '') {
      return;
    }
    setUserName(inputValue);
  };

  return (
    <div>
      <h2>Please enter your name</h2>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default UserNamePrompt;