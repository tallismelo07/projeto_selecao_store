import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { products, teamConfig, tipoConfig } from '../data/products'
import ProductCard from '../components/ProductCard'
import FilterBar from '../components/FilterBar'

const PER_PAGE = 12

function applyFilters(list, { search, team, tipo, ano, continente, sort }) {
  let r = [...list]

  if (team)      r = r.filter((p) => p.team === team)
  if (tipo)      r = r.filter((p) => p.tipo === tipo)
  if (ano)       r = r.filter((p) => p.ano === Number(ano))
  if (continente) {
    r = r.filter((p) => teamConfig[p.team]?.continente === continente)
  }
  if (search) {
    const q = search.toLowerCase()
    r = r.filter(
      (p) =>
        p.player.toLowerCase().includes(q) ||
        p.team.toLowerCase().includes(q) ||
        String(p.ano).includes(q) ||
        (p.tipo ?? '').includes(q),
    )
  }

  switch (sort) {
    case 'price_asc':  r.sort((a, b) => a.price - b.price); break
    case 'price_desc': r.sort((a, b) => b.price - a.price); break
    case 'name_asc':   r.sort((a, b) => a.player.localeCompare(b.player)); break
    case 'year_desc':  r.sort((a, b) => b.ano - a.ano); break
    case 'year_asc':   r.sort((a, b) => a.ano - b.ano); break
    case 'featured':   r.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)); break
    default: break
  }
  return r
}

const TIPO_LABELS = { moderna: '🆕 Moderna', retro: '📼 Retrô', lenda: '⭐ Lenda' }

export default function Shop() {
  const [searchParams] = useSearchParams()
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const [filters, setFilters] = useState({
    search:     searchParams.get('busca')    ?? '',
    team:       searchParams.get('seleção')  ?? '',
    tipo:       searchParams.get('tipo')     ?? '',
    ano:        searchParams.get('ano')      ?? '',
    continente: searchParams.get('continente') ?? '',
    sort: 'default',
  })

  // Sync URL → filters on mount / URL change
  useEffect(() => {
    setFilters((f) => ({
      ...f,
      search:     searchParams.get('busca')      ?? f.search,
      team:       searchParams.get('seleção')    ?? f.team,
      tipo:       searchParams.get('tipo')       ?? f.tipo,
      ano:        searchParams.get('ano')        ?? f.ano,
      continente: searchParams.get('continente') ?? f.continente,
    }))
  }, [searchParams.toString()])

  useEffect(() => { setPage(1) }, [filters])

  const filtered = useMemo(() => applyFilters(products, filters), [filters])
  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const handleFilters = (updater) => {
    setFilters(updater)
    setLoading(true)
    setTimeout(() => setLoading(false), 250)
  }

  // Active filter tags for display
  const activeTags = [
    filters.tipo       && { key: 'tipo',       label: TIPO_LABELS[filters.tipo] ?? filters.tipo },
    filters.ano        && { key: 'ano',        label: `Copa ${filters.ano}` },
    filters.continente && { key: 'continente', label: filters.continente.replace('_', ' ') },
    filters.team       && { key: 'team',       label: filters.team },
  ].filter(Boolean)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">Loja de Camisas</h1>
        <p className="text-gray-500">Modernas, Retrô e Lendas — as maiores seleções do mundo</p>
      </div>

      {/* Active filter tags */}
      {activeTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {activeTags.map(({ key, label }) => (
            <span
              key={key}
              className="flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full"
            >
              {label}
              <button
                onClick={() => handleFilters((f) => ({ ...f, [key]: '' }))}
                className="text-green-500 hover:text-green-800 transition-colors"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="mb-6">
        <FilterBar filters={filters} setFilters={handleFilters} totalCount={filtered.length} />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {Array.from({ length: 8 }).map((_, i) => <ProductCard key={i} loading />)}
        </div>
      ) : paginated.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {paginated.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>

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
          <p className="text-gray-400 mb-6">Ajuste os filtros ou busque por outro jogador, seleção ou ano</p>
          <button
            onClick={() => handleFilters(() => ({ search: '', team: '', tipo: '', ano: '', continente: '', sort: 'default' }))}
            className="btn-primary"
          >
            Limpar filtros
          </button>
        </div>
      )}
    </div>
  )
}
