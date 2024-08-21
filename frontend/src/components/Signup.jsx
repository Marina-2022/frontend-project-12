import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import * as yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { setToken, setUserName } from '../slices/authSlice';
import imageSingup from '../assets/images/signup.jpg';
import { pagePaths, apiPaths } from '../routes.js';

const Signup = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { logIn } = useAuth();

  const [err, setError] = useState(false);

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
        const data = {
          username: values.username,
          password: values.password,
        };
        const response = await axios.post(apiPaths.signupPath(), data);

        if (response.data.token) {
          setToken(response.data.token);
          setUserName(response.data.username);
          logIn(response.data.token, response.data.username);

          dispatch(setToken(response.data.token));
          dispatch(setUserName(response.data.username));

          navigate(pagePaths.home);
        }
      } catch (error) {
        console.error(t('errors.networkError'));
        setError(true);
        if (error.response) {
          if (error.response.status === 409) {
            setError('userExists');
          } else {
            setError(true);
          }
        } else {
          setError(true);
        }
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
