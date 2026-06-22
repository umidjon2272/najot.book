import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import logo from '../../assets/logo.png'
import styles from './Navbar.module.scss'

const Navbar = () => {
  const { totalCount } = useCart()
  const location = useLocation()

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">
          <img src={logo} alt="Najot Book" />
        </Link>
      </div>
      <ul className={styles.links}>
        <li>
          <Link
            to="/"
            className={location.pathname === '/' ? styles.active : ''}
          >
            Bosh sahifa
          </Link>
        </li>
        <li>
          <Link
            to="/catalog"
            className={location.pathname === '/catalog' ? styles.active : ''}
          >
            Kitoblar
          </Link>
        </li>
        <li>
          <Link to="/cart" className={styles.cartBtn}>
            🛒 Savat
            {totalCount > 0 && (
              <span className={styles.badge}>{totalCount}</span>
            )}
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar