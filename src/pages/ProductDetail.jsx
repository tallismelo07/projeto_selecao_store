import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getProductById, getRelatedProducts, teamConfig } from '../data/products'
import JerseyImage from '../components/JerseyImage'
import ProductCard from '../components/ProductCard'
import { useCart } from '../context/CartContext'
import { useFavorites } from '../context/FavoritesContext'
import { useToast } from '../context/ToastContext'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = getProductById(id)

  const { addItem, setIsOpen } = useCart()
  const { toggleFavorite, isFavorite } = useFavorites()
  const { addToast } = useToast()

  const [selectedSize, setSelectedSize] = useState('M')
  const [qty, setQty] = useState(1)

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Produto não encontrado</h2>
        <Link to="/loja" className="btn-primary">
          Voltar à loja
        </Link>
      </div>
    )
  }

  const { team, player, number, price, oldPrice, sizes, description, year, tags } = product
  const config = teamConfig[team]
  const favorited = isFavorite(product.id)
  const related = getRelatedProducts(product.id, team)
  const discount = oldPrice ? Math.round((1 - price / oldPrice) * 100) : null

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addItem(product, selectedSize)
    }
    addToast({ message: `${player} (${selectedSize}) adicionado ao carrinho! 🛒`, type: 'success' })
    setIsOpen(true)
  }

  const handleBuyNow = () => {
    for (let i = 0; i < qty; i++) {
      addItem(product, selectedSize)
    }
    navigate('/checkout')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-green-600 transition-colors">Início</Link>
        <span>›</span>
        <Link to="/loja" className="hover:text-green-600 transition-colors">Loja</Link>
        <span>›</span>
        <Link to={`/loja?seleção=${team}`} className="hover:text-green-600 transition-colors">
          {config.flag} {config.name}
        </Link>
        <span>›</span>
        <span className="text-gray-800 font-medium truncate">{player}</span>
      </nav>

      {/* Main product */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
        {/* Image */}
        <div
          className={`relative rounded-3xl overflow-hidden flex items-center justify-center py-12 bg-gradient-to-br ${config.bgCard} min-h-[350px]`}
        >
          {/* Discount badge */}
          {discount && (
            <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-black px-3 py-1.5 rounded-xl shadow">
              -{discount}%
            </div>
          )}

          {/* Favorite */}
          <button
            onClick={() => {
              toggleFavorite(product.id)
              addToast({
                message: favorited ? 'Removido dos favoritos' : `${player} adicionado aos favoritos ❤️`,
                type: favorited ? 'info' : 'success',
              })
            }}
            className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 shadow-md ${
              favorited
                ? 'bg-red-500 text-white'
                : 'bg-white text-gray-400 hover:text-red-500'
            }`}
          >
            <svg className="w-5 h-5" fill={favorited ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>

          <JerseyImage team={team} number={number} size={280} />

          {/* Tags */}
          {tags?.length > 0 && (
            <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span key={tag} className="text-xs font-bold px-2.5 py-1 bg-white/90 text-gray-800 rounded-full shadow-sm">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col">
          {/* Team */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">{config.flag}</span>
            <span className="font-semibold text-gray-600">{config.name}</span>
            <span className="text-gray-300">·</span>
            <span className="text-gray-500 text-sm">{year}</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-1">
            {player}
          </h1>
          <p className="text-gray-500 text-lg mb-4">Número {number}</p>

          {/* Price */}
          <div className="flex items-end gap-3 mb-6">
            <span className="text-4xl font-black text-gray-900">
              R$ {price.toFixed(2).replace('.', ',')}
            </span>
            {oldPrice && (
              <div>
                <p className="text-gray-400 line-through text-lg">
                  R$ {oldPrice.toFixed(2).replace('.', ',')}
                </p>
                <p className="text-green-600 text-sm font-semibold">
                  Economize R$ {(oldPrice - price).toFixed(2).replace('.', ',')}
                </p>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed mb-6">{description}</p>

          {/* Size selector */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2.5">
              <label className="font-semibold text-gray-800 text-sm">Tamanho</label>
              <button className="text-xs text-green-600 hover:text-green-700 font-medium">
                Guia de tamanhos
              </button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`w-12 h-12 rounded-xl text-sm font-bold border-2 transition-all duration-200 ${
                    selectedSize === s
                      ? 'bg-green-500 text-white border-green-500 shadow-md scale-105'
                      : 'border-gray-200 text-gray-700 hover:border-green-400 hover:text-green-600'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <label className="font-semibold text-gray-800 text-sm mb-2.5 block">Quantidade</label>
            <div className="flex items-center border-2 border-gray-200 rounded-xl w-fit">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-11 h-11 flex items-center justify-center text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors rounded-l-xl text-xl font-bold"
              >
                −
              </button>
              <span className="w-12 text-center font-bold text-gray-800 text-lg">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="w-11 h-11 flex items-center justify-center text-gray-600 hover:text-green-600 hover:bg-green-50 transition-colors rounded-r-xl text-xl font-bold"
              >
                +
              </button>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 active:scale-95 text-white font-bold py-4 rounded-2xl transition-all duration-200 shadow-lg shadow-green-500/30 text-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Adicionar ao carrinho
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 active:scale-95 text-white font-bold py-4 rounded-2xl transition-all duration-200 text-lg"
            >
              Comprar agora
            </button>
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-gray-100">
            {[
              { icon: '🔒', text: 'Compra segura' },
              { icon: '🚚', text: 'Entrega rápida' },
              { icon: '🔄', text: 'Troca em 30 dias' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex flex-col items-center text-center gap-1">
                <span className="text-xl">{icon}</span>
                <span className="text-xs text-gray-500 font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div>
          <h2 className="text-2xl font-black text-gray-900 mb-6">
            Mais de {config.flag} {config.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
