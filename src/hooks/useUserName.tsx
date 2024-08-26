import { useContext } from 'react';

import { UserNameContext, UserNameContextProps } from './UserNameContext';

const useUserName = (): UserNameContextProps => {
    const context = useContext(UserNameContext);
    if (!context) {
        throw new Error('useUserName must be used within a UserNameProvider');
    }
    return context;
};

export default useUserName;