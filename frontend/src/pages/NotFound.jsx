import { Link } from "react-router-dom";

const NotFoundPage = () => (
  <div className="page center">
    <h1>404</h1>
    <p className="muted">The page you are looking for does not exist.</p>
    <Link to="/" className="primary-button">
      Go home
    </Link>
  </div>
);

export default NotFoundPage;

