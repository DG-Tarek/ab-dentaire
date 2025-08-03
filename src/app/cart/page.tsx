"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/components/cart-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag, CreditCard } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import { useCurrency } from '@/components/currency-context'

export default function CartPage() {
  const router = useRouter()
  const { selectedCurrency } = useCurrency()
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getCartItemCount, 
    getCartTotal 
  } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    updateQuantity(itemId, newQuantity)
  }

  const handleRemoveItem = (itemId: string) => {
    removeFromCart(itemId)
  }

  const handleClearCart = () => {
    if (confirm('Êtes-vous sûr de vouloir vider votre panier ?')) {
      clearCart()
    }
  }

  const handleCheckout = () => {
    setIsCheckingOut(true)
    // Simulate checkout process
    setTimeout(() => {
      alert('Fonctionnalité de paiement à implémenter')
      setIsCheckingOut(false)
    }, 2000)
  }

  const cartItemCount = getCartItemCount()
  const cartTotal = getCartTotal()

  if (cartItemCount === 0) {
    return (
      <div className="min-h-screen pattern-overlay">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14 sm:h-16">
              <Button
                variant="ghost"
                onClick={() => router.push("/shop")}
                className="flex items-center gap-2 h-10 sm:h-12 px-3 sm:px-4"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base font-medium">Retour</span>
              </Button>
              
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">Panier</h1>
              
              <div className="w-10 h-10 sm:w-12 sm:h-12"></div> {/* Spacer */}
            </div>
          </div>
        </header>

        {/* Empty Cart */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Votre panier est vide</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Ajoutez des produits et services dentaires à votre panier pour commencer vos achats.
            </p>
            <Button 
              onClick={() => router.push("/shop")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
            >
              Découvrir nos services
            </Button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen pattern-overlay">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <Button
              variant="ghost"
              onClick={() => router.push("/shop")}
              className="flex items-center gap-2 h-10 sm:h-12 px-3 sm:px-4"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base font-medium">Retour</span>
            </Button>
            
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">Panier ({cartItemCount})</h1>
            
            <Button
              variant="ghost"
              onClick={handleClearCart}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              Vider
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <Card key={item.itemId} className="overflow-hidden">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start gap-4">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-sm sm:text-base font-semibold text-gray-900 line-clamp-2">
                            {item.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-500 mt-1">
                            Réf: {item.ref}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="secondary" className="text-xs">
                              {formatPrice(item.price, selectedCurrency)}
                            </Badge>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <Button
                          variant="ghost"
                          onClick={() => handleRemoveItem(item.itemId)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 ml-2 w-8 h-8 p-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-gray-200 rounded-lg">
                          <Button
                            variant="ghost"
                            onClick={() => handleQuantityChange(item.itemId, item.quantity - 1)}
                            className="w-8 h-8 text-gray-600 hover:bg-gray-50 p-0"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="px-3 py-1 text-sm font-medium text-gray-900 min-w-[40px] text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            onClick={() => handleQuantityChange(item.itemId, item.quantity + 1)}
                            className="w-8 h-8 text-gray-600 hover:bg-gray-50 p-0"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>

                        <div className="text-right">
                          <p className="text-sm sm:text-base font-semibold text-gray-900">
                            {formatPrice(item.subtotal, selectedCurrency)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Résumé de la commande</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Cart Items Summary */}
                <div className="space-y-2">
                  {cart.items.map((item) => (
                    <div key={item.itemId} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {item.name} × {item.quantity}
                      </span>
                      <span className="font-medium">
                        {formatPrice(item.subtotal, selectedCurrency)}
                      </span>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Total */}
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Total</span>
                  <span className="text-xl font-bold text-blue-600">
                    {formatPrice(cartTotal, selectedCurrency)}
                  </span>
                </div>

                {/* Checkout Button */}
                <Button
                  onClick={handleCheckout}
                  disabled={isCheckingOut || cartItemCount === 0}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                >
                  {isCheckingOut ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Traitement...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      Procéder au paiement
                    </div>
                  )}
                </Button>

                {/* Cart Info */}
                <div className="text-xs text-gray-500 text-center">
                  <p>Votre panier est sauvegardé localement</p>
                  <p>Vous pouvez fermer cette page et revenir plus tard</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
} 