// /* eslint-disable */
import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import filter from 'leo-profanity';
// import useAuth from '../hooks/useAuth';
import messagesApi, { useGetMessagesQuery } from '../api/messagesApi';
import Channels from './Channels';
import Message from './Message';
// import { setCurrentChannel } from '../slices/currentChannelSlice';

const Chat = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const {
    data: messagesData = [],
    // error: messagesError,
    // isLoading: isLoadingMessages,
  } = useGetMessagesQuery();

  const { currentChannel } = useSelector((state) => state.currentChannel);
  const messagesFilter = messagesData.filter((message) => message.channelId === currentChannel.id);
  const messegeRef = useRef();
  // console.log('messagesFilter', messagesFilter);

  useEffect(() => {
    const socket = io();
    const handleMessage = (newMassage) => {
      dispatch(messagesApi.util.updateQueryData('getMessages', undefined, (draft) => {
        draft.push(newMassage);
      }));
    };
    socket.on('newMessage', handleMessage);
    return () => {
      socket.off('newMessage');
    };
  }, [dispatch]);

  // console.log('currentChannel', currentChannel.name);
  // const state = useSelector((state) => state);
  // console.log('Redux State:', state);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels />
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0">
                <b>
                  #
                  {' '}
                  {filter.clean(currentChannel.name)}
                </b>
              </p>
              <span className="text-muted">
                {t('chat.message', { count: messagesFilter.length })}
              </span>
            </div>
            <div id="messages-box" className="chat-messages overflow-auto px-5" ref={messegeRef}>
              {messagesFilter.map((message) => (
                <div className="text-break mb-2" key={message.id}>
                  <b>{message.username}</b>
                  {': '}
                  {filter.clean(message.message)}
                </div>
              ))}
            </div>
            <Message />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
