import { useSelector } from 'react-redux';
import AddChannel from './AddChannel.jsx';

const modals = {
  adding: AddChannel,
//   removing: RemoveChannel,
//   renaming: RenameChannel,
};

const ModalContainer = () => {
  const showModal = useSelector((state) => state.modalChannel.showModal);

  const ModalComponent = modals[showModal];
  if (!ModalComponent) {
    return null;
  }

  return (
    <ModalComponent
      showModal={showModal}
    />
  );
};

export default ModalContainer;
