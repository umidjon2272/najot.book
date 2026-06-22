import { categories } from '../../data/books'
import styles from './CategoryBar.module.scss'

const CategoryBar = ({ active, onSelect }) => {
  return (
    <div className={styles.bar}>
      {categories.map(cat => (
        <button
          key={cat.id}
          className={`${styles.btn} ${active === cat.id ? styles.active : ''}`}
          onClick={() => onSelect(cat.id)}
        >
          {cat.name}
        </button>
      ))}
    </div>
  )
}

export default CategoryBar