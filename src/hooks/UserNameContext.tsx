import React, { createContext, ReactNode, useState } from 'react';

interface UserNameContextProps {
  userName: string;
  setUserName: (name: string) => void;
}

const UserNameContext = createContext<UserNameContextProps | undefined>(undefined);

const UserNameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userName, setUserName] = useState<string>(() => sessionStorage.getItem('userName') || '');

  const updateUserName = (name: string) => {
    setUserName(name);
    sessionStorage.setItem('userName', name);
  };

  return (
    <UserNameContext.Provider value={{ userName, setUserName: updateUserName }}>
      {children}
    </UserNameContext.Provider>
  );
};

export { UserNameProvider, UserNameContext, UserNameContextProps };