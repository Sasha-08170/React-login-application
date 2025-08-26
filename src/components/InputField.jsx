import React from "react";
import { Field, ErrorMessage } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

/**
 * Универсальный компонент поля ввода с поддержкой иконок, очистки и показа/скрытия пароля
 * @param {Object} props - Свойства компонента
 * @param {string} props.name - Имя поля для Formik
 * @param {string} props.type - Тип поля (text, email, password)
 * @param {string} props.placeholder - Текст placeholder
 * @param {string} props.ariaLabel - ARIA метка для доступности
 * @param {Object} props.icon - FontAwesome иконка
 * @param {boolean} props.showClear - Показывать кнопку очистки
 * @param {boolean} props.showPasswordToggle - Показывать кнопку показа/скрытия пароля
 * @param {Function} props.onClear - Функция очистки поля
 * @param {string} props.clearAriaLabel - ARIA метка для кнопки очистки
 * @param {string} props.className - CSS класс для wrapper
 * @param {string} props.fieldClassName - CSS класс для input поля
 * @param {string} props.errorClassName - CSS класс для сообщений об ошибках
 * @param {boolean} props.required - Обязательное поле
 * @param {string} props.describedBy - ID элемента для aria-describedby
 */
const InputField = ({
  name,
  type = "text",
  placeholder,
  ariaLabel,
  icon,
  showClear = false,
  showPasswordToggle = false,
  onClear,
  clearAriaLabel,
  className,
  fieldClassName,
  errorClassName,
  required = false,
  describedBy,
  ...rest
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  // Определяем актуальный тип поля с учетом показа пароля
  const actualType = showPasswordToggle && type === "password"
    ? (showPassword ? "text" : "password")
    : type;

  return (
    <>
      <div className={className}>
        {/* Основная иконка поля */}
        {icon && <FontAwesomeIcon icon={icon} aria-hidden="true" />}

        {/* Поле ввода */}
        <Field
          type={actualType}
          name={name}
          placeholder={placeholder}
          className={fieldClassName}
          aria-label={ariaLabel}
          aria-required={required}
          aria-describedby={describedBy}
          {...rest}
        />

        {/* Кнопка очистки поля */}
        {showClear && (
          <button
            type="button"
            className="clearButton"
            onClick={onClear}
            aria-label={clearAriaLabel}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        )}

        {/* Кнопка показа/скрытия пароля */}
        {showPasswordToggle && (
          <button
            type="button"
            className="togglePasswordButton"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </button>
        )}
      </div>

      {/* Сообщение об ошибке */}
      <ErrorMessage
        name={name}
        component={({ children }) => (
          <div className={errorClassName} role="alert" aria-live="polite">
            {children}
          </div>
        )}
      />
    </>
  );
};

export default InputField;