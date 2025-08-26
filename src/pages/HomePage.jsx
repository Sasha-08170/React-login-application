// src/pages/HomePage.js
import Seo from "../components/Seo.jsx";
import styles from "../styles/HomePage.module.css";

const HomePage = () => {
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
        <section className={styles.welcomeSection}>
          <header>
            <h1 className={styles.title}>Добро пожаловать 👋</h1>
          </header>
          <article>
            <p className={styles.description}>
              Это главная страница после успешного входа.
            </p>
          </article>
        </section>
      </main>
    </>
  );
};

export default HomePage;
