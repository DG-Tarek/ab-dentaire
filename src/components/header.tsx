"use client"

import { ShoppingCart, X, Trash2, Plus, Minus, User, Heart, Home, ShoppingBag } from "lucide-react"
import * as React from "react"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "./ui/drawer"
import { Button } from "./ui/button"
import { useCart } from "./cart-context"
import { useRouter, usePathname } from "next/navigation"
import { cn, formatPrice } from "@/lib/utils"
import { useCurrency } from "./currency-context"
import { COMPONENT_SCALING } from "@/lib/responsive-scaling"

const navigationItems = [
  {
    name: "Accueil",
    href: "/",
    icon: Home,
  },
  {
    name: "Shop",
    href: "/shop",
    icon: ShoppingBag,
  },
  {
    name: "Favoris",
    href: "/favorite",
    icon: Heart,
  },
  {
    name: "Compte",
    href: "/account",
    icon: User,
  },
]

export function Header() {
  const { isCartOpen, openCart, closeCart } = useCart()
  const router = useRouter()
  const pathname = usePathname()
  const { selectedCurrency } = useCurrency()

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
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 sm:h-14">
          {/* Left: Logo and Navigation */}
          <div className="flex items-center space-x-6">

            {/* Logo/Brand */}
            <div 
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => router.push('/')}
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-xs sm:text-sm">AB</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm sm:text-base font-bold text-gray-900">Dentaire</span>
                <span className="text-xs text-gray-500 hidden sm:block">Excellence & Innovation</span>
              </div>
            </div>
          </div>

          {/* Center: Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              
              return (
                <button
                  key={item.name}
                  onClick={() => router.push(item.href)}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200",
                    isActive 
                      ? "text-blue-600 bg-blue-50" 
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  )}
                >
                  <Icon className={COMPONENT_SCALING.navigation.icon.desktop} />
                  <span className={cn("font-medium", COMPONENT_SCALING.navigation.text.desktop)}>{item.name}</span>
                </button>
              )
            })}
          </div>

          {/* Right: Cart */}
          <div className="flex items-center">
            {/* Cart Drawer */}
            <Drawer open={isCartOpen} onOpenChange={(open: boolean) => open ? openCart() : closeCart()}>
              <DrawerTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  aria-label="Open cart"
                  className={cn(
                    "rounded-xl hover:bg-gray-100 transition-colors duration-200 relative",
                    COMPONENT_SCALING.navigation.button.mobile,
                    "sm:" + COMPONENT_SCALING.navigation.button.tablet,
                    "lg:" + COMPONENT_SCALING.navigation.button.desktop
                  )}
                  onClick={openCart}
                >
                  <ShoppingCart className={cn(
                    COMPONENT_SCALING.navigation.icon.mobile,
                    "sm:" + COMPONENT_SCALING.navigation.icon.tablet,
                    "lg:" + COMPONENT_SCALING.navigation.icon.desktop
                  )} />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </DrawerTrigger>
              <DrawerContent direction="right" className="fixed top-0 right-0 h-full w-80 sm:w-96 bg-white shadow-2xl border-l border-gray-200 flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">Panier</h2>
                    <p className="text-xs text-gray-500">{totalItems} article{totalItems !== 1 ? 's' : ''}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={closeCart}
                    className={cn(
                      "rounded-xl hover:bg-gray-100 transition-colors duration-200",
                      COMPONENT_SCALING.navigation.button.mobile,
                      "sm:" + COMPONENT_SCALING.navigation.button.tablet,
                      "lg:" + COMPONENT_SCALING.navigation.button.desktop
                    )}
                  >
                    <X className={cn(
                      COMPONENT_SCALING.navigation.icon.mobile,
                      "sm:" + COMPONENT_SCALING.navigation.icon.tablet,
                      "lg:" + COMPONENT_SCALING.navigation.icon.desktop
                    )} />
                  </Button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6">
                  {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                        <ShoppingCart className="w-10 h-10 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Votre panier est vide</h3>
                      <p className="text-sm text-gray-500 mb-8 max-w-sm">Ajoutez quelques articles pour commencer vos achats</p>
                      <Button 
                        onClick={closeCart} 
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl"
                      >
                        Continuer les achats
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl border border-gray-200">
                          <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                            <ShoppingCart className="w-7 h-7 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-semibold text-gray-900 truncate">{item.name}</h4>
                            <p className="text-xs text-gray-500 font-medium">{formatPrice(item.price, selectedCurrency)}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="w-8 h-8 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="text-sm font-bold w-8 text-center bg-white px-2 py-1 rounded-lg border border-gray-200">{item.quantity}</span>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="w-8 h-8 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="w-8 h-8 rounded-lg text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors duration-200"
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
                  <div className="border-t border-gray-200 p-6 bg-gray-50">
                    <div className="flex justify-between items-center mb-6">
                      <span className="text-sm font-semibold text-gray-900">Total</span>
                      <span className="text-lg font-bold text-blue-600">{formatPrice(totalPrice, selectedCurrency)}</span>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 rounded-xl mb-3">
                      Procéder au paiement
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full text-gray-600 hover:text-gray-800 hover:bg-gray-100 py-3 rounded-xl transition-colors duration-200"
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