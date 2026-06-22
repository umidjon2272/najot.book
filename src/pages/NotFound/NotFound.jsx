import { Link } from 'react-router-dom'
import styles from './NotFound.module.scss'

const NotFound = () => {
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <h1>404</h1>
        <h2>Sahifa topilmadi</h2>
        <p>Siz qidirgan sahifa mavjud emas yoki o'chirilgan.</p>
        <Link to="/" className={styles.btn}>
          🏠 Bosh sahifaga qaytish
        </Link>
      </div>
    </div>
  )
}

export default NotFound