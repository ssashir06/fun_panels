import '@testing-library/jest-dom';

jest.mock('~/config/viteConfigs', () => ({
  viteEnv: {
    BASE_URL: '/',
  },
}));