// src/pages/LoginPage.jsx
import React from 'react';
import Seo from '../components/Seo.jsx';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faTimes, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import * as Yup from 'yup';

import styles from '../styles/LoginPage.module.css';

const formInitialValues = {
  username: '',
  password: '',
};

const loginValidationSchema = Yup.object({
  username: Yup.string()
    .min(3, 'Минимум 3 символа')
    .max(20, 'Максимум 20 символов')
    .required('Введите имя пользователя'),
  password: Yup.string()
    .min(8, 'Пароль должен содержать минимум 8 символов')
    .matches(/[a-zA-Z]/, 'Пароль должен содержать буквы')
    .matches(/[0-9]/, 'Пароль должен содержать цифры')
    .required('Введите пароль'),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleSubmit = async (values, { setSubmitting, setFieldError, setStatus }) => {
    setStatus(null);
    setFieldError('general', '');

    if (values.username === 'admin' && values.password === 'admin12345') {
      setStatus({ type: 'success', message: 'Вход выполнен успешно!' });
      localStorage.setItem('isAuthenticated', 'true');
      setTimeout(() => {
        navigate('/home');
      }, 1000);
    } else {
      setFieldError('general', 'Неверное имя пользователя или пароль');
    }
    setSubmitting(false);
  };

  return (
    <>
      <Seo
        title="React-login-application"
        description="Веб-приложение для аутентификации на React с продвинутой архитектурой"
        keywords="вход, логин, авторизация, аккаунт, личный кабинет, сайт"
        canonical="#"
        image="#"
        type="website"
        siteName="siteName"
      />

      <main className={styles.container}>
        <section className={styles.loginBox}>
          <header className={styles.loginHeader}>
            <h1 className={styles.logo}>Вход в аккаунт</h1>
          </header>
          <Formik
            initialValues={formInitialValues}
            validationSchema={loginValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, touched, status, setFieldValue }) => (
              <Form className={styles.loginForm} role="form" aria-label="Форма входа">
                {errors.general && (
                  <div className={styles.errorText} role="alert" aria-live="polite">
                    {errors.general}
                  </div>
                )}
                {status && (
                  <div
                    className={status.type === 'success' ? styles.successText : styles.errorText}
                    role="alert"
                    aria-live="polite"
                  >
                    {status.message}
                  </div>
                )}

                <fieldset className={styles.inputGroup}>
                  <legend className={styles.srOnly}>Данные для входа</legend>

                  {/* Username */}
                  <div className={styles.inputWrapper}>
                    <FontAwesomeIcon icon={faUser} aria-hidden="true" />
                    <Field
                      type="text"
                      name="username"
                      placeholder="Имя пользователя"
                      className={`${styles.styledField} ${
                        errors.username && touched.username ? styles.inputError : ''
                      }`}
                      aria-label="Имя пользователя"
                      aria-required="true"
                    />
                    <button
                      type="button"
                      className={styles.clearButton}
                      onClick={() => setFieldValue('username', '')}
                      aria-label="Очистить поле имени пользователя"
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </div>
                  <ErrorMessage
                    name="username"
                    component={({ children }) => (
                      <div className={styles.errorText} role="alert" aria-live="polite">
                        {children}
                      </div>
                    )}
                  />

                  {/* Password */}
                  <div className={styles.inputWrapper}>
                    <FontAwesomeIcon icon={faLock} aria-hidden="true" />
                    <Field
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="Пароль"
                      className={`${styles.styledField} ${
                        errors.password && touched.password ? styles.inputError : ''
                      }`}
                      aria-label="Пароль"
                      aria-required="true"
                    />
                    <button
                      type="button"
                      className={styles.togglePasswordButton}
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                    >
                      <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </button>
                  </div>
                  <ErrorMessage
                    name="password"
                    component={({ children }) => (
                      <div className={styles.errorText} role="alert" aria-live="polite">
                        {children}
                      </div>
                    )}
                  />
                </fieldset>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={styles.button}
                  aria-describedby="submit-help"
                >
                  {isSubmitting ? 'Вход...' : 'Войти'}
                </button>
                <small id="submit-help" className={styles.srOnly}>
                  Нажмите для входа в ваш аккаунт
                </small>

                <footer className={styles.loginFooter}>
                  <p className={styles.forgotPassword}>
                    <Link to="/register" aria-label="Перейти на страницу регистрации">
                      Создать аккаунт
                    </Link>
                  </p>
                </footer>
              </Form>
            )}
          </Formik>
        </section>
      </main>
    </>
  );
};

export default LoginPage;
