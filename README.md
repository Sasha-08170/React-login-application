# React Login Application 🔐

**Веб-приложение для аутентификации**

## 🚀 Демонстрация

- **📋 Страница входа**: Форма логина с валидацией и интерактивными элементами
- **📝 Страница регистрации**: Создание нового аккаунта с проверкой данных
- **🏠 Главная страница**: Приветственная страница после успешной авторизации

## ✨ Ключевые особенности

### 🎯 Функциональность
- ✅ **Полная аутентификация**: Вход, регистрация и управление сессиями
- ✅ **Интерактивные формы**: Очистка полей и показ/скрытие паролей
- ✅ **Умная валидация**: Проверка данных в реальном времени
- ✅ **Обработка ошибок**: Комплексная система обработки всех типов ошибок
- ✅ **Запоминание данных**: Сохранение имени пользователя для удобства

### 🎨 Пользовательский интерфейс
- 🎪 **Современный дизайн**: Чистый и интуитивный интерфейс
- 📱 **Адаптивность**: Корректная работа на всех устройствах
- 🌐 **Интернационализация**: Полная локализация на русском языке
- ♿ **Доступность**: Поддержка скринридеров и навигации с клавиатуры
- 🎭 **Анимации**: Плавные переходы и обратная связь

### 🏗️ Техническая архитектура
- 🧩 **Модульность**: CSS Modules для изолированных стилей
- 🔧 **Компонентный подход**: Переиспользуемые React компоненты
- 📦 **Утилиты**: Обработка ошибок и валидации
- 🛡️ **Безопасность**: Защищенное хранение токенов и данных

## 🛠️ Стек технологий

### Frontend
```json
{
    "@fortawesome/fontawesome-svg-core": "^7.0.0",
    "@fortawesome/free-solid-svg-icons": "^7.0.0",
    "@fortawesome/react-fontawesome": "^3.0.0",
    "axios": "^1.11.0",
    "formik": "^2.4.6",
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "react-helmet": "^6.1.0",
    "react-router-dom": "^7.8.1",
    "yup": "^1.7.0"
}
```

### Инструменты разработки
```json
{
  "vite": "7.1.2",
  "@vitejs/plugin-react-swc": "4.0.0",
  "eslint": "9.33.0"
}
```

## 📁 Структура проекта

```
React-login/
├── src/
│   ├── assets/
│   │   └── fonts/              # Локальные шрифты и типографика
│   │       ├── fonts.css       # CSS переменные и @font-face
│   │       └── README.md       # Инструкции по шрифтам
│   ├── components/
│   │   └── InputField.jsx      # Универсальный компонент ввода
│   │   └── Seo.jsx             # Компонент для SEO
│   ├── pages/
│   │   ├── LoginPage.jsx       # Страница входа
│   │   ├── RegisterPage.jsx    # Страница регистрации
│   │   └── HomePage.jsx        # Главная страница
│   ├── styles/
│   │   ├── App.module.css      # Глобальные стили
│   │   ├── LoginPage.module.css
│   │   ├── RegisterPage.module.css
│   │   └── HomePage.module.css
│   ├── App.jsx                 # Главный компонент с роутингом
│   └── main.jsx                # Точка входа приложения
├── public/                     # Статические файлы
├── package.json               # Зависимости и скрипты
└── README.md                  # Документация проекта
```

## 🌐 Архитектура API и сервисов

### Axios интеграция
Приложение использует архитектуру с Axios для всех HTTP запросов:

#### ApiService (базовый HTTP клиент)
- **Автоматическая авторизация**: Добавление Bearer токенов ко всем запросам
- **Интерсепторы запросов**: Логирование и добавление заголовков
- **Интерсепторы ответов**: Обработка ошибок и автоматический logout при 401
- **Безопасное логирование**: Маскировка паролей в консольных сообщениях
- **Timeout**: Настроенный таймаут 10 секунд для всех запросов

#### AuthService (сервис аутентификации)
- **login(credentials)**: Авторизация с сохранением токена
- **register(userData)**: Регистрация нового пользователя
- **logout()**: Выход с очисткой локальных данных
- **Управление токенами**: Автоматическое сохранение и удаление
- **Запоминание логина**: Функция сохранения имени пользователя

