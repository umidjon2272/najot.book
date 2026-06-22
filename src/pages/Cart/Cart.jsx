import { useState } from 'react'
import { useCart } from '../../context/CartContext'
import styles from './Cart.module.scss'

const Cart = () => {
    const { cartItems, removeFromCart, updateQty, clearCart, totalPrice } = useCart()
    const [form, setForm] = useState({
        name: '',
        phone: '',
        address: '',
    })
    const [sent, setSent] = useState(false)

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const openMap = () => {
        if (!form.address) {
            alert('Avval manzilingizni yozing!')
            return
        }
        const query = encodeURIComponent(form.address + ' pochta bo\'limi Toshkent')
        window.open(`https://www.google.com/maps/search/${query}`, '_blank')
    }

    const handleOrder = () => {
        if (!form.name || !form.phone || !form.address) {
            alert('Iltimos, barcha maydonlarni to\'ldiring!')
            return
        }
        if (cartItems.length === 0) {
            alert('Savat bo\'sh!')
            return
        }
        const BOT_TOKEN = import.meta.env.VITE_BOT_TOKEN
        const CHAT_ID = import.meta.env.VITE_CHAT_ID

        const booksList = cartItems
            .map(item => `📖 ${item.title} x${item.qty} — ${(item.price * item.qty).toLocaleString()} so'm`)
            .join('\n')

        const message = `
🛒 *Yangi buyurtma!*

${booksList}

💰 *Jami:* ${totalPrice.toLocaleString()} so'm

👤 *Ism:* ${form.name}
📞 *Telefon:* ${form.phone}
📍 *Manzil:* ${form.address}
    `.trim()

        fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'Markdown',
            }),
        })
            .then(() => {
                setSent(true)
                clearCart()
            })
            .catch(() => alert('Xatolik yuz berdi, qayta urinib ko\'ring!'))
    }

    if (sent) {
        return (
            <div className={styles.success}>
                <span>✅</span>
                <h2>Buyurtma qabul qilindi!</h2>
                <p>Tez orada siz bilan bog'lanamiz.</p>
            </div>
        )
    }

    return (
        <div className={styles.cart}>
            <h2 className={styles.title}>Savat</h2>

            {cartItems.length === 0 ? (
                <div className={styles.empty}>
                    <p>Savat bo'sh 🛒</p>
                </div>
            ) : (
                <div className={styles.layout}>
                    <div className={styles.items}>
                        {cartItems.map(item => (
                            <div key={item.id} className={styles.item}>
                                <img src={item.image} alt={item.title} />
                                <div className={styles.itemInfo}>
                                    <h3>{item.title}</h3>
                                    <p>{item.author}</p>
                                    <span>{item.price.toLocaleString()} so'm</span>
                                </div>
                                <div className={styles.qty}>
                                    <button onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                                    <span>{item.qty}</span>
                                    <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                                </div>
                                <button
                                    className={styles.remove}
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className={styles.form}>
                        <h3>Buyurtma ma'lumotlari</h3>
                        <input
                            name="name"
                            placeholder="Ismingiz"
                            value={form.name}
                            onChange={handleChange}
                        />
                        <input
                            name="phone"
                            placeholder="Telefon raqamingiz"
                            value={form.phone}
                            onChange={handleChange}
                        />
                        <input
                            name="address"
                            placeholder="Yetkazish manzili"
                            value={form.address}
                            onChange={handleChange}
                        />
                        <button className={styles.mapBtn} onClick={openMap}>
                            📍 Eng yaqin pochtani topish
                        </button>

                        <div className={styles.cardInfo}>
                            <p>💳 To'lov uchun karta raqami:</p>
                            <strong>8600 1234 5678 9012</strong>
                            <button
                                className={styles.copyBtn}
                                onClick={() => {
                                    navigator.clipboard.writeText('8600123456789012')
                                    alert('Karta raqami nusxalandi! ✅')
                                }}
                            >
                                Nusxalash
                            </button>
                        </div>

                        <div className={styles.total}>
                            Jami: <strong>{totalPrice.toLocaleString()} so'm</strong>
                        </div>
                        <button className={styles.orderBtn} onClick={handleOrder}>
                            Buyurtma berish
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Cart