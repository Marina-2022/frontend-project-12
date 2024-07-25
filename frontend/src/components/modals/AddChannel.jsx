import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import channelsApi, { useAddChannelMutation } from '../../api/channelsApi';
import { setCurrentChannel } from '../../slices/currentChannelSlice';
import { setModalChannel } from '../../slices/modalSlice';

const AddChannel = (props) => {
  const { showModal } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [addChannel] = useAddChannelMutation();

  //   const currentChannelId = useSelector((state) => state.currentChannel.id);
  //   const modalChannelId = useSelector((state) => state.modalChannel.id);
  const channels = useSelector((state) => channelsApi.endpoints.getChannels.select()(state)?.data);
  // const showModal = useSelector((state) => state.modalChannel.modal === 'adding');

  const handleClose = () => {
    dispatch(setModalChannel({ id: '', name: '', modal: '' }));
  };

  const refInput = useRef(null);
  useEffect(() => {
    if (refInput.current) {
      refInput.current.focus();
    }
  }, []);

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

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: getValidatedChannelName,
    onSubmit: async (values) => {
      try {
        const data = {
          name: values.name,
          removable: true,
        };
        const response = await addChannel(data).unwrap();
        const { id, name } = response;
        dispatch(setCurrentChannel({ id, name }));
        toast.success(t('channelCreated'));
        handleClose();
      } catch (error) {
        console.error(error);
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
            <Form.Label visuallyHidden>{t('channelName')}</Form.Label>
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
