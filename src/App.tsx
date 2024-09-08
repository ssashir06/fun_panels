import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

import LeftSideMenu from '~/components/LeftSideMenu';
import UserNamePrompt from '~/components/UserNamePrompt';
import { viteEnv } from '~/config/viteConfigs';
import { UserNameProvider } from '~/hooks/UserNameContext';
import useUserName from '~/hooks/useUserName';
import ClockPage from '~/pages/ClockPage';
import ColorShapesPage from '~/pages/ColorShapesPage';
import HomePage from '~/pages/HomePage';
import KanaPage from '~/pages/KanaPage';
import UserPage from '~/pages/UserPage';

const baseUrl = viteEnv.BASE_URL;

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const LeftPanel = styled.div`
  width: 200px;
`;

const RightPanel = styled.main`
  flex-grow: 1;
  padding: 1em;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2em;
  border-radius: 8px;
`;

const App: React.FC = () => {
  const { userName } = useUserName();

  return (
    <Router basename={baseUrl}>
      <Container>
        <LeftPanel>
          <LeftSideMenu />
        </LeftPanel>
        <RightPanel>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/clock" element={<ClockPage />} />
            <Route path="/kana" element={<KanaPage />} />
            <Route path="/colorShapes" element={<ColorShapesPage />} />
            <Route path="*" element={<div>Not Found</div>} />
          </Routes>
        </RightPanel>
      </Container>
      {userName === '' && (
        <Modal>
          <ModalContent>
            <UserNamePrompt />
          </ModalContent>
        </Modal>
      )}
    </Router>
  );
};

const AppWrapper: React.FC = () => (
  <UserNameProvider>
    <App />
  </UserNameProvider>
);

export default AppWrapper;