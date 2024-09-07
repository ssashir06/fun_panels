import React from 'react';
import { Helmet } from 'react-helmet';

import UserNamePrompt from '~/components/UserNamePrompt';

const UserPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>User name</title>
      </Helmet>
      <UserNamePrompt />
    </>
  );
};

export default UserPage;