### API Endpoints
```
POST /api/auth/login      # Авторизация
POST /api/auth/register   # Регистрация
POST /api/auth/logout     # Выход
```

### Конфигурация запросов
```javascript
// Автоматические заголовки
headers: {
  'Authorization': 'Bearer <token>',
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

// Базовые настройки
baseURL: '/api'
timeout: 10000
```

## 🛡️ Комплексная обработка ошибок

Приложение включает полную систему обработки ошибок с **try-catch** блоками для всех возможных сценариев.

### 🌐 Категории ошибок

#### 1. Сетевые ошибки
```javascript
// Обработка сетевых ошибок
if (error.code === 'ECONNABORTED') {
  // Таймаут запроса
  setFieldError('general', 'Превышено время ожидания ответа сервера');
} else if (error.code === 'ERR_NETWORK') {
  // Ошибка сети
  setFieldError('general', 'Ошибка сети. Проверьте подключение');
} else if (error.code === 'ENOTFOUND') {
  // DNS ошибка
  setFieldError('general', 'Сервер недоступен');
}
```

**Поддерживаемые коды ошибок:**
- `ECONNABORTED` - Таймаут запроса
- `ERR_NETWORK` - Ошибка сети
- `ENOTFOUND` - DNS ошибка
- `ECONNREFUSED` - Отклонение соединения
- `ERR_CANCELED` - Отмена запроса
- `ERR_BAD_REQUEST` - Некорректный запрос

#### 2. HTTP статус коды
```javascript
// Обработка HTTP ошибок
switch (error.response?.status) {
  case 400:
    setFieldError('general', 'Некорректные данные');
    break;
  case 401:
    setFieldError('general', 'Неверный логин или пароль');
    break;
  case 403:
    setFieldError('general', 'Аккаунт заблокирован');
    break;
  case 409:
    setFieldError('email', 'Пользователь уже существует');
    break;
  case 429:
    setFieldError('general', 'Слишком много попыток');
    break;
}
```

**Поддерживаемые HTTP коды:**
- `400` - Некорректные данные
- `401` - Неавторизован
- `403` - Доступ запрещен
- `404` - Не найден
- `409` - Конфликт данных
- `422` - Ошибка валидации
- `429` - Слишком много запросов
- `500` - Внутренняя ошибка сервера
- `502` - Плохой шлюз
- `503` - Сервис недоступен
- `504` - Таймаут шлюза
- `507` - Недостаточно места

#### 3. Ошибки хранилища данных
```javascript
// Безопасная работа с localStorage
try {
  localStorage.setItem('authToken', token);
} catch (error) {
  if (error.name === 'QuotaExceededError') {
    // Превышение квоты
    console.warn('Недостаточно места в localStorage');
    sessionStorage.setItem('authToken', token); // Fallback
  } else if (error.name === 'SecurityError') {
    // Ограничения безопасности
    console.warn('Доступ к localStorage запрещен');
  }
}
```

**Поддерживаемые ошибки хранилища:**
- `QuotaExceededError` - Превышение квоты
- `SecurityError` - Ограничения безопасности
- `SyntaxError` - Ошибка парсинга JSON
- `TypeError` - Недоступность хранилища

### 🛠️ Утилиты обработки ошибок

#### handleApiError()
Основная функция для обработки ошибок API:
```javascript
import { handleApiError } from '../utils/errorHandler.js';

try {
  const response = await authService.login(credentials);
  // Обработка успешного ответа
} catch (error) {
  handleApiError(error, setFieldError);
}
```

#### safeStorageOperation()
Безопасная работа с хранилищем:
```javascript
import { safeStorageOperation } from '../utils/errorHandler.js';

// Сохранение с fallback
const success = safeStorageOperation('setItem', 'authToken', token);

// Получение с fallback
const token = safeStorageOperation('getItem', 'authToken');
```

#### safeJsonParse() / safeJsonStringify()
Безопасная работа с JSON:
```javascript
import { safeJsonParse, safeJsonStringify } from '../utils/errorHandler.js';

// Парсинг с значением по умолчанию
const userData = safeJsonParse(jsonString, {});

// Сериализация с обработкой ошибок
const jsonString = safeJsonStringify(data, '{}');
```

