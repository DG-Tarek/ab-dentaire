"use client"

import { Menu, ShoppingCart, X, Trash2, Plus, Minus, User, Heart, Home, CreditCard } from "lucide-react"
import * as React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "./ui/drawer"
import { Button } from "./ui/button"
import { useCart } from "./cart-context"
import { useRouter } from "next/navigation"

export function Header() {
  const { isCartOpen, openCart, closeCart } = useCart()
  const router = useRouter()

  // Mock cart data - in a real app this would come from context/state
  const cartItems = [
    {
      id: 1,
      name: "Blanchiment",
      price: 80,
      quantity: 2,
      image: "https://example.com/images/blanchiment.jpg"
    },
    {
      id: 2,
      name: "Implant Dentaire",
      price: 399,
      quantity: 1,
      image: "https://example.com/images/implant.jpg"
    }
  ]

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Left: Logo and Navigation */}
          <div className="flex items-center space-x-4">
            {/* Hamburger Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  aria-label="Open menu"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl hover:bg-gray-100/80 transition-all duration-200"
                >
                  <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mt-2 ml-2 w-48 sm:w-56 rounded-2xl shadow-xl bg-white/95 backdrop-blur-md border border-gray-200/50 p-2">
                <DropdownMenuItem 
                  className="flex items-center space-x-3 cursor-pointer px-4 py-3 rounded-xl hover:bg-blue-50 text-sm sm:text-base transition-all duration-200"
                  onClick={() => router.push('/')}
                >
                  <Home className="w-4 h-4 text-blue-600" />
                  <span>Accueil</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="flex items-center space-x-3 cursor-pointer px-4 py-3 rounded-xl hover:bg-blue-50 text-sm sm:text-base transition-all duration-200"
                  onClick={() => router.push('/cards')}
                >
                  <CreditCard className="w-4 h-4 text-green-600" />
                  <span>Nos Services</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="flex items-center space-x-3 cursor-pointer px-4 py-3 rounded-xl hover:bg-blue-50 text-sm sm:text-base transition-all duration-200"
                  onClick={() => router.push('/test-route')}
                >
                  <CreditCard className="w-4 h-4 text-purple-600" />
                  <span>Test Route</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center space-x-3 cursor-pointer px-4 py-3 rounded-xl hover:bg-blue-50 text-sm sm:text-base transition-all duration-200">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span>Favoris</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center space-x-3 cursor-pointer px-4 py-3 rounded-xl hover:bg-blue-50 text-sm sm:text-base transition-all duration-200">
                  <User className="w-4 h-4 text-blue-600" />
                  <span>Mon Compte</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Logo/Brand */}
            <div className="hidden sm:flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AB</span>
              </div>
              <span className="text-lg sm:text-xl font-bold text-gray-900">Dentaire</span>
            </div>
          </div>

          {/* Center: Spacer */}
          <div className="flex-1"></div>

          {/* Right: Cart */}
          <div className="flex items-center">
            {/* Cart Drawer */}
            <Drawer open={isCartOpen} onOpenChange={(open: boolean) => open ? openCart() : closeCart()} direction="right">
              <DrawerTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  aria-label="Open cart"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl hover:bg-gray-100/80 transition-all duration-200 relative"
                  onClick={openCart}
                >
                  <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg animate-pulse">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </DrawerTrigger>
              <DrawerContent className="fixed top-0 right-0 h-full w-80 sm:w-96 bg-white/95 backdrop-blur-md shadow-2xl border-l border-gray-200/50 flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Panier</h2>
                    <p className="text-sm text-gray-500">{totalItems} article{totalItems !== 1 ? 's' : ''}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={closeCart}
                    className="w-10 h-10 rounded-xl hover:bg-gray-100/80 transition-all duration-200"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6">
                  {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                        <ShoppingCart className="w-10 h-10 text-gray-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">Votre panier est vide</h3>
                      <p className="text-gray-500 mb-8 max-w-sm">Ajoutez quelques articles pour commencer vos achats</p>
                      <Button 
                        onClick={closeCart} 
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                      >
                        Continuer les achats
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 hover:bg-gray-100/80 transition-all duration-200">
                          <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center flex-shrink-0">
                            <ShoppingCart className="w-7 h-7 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-gray-900 truncate">{item.name}</h4>
                            <p className="text-sm text-gray-500 font-medium">{item.price.toLocaleString()} DA</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="w-8 h-8 rounded-lg hover:bg-gray-200/80 transition-all duration-200"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="text-sm font-bold w-8 text-center bg-white px-2 py-1 rounded-lg border border-gray-200">{item.quantity}</span>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="w-8 h-8 rounded-lg hover:bg-gray-200/80 transition-all duration-200"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="w-8 h-8 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 transition-all duration-200"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer */}
                {cartItems.length > 0 && (
                  <div className="border-t border-gray-200/50 p-6 bg-gray-50/50 backdrop-blur-sm">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-lg font-semibold text-gray-900">Total</span>
                      <span className="text-2xl font-bold text-blue-600">{totalPrice.toLocaleString()} DA</span>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 mb-3">
                      Procéder au paiement
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full text-gray-600 hover:text-gray-800 hover:bg-gray-100/80 py-3 rounded-xl transition-all duration-200"
                      onClick={closeCart}
                    >
                      Continuer les achats
                    </Button>
                  </div>
                )}
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </header>
  )
} 