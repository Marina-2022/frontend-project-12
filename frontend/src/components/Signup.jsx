import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
// import { useRollbar } from '@rollbar/react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { setToken, setUserName } from '../slices/authSlice';
import imageSingup from '../images/signup.jpg';

const Signup = () => {
  const { t } = useTranslation();
  //   const rollbar = useRollbar();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useAuth();
  const [err, setError] = useState(false);

  useEffect(() => {
    console.log('Auth state changed:', auth);
  }, [auth]);

  const refInput = useRef(null);

  useEffect(() => {
    if (err) {
      refInput.current.focus();
      refInput.current.select();
    }
  }, [err]);

  const getValidatedSchema = () => yup.object().shape({
    username: yup
      .string()
      .trim()
      .required(t('errors.required'))
      .min(3, t('errors.minMax'))
      .max(20, t('errors.minMax')),
    password: yup
      .string()
      .required(t('errors.required'))
      .min(6, t('errors.minSymbols')),
    confirmPassword: yup
      .string()
      .required(t('errors.required'))
      .oneOf([yup.ref('password'), null], t('errors.passwordsMatch')),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: getValidatedSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post('/api/v1/signup', {
          username: values.username,
          password: values.password,
        });
        console.log('response', response.data.token);

        if (response.data.token) {
          console.log('Setting token:', response.data.token);

          auth.setToken(response.data.token);
          auth.setUsername(response.data.username);
          auth.logIn();

          console.log('Setting username:', response.data.username);
          dispatch(setToken(response.data.token));
          dispatch(setUserName(response.data.username));

          console.log('Navigating to home page');
          navigate('/');
        }
      } catch (error) {
        console.error(t('errors.networkError'));
        setError(true); // Устанавливаем, что ошибка произошла
        if (error.response) {
          if (error.response.status === 409) {
            setError('userExists'); // Устанавливаем специфичную ошибку, если имя пользователя уже существует
          } else {
            setError(true); // Устанавливаем общее состояние ошибки, если это не 409
          }
        } else {
          // Обработка случая, когда нет свойства response (например, ошибка сети)
          setError(true);
        }
        // if (error.response.status === 409) {
        //   setError('username');
        // }
        // if (error.response.status > 399 && error.response.status < 500) {
        //   rollbar.error('Singup error', error);
        // }
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <img
                  src={imageSingup}
                  alt={t('signup.registration')}
                  className="rounded-circle"
                />
              </div>

              <Form onSubmit={formik.handleSubmit} className="w-50">
                <h1 className="text-center mb-4">
                  {t('signup.registration')}
                </h1>

                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    name="username"
                    ref={refInput}
                    autoComplete="username"
                    id="username"
                    className="form-control"
                    placeholder={t('errors.minMax')}
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    disabled={formik.isSubmitting}
                    autoFocus
                    isInvalid={
                      formik.touched.username && (formik.errors.username || err === 'userExists')
                    }
                  />
                  <Form.Control.Feedback
                    className="invalid-tooltip"
                    style={{ width: 'unset' }}
                  >
                    {err === 'userExists' ? t('errors.userExists') : formik.errors.username}
                  </Form.Control.Feedback>
                  <Form.Label className="form-label" htmlFor="username">
                    {t('signup.username')}
                  </Form.Label>
                </Form.Group>

                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    name="password"
                    autoComplete="new-password"
                    id="password"
                    className="form-control"
                    placeholder={t('errors.minSymbols')}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    disabled={formik.isSubmitting}
                    type="password"
                    isInvalid={
                      formik.touched.password && formik.errors.password
                    }
                  />
                  <Form.Control.Feedback
                    className="invalid-tooltip"
                    style={{ width: 'unset' }}
                  >
                    {formik.errors.password}
                  </Form.Control.Feedback>
                  <Form.Label className="form-label" htmlFor="password">
                    {t('signup.password')}
                  </Form.Label>
                </Form.Group>

                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    name="confirmPassword"
                    autoComplete="new-password"
                    id="confirmPassword"
                    className="form-control"
                    placeholder={t('errors.passwordsMatch')}
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    disabled={formik.isSubmitting}
                    type="password"
                    isInvalid={
                      formik.touched.confirmPassword && formik.errors.confirmPassword
                    }
                  />
                  <Form.Label className="form-label" htmlFor="confirmPassword">
                    {t('signup.confirmPassword')}
                  </Form.Label>
                  <Form.Control.Feedback
                    className="invalid-tooltip"
                    style={{ width: 'unset' }}
                  >
                    {formik.errors.confirmPassword || t('errors.userExists')}
                  </Form.Control.Feedback>
                </Form.Group>
                <button
                  type="submit"
                  className="w-100 btn btn-outline-primary"
                >
                  {t('signup.submit')}
                </button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
