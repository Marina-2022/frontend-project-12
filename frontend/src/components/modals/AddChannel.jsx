import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { useRollbar } from '@rollbar/react';
import filter from 'leo-profanity';
import { useAddChannelMutation } from '../../api/channelsApi';
import { setCurrentChannel } from '../../slices/currentChannelSlice';

const AddChannel = (props) => {
  const { showModal, handleClose, getValidatedChannelName } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const rollbar = useRollbar();
  const [addChannel] = useAddChannelMutation();

  const refInput = useRef(null);
  useEffect(() => {
    if (refInput.current) {
      refInput.current.focus();
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: getValidatedChannelName,
    onSubmit: async (values) => {
      try {
        const cleanName = filter.clean(values.name);
        const data = {
          name: cleanName,
          removable: true,
        };

        const response = await addChannel(data).unwrap();

        dispatch(setCurrentChannel(response));
        toast.success(t('toasts.channelCreated'));
        handleClose();
      } catch (error) {
        console.error(error);
        toast.error(t('toasts.errorNetwork'));
        if (error.response.status > 399 && error.response.status < 500) {
          rollbar.error('AddChannel error', error);
        }
      }
    },
  });

  return (
    <Modal
      show={showModal === 'adding'}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('chat.addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="name">
            <Form.Control
              onChange={formik.handleChange}
              value={formik.values.name}
              isInvalid={formik.touched.name && formik.errors.name}
              name="name"
              className="mb-2"
              ref={refInput}
              disabled={formik.isSubmitting}
            />
            <Form.Label visuallyHidden>{t('chat.nameChannel')}</Form.Label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end mt-2">
              <Button
                type="button"
                variant="secondary"
                onClick={handleClose}
                className="me-2"
              >
                {t('chat.cancel')}
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={formik.isSubmitting}
              >
                {t('chat.send')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>

  );
};

export default AddChannel;
