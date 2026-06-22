import { useState } from 'react'
import styles from './AdminLogin.module.scss'

const ADMIN_USER = 'admin'
const ADMIN_PASS = 'najot2024'

const AdminLogin = ({ onLogin }) => {
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')

  const handleLogin = () => {
    if (
      form.username === ADMIN_USER &&
      form.password === ADMIN_PASS
    ) {
      localStorage.setItem('admin_auth', 'true')
      onLogin()
    } else {
      setError('Login yoki parol noto\'g\'ri!')
    }
  }

  return (
    <div className={styles.loginPage}>
      <div className={styles.card}>
        <div className={styles.logo}>🔐</div>
        <h2>Admin Panel</h2>
        <p>Kirish uchun login va parolni yozing</p>

        {error && <div className={styles.error}>{error}</div>}

        <input
          placeholder="Login"
          value={form.username}
          onChange={e => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Parol"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          onKeyDown={e => e.key === 'Enter' && handleLogin()}
        />
        <button onClick={handleLogin}>Kirish</button>
      </div>
    </div>
  )
}

export default AdminLogin