// src/pages/RegisterPage.jsx
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faLock,
  faEnvelope,
  faTimes,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';

import styles from '../styles/RegisterPage.module.css';

const USERS_KEY = 'registeredUsers';

// Простая валидация через Formik (без Yup)
const validate = (values) => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = 'Введите имя';
  } else if (!/^[A-Za-zА-Яа-яЁё\s'-]+$/.test(values.firstName)) {
    errors.firstName = 'Имя может содержать только буквы, пробелы, апострофы и дефисы';
  } else if (values.firstName.length < 2) {
    errors.firstName = 'Имя должно содержать минимум 2 символа';
  } else if (values.firstName.length > 30) {
    errors.firstName = 'Имя должно содержать максимум 30 символов';
  }

  if (!values.lastName) {
    errors.lastName = 'Введите фамилию';
  } else if (!/^[A-Za-zА-Яа-яЁё\s'-]+$/.test(values.lastName)) {
    errors.lastName = 'Фамилия может содержать только буквы, пробелы, апострофы и дефисы';
  } else if (values.lastName.length < 2) {
    errors.lastName = 'Фамилия должна содержать минимум 2 символа';
  } else if (values.lastName.length > 30) {
    errors.lastName = 'Фамилия должна содержать максимум 30 символов';
  }

  if (!values.email) {
    errors.email = 'Введите email';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Неверный формат email';
  }

  if (!values.password) {
    errors.password = 'Введите пароль';
  } else if (values.password.length < 6) {
    errors.password = 'Пароль должен содержать минимум 6 символов';
  } else if (!/[A-Za-z]/.test(values.password)) {
    errors.password = 'Пароль должен содержать хотя бы одну букву';
  } else if (!/[0-9]/.test(values.password)) {
    errors.password = 'Пароль должен содержать хотя бы одну цифру';
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Подтвердите пароль';
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Пароли должны совпадать';
  }

  if (!values.agreeToTerms) {
    errors.agreeToTerms = 'Вы должны согласиться с условиями использования';
  }

  return errors;
};

function saveUser(user) {
  const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function userExists(email) {
  const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  return users.some((u) => u.email === email);
}

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreeToTerms: false,
};

const RegisterPage = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleSubmit = async (values, { setSubmitting, setFieldError, setStatus }) => {
    setStatus(null);
    setFieldError('general', '');

    if (userExists(values.email)) {
      setFieldError('general', 'Пользователь с таким email уже зарегистрирован');
      setSubmitting(false);
      return;
    }

    saveUser({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
    });

    setStatus({
      type: 'success',
      message: 'Регистрация успешна! Сейчас вы будете перенаправлены...',
    });

    setTimeout(() => {
      navigate('/home');
    }, 1200);

    setSubmitting(false);
  };

  return (
    <main className={styles.container}>
      <section className={styles.registerBox}>
        <header className={styles.registerHeader}>
          <h1 className={styles.logo}>Регистрация</h1>
        </header>
        <Formik initialValues={initialValues} validate={validate} onSubmit={handleSubmit}>
          {({ isSubmitting, errors, status, setFieldValue }) => (
            <Form className={styles.registerForm} role="form" aria-label="Форма регистрации">
              {/* Общие ошибки и статус */}
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
                <legend className={styles.srOnly}>Личная информация</legend>

                {/* First Name */}
                <div className={styles.inputWrapper}>
                  <FontAwesomeIcon icon={faUser} aria-hidden="true" />
                  <Field
                    type="text"
                    name="firstName"
                    placeholder="Имя"
                    className={styles.styledField}
                    aria-label="Имя"
                    aria-required="true"
                  />
                  <button
                    type="button"
                    className={styles.clearButton}
                    onClick={() => setFieldValue('firstName', '')}
                    aria-label="Очистить поле имени"
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
                <ErrorMessage
                  name="firstName"
                  component={({ children }) => (
                    <div className={styles.errorText} role="alert" aria-live="polite">
                      {children}
                    </div>
                  )}
                />

                {/* Last Name */}
                <div className={styles.inputWrapper}>
                  <FontAwesomeIcon icon={faUser} aria-hidden="true" />
                  <Field
                    type="text"
                    name="lastName"
                    placeholder="Фамилия"
                    className={styles.styledField}
                    aria-label="Фамилия"
                    aria-required="true"
                  />
                  <button
                    type="button"
                    className={styles.clearButton}
                    onClick={() => setFieldValue('lastName', '')}
                    aria-label="Очистить поле фамилии"
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
                <ErrorMessage
                  name="lastName"
                  component={({ children }) => (
                    <div className={styles.errorText} role="alert" aria-live="polite">
                      {children}
                    </div>
                  )}
                />

                {/* Email */}
                <div className={styles.inputWrapper}>
                  <FontAwesomeIcon icon={faEnvelope} aria-hidden="true" />
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                    className={styles.styledField}
                    aria-label="Адрес электронной почты"
                    aria-required="true"
                  />
                  <button
                    type="button"
                    className={styles.clearButton}
                    onClick={() => setFieldValue('email', '')}
                    aria-label="Очистить поле email"
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
                <ErrorMessage
                  name="email"
                  component={({ children }) => (
                    <div className={styles.errorText} role="alert" aria-live="polite">
                      {children}
                    </div>
                  )}
                />
              </fieldset>

              <fieldset className={styles.inputGroup}>
                <legend className={styles.srOnly}>Информация безопасности</legend>

                {/* Password */}
                <div className={styles.inputWrapper}>
                  <FontAwesomeIcon icon={faLock} aria-hidden="true" />
                  <Field
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Пароль"
                    className={styles.styledField}
                    aria-label="Пароль"
                    aria-required="true"
                    aria-describedby="password-help"
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
                <small id="password-help" className={styles.passwordHelp}>
                  Шесть символов с буквами и цифрами
                </small>
                <ErrorMessage
                  name="password"
                  component={({ children }) => (
                    <div className={styles.errorText} role="alert" aria-live="polite">
                      {children}
                    </div>
                  )}
                />

                {/* Confirm Password */}
                <div className={styles.inputWrapper}>
                  <FontAwesomeIcon icon={faLock} aria-hidden="true" />
                  <Field
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Подтвердите пароль"
                    className={styles.styledField}
                    aria-label="Подтвердите пароль"
                    aria-required="true"
                  />
                  <button
                    type="button"
                    className={styles.togglePasswordButton}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={
                      showConfirmPassword
                        ? 'Скрыть подтверждение пароля'
                        : 'Показать подтверждение пароля'
                    }
                  >
                    <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                  </button>
                </div>
                <ErrorMessage
                  name="confirmPassword"
                  component={({ children }) => (
                    <div className={styles.errorText} role="alert" aria-live="polite">
                      {children}
                    </div>
                  )}
                />
              </fieldset>

              {/* Terms Agreement */}
              <div className={styles.checkboxGroup}>
                <label className={styles.checkboxWrapper}>
                  <Field type="checkbox" name="agreeToTerms" aria-describedby="terms-help" />
                  <span>Я согласен с условиями использования</span>
                </label>
                <small id="terms-help" className={styles.srOnly}>
                  Вы должны согласиться с условиями для создания аккаунта
                </small>
                <ErrorMessage
                  name="agreeToTerms"
                  component={({ children }) => (
                    <div className={styles.errorText} role="alert" aria-live="polite">
                      {children}
                    </div>
                  )}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.button}
                aria-describedby="submit-help"
              >
                {isSubmitting ? 'Создание аккаунта...' : 'Создать аккаунт'}
              </button>
              <small id="submit-help" className={styles.srOnly}>
                Нажмите для создания нового аккаунта
              </small>

              <footer className={styles.registerFooter}>
                <nav className={styles.loginLink}>
                  <Link to="/" aria-label="Вернуться на страницу входа">
                    Войти
                  </Link>
                </nav>
              </footer>
            </Form>
          )}
        </Formik>
      </section>
    </main>
  );
};

export default RegisterPage;
