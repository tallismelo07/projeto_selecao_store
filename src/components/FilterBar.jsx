import { useState } from 'react'
import { allTeams, continentes, tipoConfig, allYears } from '../data/products'

const TIPOS = [
  { id: '', label: 'Todos', emoji: '🌐' },
  { id: 'moderna', label: 'Moderna', emoji: '🆕' },
  { id: 'retro', label: 'Retrô', emoji: '📼' },
  { id: 'lenda', label: 'Lenda', emoji: '⭐' },
]

export default function FilterBar({ filters, setFilters, totalCount }) {
  const [advancedOpen, setAdvancedOpen] = useState(false)
  const { search, team, tipo, ano, continente, sort } = filters

  const hasAdvanced = team || tipo || ano || continente
  const hasAny = hasAdvanced || search || sort !== 'default'

  const set = (key, val) =>
    setFilters((f) => ({ ...f, [key]: f[key] === val ? '' : val }))

  const clearAll = () =>
    setFilters({ search: '', team: '', tipo: '', ano: '', continente: '', sort: 'default' })

  const teamsForContinent = continente
    ? allTeams.filter((t) => t.continente === continente)
    : allTeams

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      {/* ── Top row: search + sort ── */}
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
            placeholder="Buscar jogador, seleção, ano..."
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={sort}
            onChange={(e) => setFilters((f) => ({ ...f, sort: e.target.value }))}
            className="flex-1 sm:w-44 px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-green-400 bg-white"
          >
            <option value="default">Ordenar por</option>
            <option value="price_asc">Menor preço</option>
            <option value="price_desc">Maior preço</option>
            <option value="name_asc">Nome A-Z</option>
            <option value="year_desc">Mais recente</option>
            <option value="year_asc">Mais antigo</option>
            <option value="featured">Destaques</option>
          </select>
          <button
            onClick={() => setAdvancedOpen((v) => !v)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${
              hasAdvanced
                ? 'bg-green-500 text-white border-green-500'
                : advancedOpen
                ? 'border-green-400 text-green-600 bg-green-50'
                : 'border-gray-200 text-gray-600 hover:border-green-300'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            <span className="hidden sm:inline">Filtros</span>
            {hasAdvanced && (
              <span className="bg-white text-green-600 text-xs font-black rounded-full w-4 h-4 flex items-center justify-center leading-none">
                {[team, tipo, ano, continente].filter(Boolean).length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ── Advanced filters panel ── */}
      {advancedOpen && (
        <div className="border-t border-gray-100 px-4 sm:px-5 pb-5 pt-4 space-y-5 animate-fade-in">

          {/* Tipo */}
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5">Tipo de camisa</p>
            <div className="flex flex-wrap gap-2">
              {TIPOS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setFilters((f) => ({ ...f, tipo: f.tipo === t.id ? '' : t.id }))}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold border-2 transition-all ${
                    tipo === t.id
                      ? t.id === 'lenda'
                        ? 'bg-purple-600 text-white border-purple-600'
                        : t.id === 'retro'
                        ? 'bg-amber-500 text-white border-amber-500'
                        : t.id === 'moderna'
                        ? 'bg-green-500 text-white border-green-500'
                        : 'bg-gray-700 text-white border-gray-700'
                      : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span>{t.emoji}</span>
                  <span>{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Continente */}
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5">Continente</p>
            <div className="flex flex-wrap gap-2">
              {continentes.map((c) => (
                <button
                  key={c.id}
                  onClick={() => {
                    const next = continente === c.id ? '' : c.id
                    setFilters((f) => ({ ...f, continente: next, team: '' }))
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border-2 transition-all ${
                    continente === c.id
                      ? 'bg-green-500 text-white border-green-500'
                      : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-green-300 hover:bg-green-50'
                  }`}
                >
                  <span>{c.emoji}</span>
                  <span>{c.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Seleção */}
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5">
              Seleção
              {continente && (
                <span className="ml-2 normal-case font-normal text-gray-400">
                  ({teamsForContinent.length} disponíveis)
                </span>
              )}
            </p>
            <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1">
              {teamsForContinent.map((t) => (
                <button
                  key={t.id}
                  onClick={() => set('team', t.id)}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border-2 transition-all ${
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

          {/* Ano da Copa */}
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5">Ano da Copa</p>
            <div className="flex flex-wrap gap-2">
              {allYears.filter((y) => y < 2024).map((y) => (
                <button
                  key={y}
                  onClick={() => set('ano', y)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border-2 transition-all ${
                    ano === y
                      ? 'bg-green-500 text-white border-green-500'
                      : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-green-300'
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Bottom bar: count + clear ── */}
      <div className={`flex items-center justify-between px-4 sm:px-5 py-3 ${advancedOpen ? '' : 'border-t border-gray-100'} bg-gray-50`}>
        <p className="text-sm text-gray-500">
          <span className="font-bold text-gray-800">{totalCount}</span>{' '}
          {totalCount === 1 ? 'produto encontrado' : 'produtos encontrados'}
        </p>
        {hasAny && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1 text-xs font-semibold text-red-500 hover:text-red-700 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Limpar tudo
          </button>
        )}
      </div>
    </div>
  )
}
