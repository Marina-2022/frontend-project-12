const prepareHeaders = (headers, { getState }) => {
  const state = getState();
  const { token } = state.auth;
  console.log('token', token);
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  return headers;
};

export default prepareHeaders;
