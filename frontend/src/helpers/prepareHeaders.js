const prepareHeaders = (headers) => {
  const token = localStorage.getItem('token');
  // console.log('Token from localStorage:', token);
  console.log('Token from localStorage:', JSON.stringify(token, null, 2));
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
    // console.log('Headers with token:', headers);
    // console.log('Headers with token:', JSON.stringify(headers, null, 2));
    headers.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
  }
  return headers;
};

export default prepareHeaders;

// (headers) => {
//   headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`);
//   console.log('localStorage', localStorage.getItem('token'));
//   return headers;
