import { useNavigate } from 'react-router-dom';
import styles from './page404.module.scss';

const Page404 = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.page404__title}>Page not found</h1>
        <button className={styles.card__button} onClick={() => navigate('/')}>Back to Home</button>
      </div>
    </section>
  );
};

export default Page404;
