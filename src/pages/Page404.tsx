import '../data/styles.scss';
import { useNavigate } from 'react-router-dom';

const Page404 = () => {
  const navigate = useNavigate();

  return (
    <section className="section">
      <div className="container page404__container">
        <h1 className="page404__title">Page not found</h1>
        <button className="card__button" onClick={() => navigate('/')}>Back to Home</button>
      </div>
    </section>
  );
};

export default Page404;
