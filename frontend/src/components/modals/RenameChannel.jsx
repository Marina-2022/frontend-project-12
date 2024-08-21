import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import filter from 'leo-profanity';
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

  const [renameChannel] = useRenameChannelMutation();

  const refInput = useRef(null);
  useEffect(() => {
    if (refInput.current) {
      refInput.current.focus();
    }
  }, []);

  const handleRenameChannel = async (values) => {
    try {
      const { name, channelId } = values;

      const cleanName = filter.clean(name);

      const data = {
        id: channelId,
        name: cleanName,
        removable: true,
      };

      const response = await renameChannel(data).unwrap();
      handleClose();
      dispatch(setCurrentChannel(response));
      toast.success(t('toasts.channelRenamed'));
    } catch (error) {
      console.error(error);
      toast.error(t('toasts.errorNetwork'));
    }
  };

  const formik = useFormik({
    initialValues: {
      name: modalChannelName,
      channelId: modalChannelId,
    },
    validationSchema: getValidatedChannelName,
    onSubmit: handleRenameChannel,
    enableReinitialize: true,
  });

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
