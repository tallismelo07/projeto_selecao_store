import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useFavorites } from '../context/FavoritesContext'
import { useToast } from '../context/ToastContext'
import { teamConfig } from '../data/products'
import JerseyImage from './JerseyImage'

export default function ProductCard({ product, loading = false }) {
  const { addItem, setIsOpen } = useCart()
  const { toggleFavorite, isFavorite } = useFavorites()
  const { addToast } = useToast()

  if (loading) {
    return (
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
        <div className="h-56 bg-gray-200" />
        <div className="p-4 space-y-3">
          <div className="h-3 bg-gray-200 rounded w-1/3" />
          <div className="h-5 bg-gray-200 rounded w-2/3" />
          <div className="h-4 bg-gray-200 rounded w-1/4" />
          <div className="h-10 bg-gray-200 rounded-xl" />
        </div>
      </div>
    )
  }

  const { id, team, player, number, price, oldPrice, tags } = product
  const config = teamConfig[team]
  const favorited = isFavorite(id)

  const handleAddToCart = (e) => {
    e.preventDefault()
    addItem(product, 'M')
    addToast({ message: `${player} adicionado ao carrinho! 🛒`, type: 'success' })
  }

  const handleFavorite = (e) => {
    e.preventDefault()
    toggleFavorite(id)
    addToast({
      message: favorited ? 'Removido dos favoritos' : `${player} adicionado aos favoritos ❤️`,
      type: favorited ? 'info' : 'success',
    })
  }

  return (
    <Link
      to={`/produto/${id}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
    >
      {/* Image area */}
      <div
        className={`relative flex items-center justify-center py-6 bg-gradient-to-br ${config.bgCard}`}
        style={{ minHeight: '200px' }}
      >
        {/* Tags */}
        {tags?.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-wrap gap-1">
            {tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-xs font-bold px-2 py-0.5 rounded-full bg-white/90 text-gray-800 shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Favorite button */}
        <button
          onClick={handleFavorite}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 ${
            favorited
              ? 'bg-red-500 text-white shadow-md'
              : 'bg-white/80 text-gray-400 hover:bg-red-50 hover:text-red-500'
          }`}
          aria-label={favorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <svg className="w-4 h-4" fill={favorited ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {/* Jersey SVG */}
        <div className="transition-transform duration-300 group-hover:scale-105">
          <JerseyImage team={team} number={number} size={140} />
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        {/* Team */}
        <div className="flex items-center gap-1.5">
          <span className="text-lg leading-none">{config.flag}</span>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            {config.name}
          </span>
        </div>

        {/* Player */}
        <h3 className="font-bold text-gray-900 text-base leading-tight">
          {player}
          <span className="text-gray-400 font-normal ml-1.5">#{number}</span>
        </h3>

        {/* Price + Cart */}
        <div className="flex items-center justify-between mt-auto pt-2">
          <div>
            {oldPrice && (
              <p className="text-xs text-gray-400 line-through">
                R$ {oldPrice.toFixed(2).replace('.', ',')}
              </p>
            )}
            <p className="font-black text-lg text-gray-900">
              R$ <span>{price.toFixed(2).replace('.', ',')}</span>
            </p>
          </div>

          <button
            onClick={handleAddToCart}
            className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 active:scale-95 text-white text-sm font-semibold px-3 py-2 rounded-xl transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="hidden sm:inline">Adicionar</span>
          </button>
        </div>
      </div>
    </Link>
  )
}