### 🔒 Особенности безопасности

1. **Маскировка паролей** - Все пароли заменяются на `[HIDDEN]` в логах
2. **Автоматический logout** - При 401 ошибке пользователь перенаправляется на страницу входа
3. **Fallback механизмы** - При недоступности localStorage используется sessionStorage
4. **Последовательное логирование** - Детальные логи для отладки

## 🏠 Полная архитектура приложения

### 🎨 Компонентная архитектура

#### Основные компоненты
- **`LoginPage.jsx`** - Страница авторизации с полной валидацией
- **`RegisterPage.jsx`** - Страница регистрации новых пользователей
- **`HomePage.jsx`** - Главная страница после авторизации
- **`InputField.jsx`** - Компонент для полей ввода
- **`Seo.jsx`** - Компонент для SEO

#### Интерактивные элементы
```javascript
// Кнопки очистки полей
<button
  type="button"
  className={styles.clearButton}
  onClick={() => setFieldValue('username', '')}
  aria-label="Очистить поле"
>
  <FontAwesomeIcon icon={faTimes} />
</button>

// Переключатель видимости пароля
<button
  type="button"
  className={styles.togglePasswordButton}
  onClick={() => setShowPassword(!showPassword)}
  aria-label={showPassword ? "Скрыть" : "Показать"}
>
  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
</button>
```

### 📚 Управление состоянием

#### Formik интеграция
```javascript
// Пример использования Formik
<Formik
  initialValues={initialValues.login}
  validationSchema={loginValidationSchema}
  onSubmit={handleSubmit}
>
  {({ isSubmitting, errors, setFieldValue }) => (
    <Form className={styles.loginForm}>
      {/* Поля формы */}
    </Form>
  )}
</Formik>
```

#### Централизованная валидация
```javascript
// src/utils/validation.js
export const loginValidationSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, 'Минимум 4 символа')
    .max(20, 'Максимум 20 символов')
    .required('Введите логин'),
  password: Yup.string()
    .min(6, 'Минимум 6 символов')
    .matches(/[a-zA-Z]/, 'Пароль должен содержать буквы')
    .matches(/[0-9]/, 'Пароль должен содержать цифры')
    .required('Введите пароль')
});
```

## 🛠️ Разработка и отладка

### 🚀 Команды разработки

```bash
# Установка зависимостей
npm install

# Запуск сервера разработки
npm run dev

# Сборка для продакшена
npm run build

# Проверка кода
npm run lint

# Предпросмотр сборки
npm run preview
```

### 🔍 Отладка и логирование

#### Консольные сообщения
```javascript
// Пример логирования в приложении
console.log('✓ POST /api/auth/login', {
  status: 200,
  data: { user: '[MASKED]', token: '[HIDDEN]' }
});

console.error('✗ POST /api/auth/login', {
  status: 401,
  message: 'Неверные учетные данные'
});
```

#### Инструменты разработки
- **React Developer Tools** - Для отладки компонентов
- **Vite HMR** - Горячая перезагрузка модулей
- **ESLint** - Проверка качества кода
- **Browser DevTools** - Мониторинг сетевых запросов

### 📝 Кодстайл и стандарты

#### Правила написания кода
```javascript
// Использование CSS Modules
import styles from './LoginPage.module.css';

// Семантические элементы
<main className={styles.container}>
  <section className={styles.loginBox}>
    <header className={styles.loginHeader}>
      <h1 className={styles.logo}>LOGO</h1>
    </header>
  </section>
</main>

// ARIA атрибуты
<Form role="form" aria-label="Форма входа">
  <Field
    type="text"
    name="username"
    aria-label="Имя пользователя"
    aria-required="true"
  />
</Form>
```

#### CSS модули и стили
```css
/* Пример CSS модуля */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: var(--color-primary);
}

.inputWrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.clearButton {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.clearButton:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

## 🚀 Развертывание и продакшен

### 📦 Сборка для продакшена

```bash
# Оптимизированная сборка
npm run build

