import { Link } from 'react-router-dom';
import './index.css'; // Import the CSS file

const Navigation = ({ token }) => {
  return (
    <nav className="navigation">
      <ul className="navigation-list">
        <li className="navigation-item">
          <Link to="/products" className="navigation-link">
            Products
          </Link>
        </li>
        <li className="navigation-item">
          <Link to="/cart" className="navigation-link">
            Cart
          </Link>
        </li>
        {!token && (
          <>
            <li className="navigation-item">
              <Link to="/login" className="navigation-link">
                Login
              </Link>
            </li>
            <li className="navigation-item">
              <Link to="/register" className="navigation-link">
                Register
              </Link>
            </li>
          </>
        )}
        {token && (
          <>
            <li className="navigation-item">
              <Link to="/account" className="navigation-link">
                Account
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
