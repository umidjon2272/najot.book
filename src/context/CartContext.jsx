import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])

  const addToCart = (book) => {
    setCartItems(prev => {
      const exists = prev.find(item => item.id === book.id)
      if (exists) {
        return prev.map(item =>
          item.id === book.id
            ? { ...item, qty: item.qty + 1 }
            : item
        )
      }
      return [...prev, { ...book, qty: 1 }]
    })
  }

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const updateQty = (id, qty) => {
    if (qty < 1) return
    setCartItems(prev =>
      prev.map(item => item.id === id ? { ...item, qty } : item)
    )
  }

  const clearCart = () => setCartItems([])

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty, 0
  )

  const totalCount = cartItems.reduce(
    (sum, item) => sum + item.qty, 0
  )

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQty,
      clearCart,
      totalPrice,
      totalCount,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)