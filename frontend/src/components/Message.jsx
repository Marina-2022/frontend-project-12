import React, { useEffect, useRef } from 'react';
// import React from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useAddMessageMutation } from '../api/messagesApi';

const Message = () => {
  const { t } = useTranslation();

  const username = useSelector((state) => state.auth.userName);
  const [addMessage] = useAddMessageMutation();
  const { currentChannel } = useSelector((state) => state.currentChannel);

  const refInput = useRef(null);

  const handleSubmitMessage = async (values, { setSubmitting, resetForm }) => {
    try {
      const { message } = values;
      const data = {
        message,
        channelId: currentChannel.id,
        username,
      };
      await addMessage(data);
      resetForm();
    } catch (error) {
      // console.log('Error sending message:', error.response.status);
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: handleSubmitMessage,
  });

  useEffect(() => {
    if (refInput.current) {
      refInput.current.focus();
    }
  }, [formik.isSubmitting, currentChannel]);

  return (
    <div className="mt-auto px-5 py-3">
      <form
        noValidate=""
        className="py-1 border rounded-2"
        onSubmit={formik.handleSubmit}
      >
        <div className="input-group has-validation">
          <input
            name="message"
            aria-label={t('chat.newMessage')}
            placeholder={t('chat.placeholder')}
            className="border-0 p-0 ps-2 form-control"
            value={formik.values.message}
            onChange={formik.handleChange}
            disabled={formik.isSubmitting}
            ref={refInput}
          />
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="btn btn-group-vertical"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor" className="bi bi-send">
              <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
            </svg>
            <span className="visually-hidden">{t('chat.send')}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Message;