# Проверка сборки локально
npm run preview
```

#### Оптимизации Vite
- **Tree-shaking** - Автоматическое удаление неиспользуемого кода
- **Code splitting** - Разделение кода на чанки
- **Minification** - Минификация CSS и JavaScript
- **Gzip compression** - Сжатие статических файлов

### 🌍 Платформы развертывания

#### Vercel (рекомендуемо)
```bash
# Установка Vercel CLI
npm i -g vercel

# Развертывание
vercel --prod
```

#### Netlify
```bash
# Сборка и развертывание
npm run build
netlify deploy --prod --dir=dist
```

#### GitHub Pages
```bash
# Использование gh-pages
npm install --save-dev gh-pages
npm run build
npx gh-pages -d dist
```

## 🧪 Тестирование и качество

### 📋 Рекомендации по тестированию

#### Модульное тестирование
```javascript
// Пример теста для утилит обработки ошибок
import { handleApiError } from '../src/utils/errorHandler.js';

test('Обработка 401 ошибки', () => {
  const mockSetFieldError = jest.fn();
  const error = {
    response: {
      status: 401,
      data: { message: 'Неверные данные' }
    }
  };
  
  const result = handleApiError(error, mockSetFieldError);
  
  expect(mockSetFieldError).toHaveBeenCalledWith(
    'general', 
    'Неверный логин или пароль'
  );
  expect(result.type).toBe('server');
});
```

#### Интеграционное тестирование
```javascript
// Тестирование полного потока авторизации
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from '../src/pages/LoginPage.jsx';

test('Полный поток авторизации', async () => {
  render(<LoginPage />);
  
  // Ввод данных
  fireEvent.change(screen.getByLabelText('Имя пользователя'), {
    target: { value: 'testuser' }
  });
  
  fireEvent.change(screen.getByLabelText('Пароль'), {
    target: { value: 'password123' }
  });
  
  // Отправка формы
  fireEvent.click(screen.getByRole('button', { name: 'Войти' }));
  
  // Проверка результата
  await waitFor(() => {
    expect(screen.getByText('Успешная авторизация')).toBeInTheDocument();
  });
});
```

### 🔍 Контроль качества

#### ESLint конфигурация
```javascript
// eslint.config.js
import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
];
```

## ⚡ Оптимизация производительности

### 📊 Метрики производительности

#### Core Web Vitals
- **FCP** (First Contentful Paint) < 1.8с
- **LCP** (Largest Contentful Paint) < 2.5с  
- **CLS** (Cumulative Layout Shift) < 0.1
- **FID** (First Input Delay) < 100ms

#### Оптимизации
```javascript
// Ленивая загрузка компонентов
import { lazy, Suspense } from 'react';

const HomePage = lazy(() => import('./pages/HomePage.jsx'));
const RegisterPage = lazy(() => import('./pages/RegisterPage.jsx'));

// Использование с Suspense
<Suspense fallback={<div>Загрузка...</div>}>
  <Routes>
    <Route path="/home" element={<HomePage />} />
    <Route path="/register" element={<RegisterPage />} />
  </Routes>
</Suspense>
```

### 💰 Оптимизация бандла

#### Анализ размера бандла
```bash
# Анализ с rollup-plugin-visualizer
npm install --save-dev rollup-plugin-visualizer
npm run build
# Откроет stats.html с визуализацией
```

#### Webpack Bundle Analyzer
```bash
# Анализ зависимостей
npm install --save-dev webpack-bundle-analyzer
npx webpack-bundle-analyzer dist/assets/*.js
```

## 🔒 Безопасность и лучшие практики

### 🛡️ Меры безопасности

#### Защита от XSS
```javascript
// Очистка пользовательских данных
const sanitizeInput = (input) => {
  return input
    .trim()
    .replace(/[<>"'&]/g, (match) => {
      const escapeMap = {
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '&': '&amp;'
      };
      return escapeMap[match];
    });
};
```

#### Безопасное хранение токенов
```javascript
// Использование httpOnly cookies (рекомендуемо)
// Либо localStorage с дополнительными проверками
const secureTokenStorage = {
  save: (token) => {
    try {
      // Проверка формата JWT
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('Неверный формат токена');
      }
      
      localStorage.setItem('authToken', token);
    } catch (error) {
      console.error('Ошибка сохранения токена:', error);
    }
  }
};
```

### 🌐 Доступность (a11y)

#### WCAG 2.1 соответствие
```javascript
// Пример доступного компонента
<form role="form" aria-labelledby="login-title">
  <h2 id="login-title">Вход в систему</h2>
  
  <fieldset>
    <legend>Данные для входа</legend>
    
    <label htmlFor="username">Имя пользователя</label>
    <input
      id="username"
      type="text"
      required
      aria-describedby="username-error"
      aria-invalid={errors.username ? 'true' : 'false'}
    />
    {errors.username && (
      <div id="username-error" role="alert" aria-live="polite">
        {errors.username}
      </div>
    )}
  </fieldset>
  
  <button type="submit" aria-describedby="submit-help">
    Войти
  </button>
  <div id="submit-help" className="sr-only">
    Нажмите для входа в систему
  </div>
</form>
```

#### Клавиатурная навигация
```css
/* Фокус стили */
.button:focus,
.input:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(0, 170, 255, 0.1);
}

