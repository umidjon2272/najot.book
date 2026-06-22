import { useState, useEffect } from 'react'
import { books as initialBooks } from '../../data/books'
import AdminLogin from './AdminLogin'
import styles from './Admin.module.scss'

const Admin = () => {
  const [auth, setAuth] = useState(false)
  const [books, setBooks] = useState(initialBooks)
  const [tab, setTab] = useState('dashboard')
  const [editBook, setEditBook] = useState(null)
  const [form, setForm] = useState({
    title: '',
    author: '',
    price: '',
    category: 'biznes',
    image: '',
    description: '',
  })

  useEffect(() => {
    if (localStorage.getItem('admin_auth') === 'true') {
      setAuth(true)
    }
  }, [])

  const handleLogin = () => setAuth(true)

  const handleLogout = () => {
    localStorage.removeItem('admin_auth')
    setAuth(false)
  }

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleImageUpload = e => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setForm(prev => ({ ...prev, image: reader.result }))
    }
    reader.readAsDataURL(file)
  }

  const handleAdd = () => {
    if (!form.title || !form.author || !form.price) {
      alert('Iltimos, asosiy maydonlarni to\'ldiring!')
      return
    }
    setBooks([...books, {
      ...form,
      id: Date.now(),
      price: Number(form.price),
    }])
    setForm({
      title: '',
      author: '',
      price: '',
      category: 'biznes',
      image: '',
      description: '',
    })
    alert('Kitob qo\'shildi! ✅')
  }

  const handleEdit = book => {
    setEditBook(book)
    setForm({ ...book, price: String(book.price) })
    setTab('edit')
  }

  const handleUpdate = () => {
    if (!form.title || !form.author || !form.price) {
      alert('Iltimos, asosiy maydonlarni to\'ldiring!')
      return
    }
    setBooks(books.map(b =>
      b.id === editBook.id
        ? { ...form, id: editBook.id, price: Number(form.price) }
        : b
    ))
    setEditBook(null)
    setTab('books')
    alert('Kitob yangilandi! ✅')
  }

  const handleDelete = id => {
    if (confirm('Kitobni o\'chirishni tasdiqlaysizmi?')) {
      setBooks(books.filter(b => b.id !== id))
    }
  }

  const totalBooks = books.length
  const avgPrice = books.length
    ? Math.round(books.reduce((s, b) => s + b.price, 0) / books.length)
    : 0
  const maxBook = books.length
    ? books.reduce((a, b) => a.price > b.price ? a : b)
    : null
  const minBook = books.length
    ? books.reduce((a, b) => a.price < b.price ? a : b)
    : null
  const categoryCounts = books.reduce((acc, b) => {
    acc[b.category] = (acc[b.category] || 0) + 1
    return acc
  }, {})

  if (!auth) return <AdminLogin onLogin={handleLogin} />

  return (
    <div className={styles.admin}>
      <div className={styles.header}>
        <h2 className={styles.title}>Admin Panel</h2>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          🚪 Chiqish
        </button>
      </div>

      <div className={styles.tabs}>
        <button
          className={tab === 'dashboard' ? styles.active : ''}
          onClick={() => setTab('dashboard')}
        >
          📊 Dashboard
        </button>
        <button
          className={tab === 'books' ? styles.active : ''}
          onClick={() => setTab('books')}
        >
          📚 Kitoblar
        </button>
        <button
          className={tab === 'add' ? styles.active : ''}
          onClick={() => setTab('add')}
        >
          ➕ Qo'shish
        </button>
      </div>

      {tab === 'dashboard' && (
        <div className={styles.dashboard}>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <span>📚</span>
              <div>
                <p>Jami kitoblar</p>
                <strong>{totalBooks} ta</strong>
              </div>
            </div>
            <div className={styles.statCard}>
              <span>💰</span>
              <div>
                <p>O'rtacha narx</p>
                <strong>{avgPrice.toLocaleString()} so'm</strong>
              </div>
            </div>
            <div className={styles.statCard}>
              <span>⬆️</span>
              <div>
                <p>Eng qimmat</p>
                <strong>{maxBook?.title}</strong>
              </div>
            </div>
            <div className={styles.statCard}>
              <span>⬇️</span>
              <div>
                <p>Eng arzon</p>
                <strong>{minBook?.title}</strong>
              </div>
            </div>
          </div>

          <div className={styles.categoryStats}>
            <h3>Kategoriyalar bo'yicha</h3>
            <div className={styles.catGrid}>
              {Object.entries(categoryCounts).map(([cat, count]) => (
                <div key={cat} className={styles.catCard}>
                  <p>{cat}</p>
                  <strong>{count} ta</strong>
                  <div className={styles.bar}>
                    <div
                      className={styles.barFill}
                      style={{ width: `${(count / totalBooks) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'books' && (
        <div className={styles.bookList}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Kitob</th>
                <th>Muallif</th>
                <th>Kategoriya</th>
                <th>Narx</th>
                <th>Amal</th>
              </tr>
            </thead>
            <tbody>
              {books.map(book => (
                <tr key={book.id}>
                  <td>
                    <div className={styles.bookCell}>
                      <img src={book.image} alt={book.title} />
                      <span>{book.title}</span>
                    </div>
                  </td>
                  <td>{book.author}</td>
                  <td>
                    <span className={styles.badge}>{book.category}</span>
                  </td>
                  <td>{book.price.toLocaleString()} so'm</td>
                  <td>
                    <div className={styles.actions}>
                      <button
                        className={styles.editBtn}
                        onClick={() => handleEdit(book)}
                      >
                        ✏️ Tahrirlash
                      </button>
                      <button
                        className={styles.deleteBtn}
                        onClick={() => handleDelete(book.id)}
                      >
                        🗑️ O'chirish
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'add' && (
        <div className={styles.addForm}>
          <input
            name="title"
            placeholder="Kitob nomi"
            value={form.title}
            onChange={handleChange}
          />
          <input
            name="author"
            placeholder="Muallif"
            value={form.author}
            onChange={handleChange}
          />
          <input
            name="price"
            type="number"
            placeholder="Narx (so'm)"
            value={form.price}
            onChange={handleChange}
          />
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option value="biznes">Biznes</option>
            <option value="diniy">Diniy kitoblar</option>
            <option value="badiy">Badiiy kitoblar</option>
            <option value="ertaklar">Ertaklar</option>
          </select>
          <textarea
            name="description"
            placeholder="Tavsif"
            value={form.description}
            onChange={handleChange}
            rows={3}
          />
          <div className={styles.imageUpload}>
            <p>Rasm tanlash (telefon galereyasidan):</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
            {form.image && (
              <img
                src={form.image}
                alt="preview"
                className={styles.preview}
              />
            )}
          </div>
          <button className={styles.addBtn} onClick={handleAdd}>
            ➕ Kitob qo'shish
          </button>
        </div>
      )}

      {tab === 'edit' && (
        <div className={styles.addForm}>
          <h3 className={styles.editTitle}>
            ✏️ Tahrirlash: {editBook?.title}
          </h3>
          <input
            name="title"
            placeholder="Kitob nomi"
            value={form.title}
            onChange={handleChange}
          />
          <input
            name="author"
            placeholder="Muallif"
            value={form.author}
            onChange={handleChange}
          />
          <input
            name="price"
            type="number"
            placeholder="Narx (so'm)"
            value={form.price}
            onChange={handleChange}
          />
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option value="biznes">Biznes</option>
            <option value="diniy">Diniy kitoblar</option>
            <option value="badiy">Badiiy kitoblar</option>
            <option value="ertaklar">Ertaklar</option>
          </select>
          <textarea
            name="description"
            placeholder="Tavsif"
            value={form.description}
            onChange={handleChange}
            rows={3}
          />
          <div className={styles.imageUpload}>
            <p>Rasm tanlash:</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
            {form.image && (
              <img
                src={form.image}
                alt="preview"
                className={styles.preview}
              />
            )}
          </div>
          <button className={styles.addBtn} onClick={handleUpdate}>
            ✅ Saqlash
          </button>
        </div>
      )}
    </div>
  )
}

export default Admin