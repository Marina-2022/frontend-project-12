import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import channelsApi from '../../api/channelsApi';
import { setModalChannel } from '../../slices/modalSlice';
import AddChannel from './AddChannel.jsx';
import RemoveChannel from './RemoveChannel.jsx';
import RenameChannel from './RenameChannel.jsx';

const modals = {
  adding: AddChannel,
  removing: RemoveChannel,
  renaming: RenameChannel,
};

const ModalContainer = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const modalChannelId = useSelector((state) => state.modalChannel.id);
  const modalChannelName = useSelector((state) => state.modalChannel.name);

  const handleClose = () => {
    dispatch(setModalChannel({ id: '', name: '', modal: '' }));
  };
  const showModal = useSelector((state) => state.modalChannel.showModal);
  // console.log('showModal', showModal);

  const channels = useSelector((state) => channelsApi.endpoints.getChannels.select()(state)?.data);
  const getValidatedChannelName = Yup.object().shape({
    name: Yup.string()
      .required(t('channelNameIsRequired'))
      .min(3, t('channelNameIsTooShort'))
      .max(20, t('channelNameIsTooLong'))
      .matches(/\S/, t('error.requiredField'))
      .notOneOf(
        channels.map((channel) => channel.name),
        t('error.uniqueName'),
      ),
  });

  const ModalComponent = modals[showModal];
  if (!ModalComponent) {
    return null;
  }

  return (
    <ModalComponent
      showModal={showModal}
      modalChannelId={modalChannelId}
      modalChannelName={modalChannelName}
      handleClose={handleClose}
      getValidatedChannelName={getValidatedChannelName}
    />
  );
};

export default ModalContainer;
