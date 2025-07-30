"use client"

import { Menu, ShoppingCart, X, Trash2, Plus, Minus, User, Heart, Home, CreditCard, ShoppingBag, Phone, ChevronDown } from "lucide-react"
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
import { useRouter, usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navigationItems = [
  {
    name: "Accueil",
    href: "/",
    icon: Home,
    isLink: true,
  },
  {
    name: "Shop",
    href: "/shop",
    icon: ShoppingBag,
    isLink: false, // This will show dropdown instead of direct navigation
  },
  {
    name: "Favoris",
    href: "/favorite",
    icon: Heart,
    isLink: true,
  },
  {
    name: "Compte",
    href: "/account",
    icon: User,
    isLink: true,
  },
]

const boutiqueCategories = [
  {
    name: "Tous les produits",
    href: "/shop",
    description: "Voir tous nos produits dentaires"
  },
  {
    name: "Équipements",
    href: "/shop?category=equipment",
    description: "Matériel professionnel"
  },
  {
    name: "Consommables",
    href: "/shop?category=consumables", 
    description: "Produits d'usage quotidien"
  },
  {
    name: "Instruments",
    href: "/shop?category=instruments",
    description: "Outils spécialisés"
  },
  {
    name: "Protection",
    href: "/shop?category=protection",
    description: "Équipements de sécurité"
  }
]

export function Header() {
  const { isCartOpen, openCart, closeCart } = useCart()
  const router = useRouter()
  const pathname = usePathname()

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
            {/* Hamburger Menu - Mobile Only */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  aria-label="Open shop categories"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl hover:bg-gray-100 transition-colors duration-200 lg:hidden"
                >
                  <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mt-2 ml-2 w-64 rounded-2xl shadow-lg bg-white border border-gray-200 p-2">
                {boutiqueCategories.map((category) => (
                  <DropdownMenuItem 
                    key={category.name}
                    className="flex flex-col items-start cursor-pointer px-4 py-3 rounded-xl hover:bg-blue-50 text-sm transition-colors duration-200"
                    onClick={() => router.push(category.href)}
                  >
                    <span className="font-medium text-gray-900">{category.name}</span>
                    <span className="text-xs text-gray-500">{category.description}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Logo/Brand */}
            <div 
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => router.push('/')}
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-xs sm:text-sm">AB</span>
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-bold text-gray-900">Dentaire</span>
                <span className="text-xs text-gray-500 hidden sm:block">Excellence & Innovation</span>
              </div>
            </div>
          </div>

          {/* Center: Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              
              // Special handling for Shop button on desktop
              if (item.name === "Shop") {
                return (
                  <DropdownMenu key={item.name}>
                    <DropdownMenuTrigger asChild>
                      <button
                        className={cn(
                          "flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200",
                          isActive 
                            ? "text-blue-600 bg-blue-50" 
                            : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                        )}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="font-medium">{item.name}</span>
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mt-2 w-64 rounded-2xl shadow-lg bg-white border border-gray-200 p-2">
                      {boutiqueCategories.map((category) => (
                        <DropdownMenuItem 
                          key={category.name}
                          className="flex flex-col items-start cursor-pointer px-4 py-3 rounded-xl hover:bg-blue-50 text-sm transition-colors duration-200"
                          onClick={() => router.push(category.href)}
                        >
                          <span className="font-medium text-gray-900">{category.name}</span>
                          <span className="text-xs text-gray-500">{category.description}</span>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                )
              }
              
              // Regular navigation items
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
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{item.name}</span>
                </button>
              )
            })}
          </div>

          {/* Right: Cart */}
          <div className="flex items-center">
            {/* Cart Drawer */}
            <Drawer open={isCartOpen} onOpenChange={(open: boolean) => open ? openCart() : closeCart()} direction="right">
              <DrawerTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  aria-label="Open cart"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl hover:bg-gray-100 transition-colors duration-200 relative"
                  onClick={openCart}
                >
                  <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </DrawerTrigger>
              <DrawerContent className="fixed top-0 right-0 h-full w-80 sm:w-96 bg-white shadow-2xl border-l border-gray-200 flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Panier</h2>
                    <p className="text-sm text-gray-500">{totalItems} article{totalItems !== 1 ? 's' : ''}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={closeCart}
                    className="w-10 h-10 rounded-xl hover:bg-gray-100 transition-colors duration-200"
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
                            <h4 className="text-sm font-semibold text-gray-900 truncate">{item.name}</h4>
                            <p className="text-sm text-gray-500 font-medium">{item.price.toLocaleString()} DA</p>
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
                      <span className="text-lg font-semibold text-gray-900">Total</span>
                      <span className="text-2xl font-bold text-blue-600">{totalPrice.toLocaleString()} DA</span>
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