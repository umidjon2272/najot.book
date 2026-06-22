import { useState } from 'react'
import { books } from '../../data/books'
import BookCard from '../../components/BookCard/BookCard'
import CategoryBar from '../../components/CategoryBar/CategoryBar'
import styles from './Catalog.module.scss'

const Catalog = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = books.filter(book => {
    const matchCategory =
      activeCategory === 'all' || book.category === activeCategory
    const matchSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
    return matchCategory && matchSearch
  })

  return (
    <div className={styles.catalog}>
      <div className={styles.top}>
        <h2>Kitoblar</h2>
        <input
          type="text"
          placeholder="Qidiruv"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className={styles.search}
        />
      </div>
      <CategoryBar
        active={activeCategory}
        onSelect={setActiveCategory}
      />
      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <p>Hech narsa topilmadi 😔</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {filtered.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Catalog