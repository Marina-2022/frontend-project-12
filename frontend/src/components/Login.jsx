import React, { useEffect, useRef, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { setToken, setUserName } from '../slices/authSlice';
import useAuth from '../hooks/useAuth';
import login from '../assets/images/login.jpeg';
import { pagePaths, apiPaths } from '../routes.js';

const Login = () => {
  const { logIn } = useAuth();
  const [err, setError] = useState(null);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginRef = useRef(null);

  useEffect(() => {
    if (err) {
      loginRef.current.focus();
      loginRef.current.select();
    }
  }, [err]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { data } = await axios.post(apiPaths.loginPath(), values);
      if (data.token) {
        setToken(data.token);
        setUserName(data.username);
        logIn(data.token, data.username);

        dispatch(setToken(data.token));
        dispatch(setUserName(data.username));
        navigate(pagePaths.home);
      } else {
        setError(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError(true);
      } else {
        console.error(error);
        toast.error(t('errors.networkError'));
      }
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: handleSubmit,
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6 ">
          <div className="card shadow-sm ">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img
                  src={login}
                  className="rounded-circle"
                  alt="Войти"
                />
              </div>
              <Form
                className="col-12 col-md-6 mt-3 mt-mb-0"
                onSubmit={formik.handleSubmit}
              >
                <h1 className="text-center mb-4">
                  {t('login.login')}
                </h1>
                <Form.Group className="form-group form-floating mb-3">
                  <Form.Control
                    type="username"
                    name="username"
                    className={`form-control ${err ? 'is-invalid' : ''}`}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    autoComplete="username"
                    required
                    placeholder={t('login.username')}
                    id="username"
                    ref={loginRef}
                    autoFocus
                  />
                  <Form.Label htmlFor="username">
                    {t('login.username')}
                  </Form.Label>
                </Form.Group>
                <Form.Group className="form-group form-floating mb-4">
                  <Form.Control
                    type="password"
                    name="password"
                    className={`form-control ${err ? 'is-invalid' : ''}`}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    autoComplete="current-password"
                    required=""
                    placeholder={t('login.password')}
                    id="password"
                  />
                  <Form.Label
                    htmlFor="password"
                  >
                    {t('login.password')}
                  </Form.Label>
                  {err && (
                  <Form.Control.Feedback
                    className="invalid-tooltip"
                  >
                    {t('errors.wrongLogin')}
                  </Form.Control.Feedback>
                  )}
                </Form.Group>
                <button
                  type="submit"
                  className="w-100 mb-3 btn btn-outline-primary"
                >
                  {t('login.login')}
                </button>
              </Form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>
                  {t('login.notHaveAccount')}
                  {' '}
                </span>
                <a href={pagePaths.signup}>{t('login.registration')}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
