import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useGetChannelsQuery } from '../api/channelsApi';
import { setCurrentChannel } from '../slices/currentChannelSlice';

const Channels = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { currentChannel } = useSelector((state) => state.currentChannel);
  // console.log('currentChannel', currentChannel);

  const {
    data: channelsData,
    error: channelsError,
    isLoading: isLoadingChannels,
  } = useGetChannelsQuery();

  const handleOnChannelClick = (channelId) => {
    dispatch(setCurrentChannel(channelId));
  };

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
          className="p-0 text-primary btn btn-group-vertical"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="20"
            height="20"
            fill="currentColor"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
          </svg>
          <span className="visually-hidden">
            {t('chat.plus')}
          </span>
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
                  { 'btn-secondary': channel.id === currentChannel },
                )}
                onClick={() => handleOnChannelClick(channel.id)}
              >
                <span className="me-1">#</span>
                {channel.name}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Channels;
