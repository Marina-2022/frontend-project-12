/* eslint-disable max-len */
// /* eslint-disable */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { io } from 'socket.io-client';
import { Dropdown, ButtonGroup } from 'react-bootstrap';
import filter from 'leo-profanity';
import classNames from 'classnames';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import channelsApi, { useGetChannelsQuery } from '../api/channelsApi';
import { setCurrentChannel } from '../slices/currentChannelSlice';
import { setModalChannel } from '../slices/modalSlice';
import ModalContainer from './modals/index.js';
import useAuth from '../hooks/useAuth.js';

const Channels = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { logOut } = useAuth();
  const navigate = useNavigate();

  const { currentChannel } = useSelector((state) => state.currentChannel);
  // console.log('currentChannel channels', currentChannel);

  const {
    data: channelsData,
    error: channelsError,
    isLoading: isLoadingChannels,
  } = useGetChannelsQuery();

  const handleModalShow = (modal, channel = { id: '', name: '' }) => {
    dispatch(setModalChannel({ id: channel.id, name: channel.name, modal }));
    // console.log('id', channel.id);
    // console.log('name', channel.name);
  };

  const handleOnChannelClick = (channelId) => {
    dispatch(setCurrentChannel(channelId));
  };

  useEffect(() => {
    if (channelsError) {
      if (channelsError.status === 401) {
        logOut();
        navigate('/login');
      } else {
        console.error(channelsError);
        toast.error(t('toasts.errorNetwork'));
      }
    }
  }, [channelsError, navigate, logOut, t]);

  useEffect(() => {
    const socket = io();

    const handleNewChannel = (channel) => {
      dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
        draft.push(channel);
      }));
    };

    const handleRemoveChannel = ({ id }) => {
      // console.log('Removing channel with id:', id);
      dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draft) => draft.filter((currentChannels) => currentChannels.id !== id)));
    };

    const handleRenameChannel = ({ id, name }) => {
      dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
        const updatedChannels = draft.map((channel) => (channel.id === id ? { ...channel, name } : channel));
        Object.assign(draft, updatedChannels);
      }));
    };

    socket.on('newChannel', handleNewChannel);
    socket.on('removeChannel', handleRemoveChannel);
    socket.on('renameChannel', handleRenameChannel);
    return () => {
      socket.off('newChannel');
      socket.off('removeChannel');
      socket.off('renameChannel');
    };
  }, [dispatch]);

  if (isLoadingChannels) {
    return <div>{t('chat.loading')}</div>;
  }

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('chat.channels')}</b>
        <button
          type="button"
          className="btn btn-outline-primary btn-sm"
          onClick={() => handleModalShow('adding')}
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
                {filter.clean(channel.name)}
              </button>
              {channel.removable && (
                <Dropdown as={ButtonGroup}>
                  <Dropdown.Toggle
                    split
                    variant={channel.id === currentChannel.id ? 'secondary' : 'light'}
                  >
                    <span className="visually-hidden">{t('chat.channelActions')}</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => handleModalShow('removing', channel)}
                    >
                      {t('chat.remove')}
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => handleModalShow('renaming', channel)}
                    >
                      {t('chat.rename')}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </div>
          </li>
        ))}
      </ul>
      <ModalContainer />
    </div>
  );
};

export default Channels;
