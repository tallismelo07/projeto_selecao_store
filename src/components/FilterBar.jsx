import { allTeams } from '../data/products'

export default function FilterBar({ filters, setFilters, totalCount }) {
  const { search, team, sort } = filters

  const handleTeam = (teamId) => {
    setFilters((f) => ({ ...f, team: f.team === teamId ? '' : teamId }))
  }

  const handleSort = (e) => {
    setFilters((f) => ({ ...f, sort: e.target.value }))
  }

  const handleSearch = (e) => {
    setFilters((f) => ({ ...f, search: e.target.value }))
  }

  const clearAll = () => {
    setFilters({ search: '', team: '', sort: 'default' })
  }

  const hasFilters = search || team || sort !== 'default'

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-5 space-y-4">
      {/* Search + Sort row */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Buscar jogador, seleção..."
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all"
          />
        </div>

        <select
          value={sort}
          onChange={handleSort}
          className="sm:w-48 px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all bg-white"
        >
          <option value="default">Ordenar por</option>
          <option value="price_asc">Menor preço</option>
          <option value="price_desc">Maior preço</option>
          <option value="name_asc">Nome A-Z</option>
          <option value="featured">Destaques</option>
        </select>
      </div>

      {/* Team filters */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2.5">
          Filtrar por seleção
        </p>
        <div className="flex flex-wrap gap-2">
          {allTeams.map((t) => (
            <button
              key={t.id}
              onClick={() => handleTeam(t.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-200 ${
                team === t.id
                  ? 'bg-green-500 text-white border-green-500 shadow-sm'
                  : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-green-300 hover:bg-green-50'
              }`}
            >
              <span>{t.flag}</span>
              <span>{t.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Summary + Clear */}
      <div className="flex items-center justify-between pt-1">
        <p className="text-sm text-gray-500">
          <span className="font-semibold text-gray-800">{totalCount}</span>{' '}
          {totalCount === 1 ? 'produto encontrado' : 'produtos encontrados'}
        </p>
        {hasFilters && (
          <button
            onClick={clearAll}
            className="text-xs text-red-500 hover:text-red-700 font-semibold flex items-center gap-1 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Limpar filtros
          </button>
        )}
      </div>
    </div>
  )
}
