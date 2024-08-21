const apiPath = 'api/v1';

const apiPaths = {
  base: apiPath,
  loginPath: () => [apiPath, 'login'].join('/'),
  channelPath: () => [apiPath, 'channels'].join('/'),
  messagePath: () => [apiPath, 'messages'].join('/'),
  signupPath: () => [apiPath, 'signup'].join('/'),
};

const pagePaths = {
  login: '/login',
  signup: '/signup',
  home: '/',
  notFound: '*',
};

export { pagePaths, apiPaths };
