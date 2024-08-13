const prepareHeaders = (headers) => {
  const token = localStorage.getItem('token');
  console.log('Token from localStorage:', token);
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
    console.log('Headers with token:', headers);
  }
  return headers;
};

export default prepareHeaders;

// (headers) => {
//   headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
//   console.log('localStorage', localStorage.getItem('token'));
//   return headers;
