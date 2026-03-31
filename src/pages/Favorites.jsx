import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'

export default function Favorites() {
  const { favorites } = useFavorites()
  const favoriteProducts = products.filter((p) => favorites.includes(p.id))

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">
          ❤️ Meus Favoritos
        </h1>
        <p className="text-gray-500">
          {favoriteProducts.length === 0
            ? 'Nenhum produto favorito ainda'
            : `${favoriteProducts.length} ${favoriteProducts.length === 1 ? 'produto favoritado' : 'produtos favoritados'}`}
        </p>
      </div>

      {favoriteProducts.length === 0 ? (
        <div className="py-20 text-center">
          <div className="text-6xl mb-4">💔</div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">Nenhum favorito ainda</h3>
          <p className="text-gray-400 mb-6">
            Explore a loja e clique no ❤️ para salvar seus produtos favoritos!
          </p>
          <Link to="/loja" className="btn-primary inline-block">
            Explorar loja
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {favoriteProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
