import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
import FilterBar from '../components/FilterBar'

const PRODUCTS_PER_PAGE = 12

function applyFilters(list, { search, team, sort }) {
  let result = [...list]

  if (team) {
    result = result.filter((p) => p.team === team)
  }

  if (search) {
    const q = search.toLowerCase()
    result = result.filter(
      (p) =>
        p.player.toLowerCase().includes(q) ||
        p.team.toLowerCase().includes(q) ||
        String(p.number).includes(q),
    )
  }

  switch (sort) {
    case 'price_asc':
      result.sort((a, b) => a.price - b.price)
      break
    case 'price_desc':
      result.sort((a, b) => b.price - a.price)
      break
    case 'name_asc':
      result.sort((a, b) => a.player.localeCompare(b.player))
      break
    case 'featured':
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
      break
    default:
      break
  }

  return result
}

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [page, setPage] = useState(1)

  const [filters, setFilters] = useState({
    search: searchParams.get('busca') || '',
    team: searchParams.get('seleção') || '',
    sort: 'default',
  })

  // Keep URL params in sync
  useEffect(() => {
    const busca = searchParams.get('busca') || ''
    const seleção = searchParams.get('seleção') || ''
    if (busca !== filters.search || seleção !== filters.team) {
      setFilters((f) => ({ ...f, search: busca, team: seleção }))
    }
  }, [searchParams])

  // Reset page on filter change
  useEffect(() => {
    setPage(1)
  }, [filters])

  const filtered = useMemo(() => applyFilters(products, filters), [filters])

  const totalPages = Math.ceil(filtered.length / PRODUCTS_PER_PAGE)
  const paginated = filtered.slice((page - 1) * PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE)

  const [isLoading, setIsLoading] = useState(false)

  const handleFiltersChange = (updater) => {
    setFilters(updater)
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 300)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">Loja de Camisas</h1>
        <p className="text-gray-500">
          As melhores camisas das seleções mais icônicas do futebol mundial
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <FilterBar
          filters={filters}
          setFilters={handleFiltersChange}
          totalCount={filtered.length}
        />
      </div>

      {/* Products grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCard key={i} loading />
          ))}
        </div>
      ) : paginated.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {paginated.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:border-green-400 hover:text-green-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                ← Anterior
              </button>

              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={`w-9 h-9 rounded-xl text-sm font-bold transition-colors ${
                      n === page
                        ? 'bg-green-500 text-white shadow-sm'
                        : 'border border-gray-200 text-gray-600 hover:border-green-400 hover:text-green-600'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:border-green-400 hover:text-green-600 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Próxima →
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="py-20 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">Nenhum produto encontrado</h3>
          <p className="text-gray-400 mb-6">
            Tente ajustar os filtros ou buscar por outro jogador ou seleção
          </p>
          <button
            onClick={() => handleFiltersChange(() => ({ search: '', team: '', sort: 'default' }))}
            className="btn-primary"
          >
            Limpar filtros
          </button>
        </div>
      )}
    </div>
  )
}
