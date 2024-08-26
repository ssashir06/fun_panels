import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

import LeftSideMenu from './components/LeftSideMenu';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage/UserPage';


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

const App: React.FC = () => {
  return (
    <Router>
      <Container>
        <LeftPanel>
          <LeftSideMenu />
        </LeftPanel>
        <RightPanel>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/user" element={<UserPage />} />
          </Routes>
        </RightPanel>
      </Container>
    </Router>
  );
};

export default App;