/* Поддержка темной темы */
@media (prefers-color-scheme: dark) {
  .container {
    background: var(--color-dark-bg);
    color: var(--color-dark-text);
  }
}

/* Поддержка сниженной анимации */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 🚀 Быстрый старт

### Предварительные требования
- **Node.js** (версия 16.0 или выше)
- **npm** или **yarn**

### Установка

1. **Клонируйте репозиторий:**
   ```bash
   git clone https://github.com/your-username/react-login.git
   cd react-login
   ```

2. **Установите зависимости:**
   ```bash
   npm install
   ```

3. **Запустите сервер разработки:**
   ```bash
   npm run dev
   ```

4. **Откройте браузер:**
   ```
   http://localhost:5173
   ```

### Доступные команды

```bash
# Запуск сервера разработки
npm run dev

# Сборка для продакшена
npm run build

# Предварительный просмотр сборки
npm run preview

# Проверка кода с ESLint
npm run lint
```

## 🧭 Навигация и маршруты

| Маршрут     | Компонент    | Описание                                 |
|-------------|--------------|------------------------------------------|
| `/`         | LoginPage    | Страница входа в систему                 |
| `/register` | RegisterPage | Страница регистрации нового пользователя |
| `/home`     | HomePage     | Главная страница после авторизации       |

## 📋 Валидация форм

### Страница входа
- **Логин**: 4-20 символов
- **Пароль**: минимум 6 символов, должен содержать буквы и цифры
- **Запомнить пользователя**: опциональный чекбокс

### Страница регистрации
- **Имя**: 2-50 символов
- **Фамилия**: 2-50 символов
- **Email**: корректный формат email
- **Пароль**: минимум 6 символов с буквами и цифрами
- **Подтверждение пароля**: должен совпадать с основным паролем
- **Согласие с условиями**: обязательный чекбокс

## 🎨 Система дизайна

### Цветовая палитра
- **Основной синий**: `#00aaff` - кнопки, ссылки
- **Акцентный красный**: `#e63946` - логотип, важные элементы
- **Текст**: `#000000` (черный), `#666666` (серый)
- **Фон**: `#ffffff` (белый), `#f5f5f5` (светло-серый)

### Типографика
- **Основной шрифт**: Inter с системными fallback-ами
- **CSS переменные** для размеров, весов и межстрочных интервалов
- **Адаптивные размеры** для разных экранов

## 🔧 Кастомизация

### Изменение цветовой схемы
Отредактируйте CSS переменные в соответствующих `.module.css` файлах.

### Добавление новых страниц
1. Создайте новый компонент в `src/pages/`
2. Создайте соответствующий CSS модуль в `src/styles/`
3. Добавьте маршрут в `App.jsx`

## 🤝 Вклад в проект

1. Сделайте fork репозитория
2. Создайте ветку для новой функции (`git checkout -b feature/amazing-feature`)
3. Зафиксируйте изменения (`git commit -m 'Add amazing feature'`)
4. Отправьте ветку (`git push origin feature/amazing-feature`)
5. Откройте Pull Request


