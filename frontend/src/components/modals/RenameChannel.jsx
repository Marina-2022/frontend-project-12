import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { useRenameChannelMutation } from '../../api/channelsApi';
import { setCurrentChannel } from '../../slices/currentChannelSlice';

const RenameChannel = (props) => {
  const { t } = useTranslation();
  const {
    showModal,
    handleClose,
    getValidatedChannelName,
    modalChannelId,
    modalChannelName,
  } = props;

  const dispatch = useDispatch();

  // const currentChannelId = useSelector((state) => state.currentChannel.currentChannel.id);
  // console.log('currentChannelId', currentChannelId);
  // const currentChannelName = useSelector((state) => state.currentChannel.currentChannel.name);
  // console.log('currentChannelName', currentChannelName);

  const [renameChannel] = useRenameChannelMutation();
  // console.log('modalChannelName', modalChannelName);

  const refInput = useRef(null);
  useEffect(() => {
    if (refInput.current) {
      refInput.current.focus();
    }
  }, []);

  const handleRenameChannel = async (values) => {
    try {
      // console.log('values', values);
      const { name, channelId } = values;
      // console.log('name', name);
      // console.log('id', channelId);

      const data = {
        id: channelId,
        name,
        removable: true,
      };
      // console.log('data', data);
      const response = await renameChannel(data).unwrap();
      // console.log('response', response);
      handleClose();
      dispatch(setCurrentChannel(response));
      toast.success(t('toasts.channelRenamed'));
    } catch (error) {
      console.error(error);
      toast.error(t('toasts.errorNetwork'));
    }
  };
  // useEffect(() => {
  //   console.log('Modal Channel Name:', modalChannelName);
  //   console.log('Modal Channel ID:', modalChannelId);
  // }, [modalChannelName, modalChannelId]);

  const formik = useFormik({
    initialValues: {
      name: modalChannelName,
      channelId: modalChannelId,
    },
    validationSchema: getValidatedChannelName,
    onSubmit: handleRenameChannel,
    enableReinitialize: true,
  });

  // useEffect(() => {
  //   if (showModal === 'renaming') {
  //     formik.setFieldValue('name', modalChannelName);
  //     formik.setFieldValue('channelId', modalChannelId);
  //     refInput.current.focus();
  //   }
  // }, []);

  return (
    <Modal show={showModal === 'renaming'} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('chat.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="name">
            <Form.Control
              onChange={formik.handleChange}
              ref={refInput}
              value={formik.values.name}
              name="name"
              className="mb-2"
              disabled={formik.isSubmitting}
              isInvalid={formik.touched.name && formik.errors.name}
            />
            <Form.Label visuallyHidden>{t('chat.nameChannel')}</Form.Label>
            <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="me-2 btn btn-secondary"
                onClick={handleClose}
              >
                {t('chat.cancel')}
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={formik.isSubmitting}
              >
                {t('chat.send')}
              </button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannel;
