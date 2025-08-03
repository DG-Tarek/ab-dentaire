"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

interface CartItem {
  itemId: string;            // Firestore Item document ID
  ref: string;               // Product reference code
  name: string;              // Product name
  image: string;             // Product image URL
  price: number;             // Price per unit (original or discounted)
  quantity: number;          // Quantity selected
  subtotal: number;          // price * quantity (calculated at time of checkout)
}

interface Cart {
  userId?: string;           // Optional user ID (for logged-in users)
  items: CartItem[];         // List of products to buy
  total: number;             // Total cost = sum of subtotals
  createdAt: Date;           // Cart creation time (or start of checkout)
  updatedAt?: Date;          // Last update (e.g. added/removed items)
}

interface CartContextType {
  isCartOpen: boolean
  cart: Cart
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  addToCart: (item: Omit<CartItem, 'subtotal' | 'quantity'>, quantity?: number) => void
  removeFromCart: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  getCartItemCount: () => number
  getCartTotal: () => number
  isItemInCart: (itemId: string) => boolean
}

const CART_STORAGE_KEY = 'ab-dentaire-cart'

const CartContext = createContext<CartContextType | undefined>(undefined)

// Helper function to load cart from localStorage
const loadCartFromStorage = (): Cart => {
  if (typeof window === 'undefined') {
    return {
      items: [],
      total: 0,
      createdAt: new Date(),
    }
  }

  try {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY)
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart)
      return {
        ...parsedCart,
        createdAt: new Date(parsedCart.createdAt),
        updatedAt: parsedCart.updatedAt ? new Date(parsedCart.updatedAt) : undefined,
      }
    }
  } catch (error) {
    console.error('Error loading cart from localStorage:', error)
  }

  return {
    items: [],
    total: 0,
    createdAt: new Date(),
  }
}

// Helper function to save cart to localStorage
const saveCartToStorage = (cart: Cart): void => {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
  } catch (error) {
    console.error('Error saving cart to localStorage:', error)
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cart, setCart] = useState<Cart>(() => loadCartFromStorage())

  // Load cart from localStorage on mount
  useEffect(() => {
    const loadedCart = loadCartFromStorage()
    setCart(loadedCart)
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    saveCartToStorage(cart)
  }, [cart])

  const openCart = () => setIsCartOpen(true)
  const closeCart = () => setIsCartOpen(false)
  const toggleCart = () => setIsCartOpen(!isCartOpen)

  const addToCart = (item: Omit<CartItem, 'subtotal' | 'quantity'>, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.items.findIndex(cartItem => cartItem.itemId === item.itemId)
      
      if (existingItemIndex >= 0) {
        // Update existing item quantity
        const updatedItems = [...prevCart.items]
        const existingItem = updatedItems[existingItemIndex]
        const newQuantity = existingItem.quantity + quantity
        const newSubtotal = item.price * newQuantity
        
        updatedItems[existingItemIndex] = {
          ...existingItem,
          quantity: newQuantity,
          subtotal: newSubtotal
        }

        return {
          ...prevCart,
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + item.subtotal, 0),
          updatedAt: new Date()
        }
      } else {
        // Add new item
        const newItem: CartItem = {
          ...item,
          quantity,
          subtotal: item.price * quantity
        }

        const updatedItems = [...prevCart.items, newItem]
        return {
          ...prevCart,
          items: updatedItems,
          total: updatedItems.reduce((sum, item) => sum + item.subtotal, 0),
          updatedAt: new Date()
        }
      }
    })
  }

  const removeFromCart = (itemId: string) => {
    setCart(prevCart => {
      const updatedItems = prevCart.items.filter(item => item.itemId !== itemId)
      return {
        ...prevCart,
        items: updatedItems,
        total: updatedItems.reduce((sum, item) => sum + item.subtotal, 0),
        updatedAt: new Date()
      }
    })
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId)
      return
    }

    setCart(prevCart => {
      const updatedItems = prevCart.items.map(item => {
        if (item.itemId === itemId) {
          return {
            ...item,
            quantity,
            subtotal: item.price * quantity
          }
        }
        return item
      })

      return {
        ...prevCart,
        items: updatedItems,
        total: updatedItems.reduce((sum, item) => sum + item.subtotal, 0),
        updatedAt: new Date()
      }
    })
  }

  const clearCart = () => {
    setCart({
      items: [],
      total: 0,
      createdAt: new Date(),
    })
  }

  const getCartItemCount = () => {
    return cart.items.reduce((total, item) => total + item.quantity, 0)
  }

  const getCartTotal = () => {
    return cart.total
  }

  const isItemInCart = (itemId: string) => {
    return cart.items.some(item => item.itemId === itemId)
  }

  return (
    <CartContext.Provider value={{ 
      isCartOpen, 
      cart,
      openCart, 
      closeCart, 
      toggleCart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartItemCount,
      getCartTotal,
      isItemInCart
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
} 