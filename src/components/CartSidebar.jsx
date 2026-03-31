import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { teamConfig } from '../data/products'
import JerseyImage from './JerseyImage'

export default function CartSidebar() {
  const { items, isOpen, setIsOpen, removeItem, updateQty, totalItems, totalPrice } = useCart()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 animate-fade-in"
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <div className="fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 flex flex-col shadow-2xl animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100" style={{ backgroundColor: '#0a0a1a' }}>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h2 className="font-bold text-white text-lg">Carrinho</h2>
            {totalItems > 0 && (
              <span className="bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 p-8 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-4xl">
                🛒
              </div>
              <div>
                <p className="font-semibold text-gray-700 text-lg">Carrinho vazio</p>
                <p className="text-gray-400 text-sm mt-1">Adicione camisas incríveis ao seu carrinho!</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="btn-primary text-sm"
              >
                Explorar loja
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {items.map((item) => {
                const config = teamConfig[item.team]
                return (
                  <li key={`${item.id}-${item.size}`} className="px-4 py-4 flex gap-3">
                    {/* Jersey */}
                    <div
                      className={`flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center bg-gradient-to-br ${config.bgCard}`}
                    >
                      <JerseyImage team={item.team} number={item.number} size={48} />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-semibold text-gray-900 text-sm leading-tight truncate">
                            {item.player}
                          </p>
                          <p className="text-xs text-gray-500">
                            {config.flag} {config.name} · #{item.number} · Tam. {item.size}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id, item.size)}
                          className="flex-shrink-0 text-gray-300 hover:text-red-500 transition-colors p-0.5"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        {/* Quantity */}
                        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() => updateQty(item.id, item.size, item.qty - 1)}
                            className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors text-lg font-bold"
                          >
                            −
                          </button>
                          <span className="w-7 text-center text-sm font-semibold text-gray-800">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => updateQty(item.id, item.size, item.qty + 1)}
                            className="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors text-lg font-bold"
                          >
                            +
                          </button>
                        </div>

                        <p className="font-bold text-gray-900 text-sm">
                          R$ {(item.price * item.qty).toFixed(2).replace('.', ',')}
                        </p>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 p-5 space-y-3">
            {/* Shipping notice */}
            {totalPrice < 299 && (
              <div className="flex items-center gap-2 bg-amber-50 text-amber-700 text-xs px-3 py-2 rounded-lg">
                <span>🚚</span>
                <span>
                  Falta <strong>R$ {(299 - totalPrice).toFixed(2).replace('.', ',')}</strong> para frete grátis!
                </span>
              </div>
            )}
            {totalPrice >= 299 && (
              <div className="flex items-center gap-2 bg-green-50 text-green-700 text-xs px-3 py-2 rounded-lg">
                <span>✅</span>
                <span><strong>Frete grátis</strong> incluso no seu pedido!</span>
              </div>
            )}

            {/* Total */}
            <div className="flex items-center justify-between">
              <span className="text-gray-600 font-medium">Total</span>
              <div className="text-right">
                <p className="font-black text-xl text-gray-900">
                  R$ {totalPrice.toFixed(2).replace('.', ',')}
                </p>
                <p className="text-xs text-gray-400">
                  {totalItems} {totalItems === 1 ? 'item' : 'itens'}
                </p>
              </div>
            </div>

            {/* CTA */}
            <Link
              to="/checkout"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center bg-green-500 hover:bg-green-600 active:scale-95 text-white font-bold py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-green-500/30"
            >
              Finalizar Compra
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="block w-full text-center text-gray-500 hover:text-gray-700 text-sm font-medium py-1 transition-colors"
            >
              Continuar comprando
            </button>
          </div>
        )}
      </div>
    </>
  )
}
