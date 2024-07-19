/* eslint-disable */
// import axios from 'axios';
import React from 'react';
// import { useSelector } from 'react-redux';
// import useAuth from '../hooks/useAuth';
import Channels from './Channels';
import { setCurrentChannel } from '../slices/currentChannelSlice';

const Chat = () => {
  // const auth = useAuth();
  // const state = useSelector((state) => state);

  // console.log('Redux State:', state);


  // useEffect(() => {
  //   const getChannels = async () => {
  //     await axios.get('/api/v1/channels', {
  //       headers: {
  //         Authorization: `Bearer ${auth.token}`,
  //       },
  //     }).then((response) => {
  //       console.log(response.data); // =>[{ id: '1', name: 'general', removable: false }, ...]
  //     })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };
  //   getChannels();
  // }, []);

  return (
    <>
      {/* <Header /> */}
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <Channels />
        </div>
      </div>
    </>
  );
};

export default Chat;
