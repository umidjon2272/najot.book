import { useState } from 'react'
import { useCart } from '../../context/CartContext'
import styles from './BookCard.module.scss'

const BookCard = ({ book }) => {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addToCart(book)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className={styles.card}>
      <div className={styles.imgWrap}>
        <img src={book.image} alt={book.title} />
      </div>
      <div className={styles.info}>
        <h3 className={styles.title}>{book.title}</h3>
        <p className={styles.author}>{book.author}</p>
        <p className={styles.desc}>{book.description}</p>
        <div className={styles.bottom}>
          <span className={styles.price}>
            {book.price.toLocaleString()} so'm
          </span>
          <button
            className={`${styles.btn} ${added ? styles.added : ''}`}
            onClick={handleAdd}
          >
            {added ? '✅ Qo\'shildi!' : '+ Savat'}
          </button>
        </div>
      </div>
      {added && (
        <div className={styles.flyEmoji}>🛒</div>
      )}
    </div>
  )
}

export default BookCard