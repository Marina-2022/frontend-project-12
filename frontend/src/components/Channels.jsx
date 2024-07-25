/* eslint-disable max-len */
/* eslint-disable */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { io } from 'socket.io-client';
import channelsApi, { useGetChannelsQuery } from '../api/channelsApi';
import { setCurrentChannel } from '../slices/currentChannelSlice';
import { setModalChannel } from '../slices/modalSlice';
import ModalContainer from './modals/index.js';

const Channels = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { currentChannel } = useSelector((state) => state.currentChannel);
  // console.log('currentChannel', currentChannel);

  const channels = useSelector((state) => channelsApi.endpoints.getChannels.select()(state)?.data);
  console.log('channels', channels);

  const {
    data: channelsData,
    error: channelsError,
    isLoading: isLoadingChannels,
  } = useGetChannelsQuery();

   const handleModalShow = (modal, channel = { id: '', name: '' }) => {
    dispatch(setModalChannel({ id: channel.id, name: channel.name, modal }));
   }

  const handleOnChannelClick = (channelId) => {
    dispatch(setCurrentChannel(channelId));
  };

  useEffect(() => {
    const socket = io();
    const handleNewChannel = (channel) => {
      dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
        draft.push(channel);
      }));
    };
    socket.on('newChannel', handleNewChannel);
    return () => {
      socket.off('newChannel', handleNewChannel);
    }
  }, [dispatch]);

  // console.log('isLoadingChannels', isLoadingChannels);
  // console.log('channelsError', channelsError);
  // console.log('channelsData', channelsData);

  if (isLoadingChannels) {
    return <div>Loading...</div>;
  }

  if (channelsError) {
    return <div>Error loading channels</div>;
  }

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('chat.channels')}</b>
        <button
          type="button"
          className="btn btn-outline-primary btn-sm"
          onClick={() =>handleModalShow('adding')}
        >
          {t('chat.plus')}
        </button>
      </div>
      <ul
        id="channels-box"
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        {channelsData.map((channel) => (
          <li key={channel.id} className="nav-item w-100">
            <div role="group" className="d-flex dropdown btn-group">
              <button
                type="button"
                className={classNames(
                  'w-100 rounded-0 text-start text-truncate btn',
                  { 'btn-secondary': channel.id === currentChannel.id },
                )}
                onClick={() => handleOnChannelClick(channel)}
              >
                <span className="me-1">#</span>
                {channel.name}
              </button>
            </div>
          </li>
        ))}
      </ul>
      <ModalContainer />
    </div>
  );
};

export default Channels;
