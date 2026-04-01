import { Link } from 'react-router-dom'
import { copaTimeline, products, teamConfig } from '../data/products'
import JerseyImage from '../components/JerseyImage'

function CopaCard({ copa, index }) {
  const isLeft = index % 2 === 0
  const retroProducts = products.filter((p) => p.ano === copa.year && p.tipo !== 'moderna').slice(0, 3)

  return (
    <div className={`relative flex items-start gap-6 ${isLeft ? 'flex-row' : 'flex-row-reverse'} mb-12`}>
      {/* Year bubble — center column on md+ */}
      <div className="hidden md:flex flex-col items-center flex-shrink-0" style={{ width: 80 }}>
        <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${copa.color} flex items-center justify-center shadow-lg z-10`}>
          <span className="text-white font-black text-sm">{copa.year}</span>
        </div>
        <div className="w-0.5 bg-gray-200 flex-1 mt-1" style={{ minHeight: 40 }} />
      </div>

      {/* Content card */}
      <div className="flex-1 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
        {/* Header */}
        <div className={`bg-gradient-to-br ${copa.color} p-5 text-white`}>
          <div className="flex items-center justify-between mb-2">
            <div className="md:hidden flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-black text-sm">
                {copa.year}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-3xl">{copa.championFlag}</span>
              <div>
                <p className="font-black text-xl leading-none">{copa.champion}</p>
                <p className="text-white/80 text-sm">Campeão</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-sm">{copa.score}</p>
              <p className="text-white/70 text-xs">Final</p>
            </div>
          </div>
          <p className="text-white/80 text-sm">{copa.host}</p>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          <p className="text-gray-700 text-sm leading-relaxed">{copa.highlight}</p>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
            <p className="text-xs font-bold text-amber-700 mb-1">💡 Curiosidade</p>
            <p className="text-amber-800 text-xs leading-relaxed">{copa.curiosidade}</p>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span><strong>Artilheiro:</strong> {copa.topScorer}</span>
          </div>

          {/* Shirts from that year */}
          {retroProducts.length > 0 && (
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5">
                Camisas desta Copa
              </p>
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                {retroProducts.map((p) => {
                  const config = teamConfig[p.team]
                  return (
                    <Link
                      key={p.id}
                      to={`/produto/${p.id}`}
                      className={`flex-shrink-0 flex flex-col items-center bg-gradient-to-br ${config?.bgCard} rounded-xl p-2.5 hover:scale-105 transition-transform w-20`}
                    >
                      <JerseyImage team={p.team} number={p.number} size={48} />
                      <p className="text-xs font-semibold text-gray-700 text-center leading-tight mt-1 truncate w-full text-center">
                        {p.player.split(' ')[0]}
                      </p>
                    </Link>
                  )
                })}
                <Link
                  to={`/loja?ano=${copa.year}`}
                  className="flex-shrink-0 w-20 flex flex-col items-center justify-center bg-green-50 border-2 border-dashed border-green-300 rounded-xl p-2.5 hover:bg-green-100 transition-colors"
                >
                  <span className="text-green-500 text-xl">+</span>
                  <p className="text-xs font-semibold text-green-600 text-center leading-tight mt-1">Ver todas</p>
                </Link>
              </div>
            </div>
          )}

          <Link
            to={`/loja?ano=${copa.year}`}
            className="block w-full text-center text-sm font-semibold text-green-600 hover:text-green-700 py-2 border border-green-200 hover:border-green-400 rounded-xl transition-colors"
          >
            Ver todas as camisas de {copa.year} →
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function Timeline() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="text-green-500 font-semibold text-sm uppercase tracking-wider">⚽ História do Futebol</span>
        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mt-2 mb-4">
          Linha do Tempo das Copas
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto text-lg">
          De 1994 a 2022 — os momentos mais épicos do futebol mundial,
          contados através das camisas dos jogadores que fizeram história.
        </p>
      </div>

      {/* Next Copa teaser */}
      <div
        className="rounded-2xl p-6 mb-12 text-white text-center overflow-hidden relative"
        style={{ background: 'linear-gradient(135deg,#009C3B 0%,#006847 50%,#002868 100%)' }}
      >
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `repeating-linear-gradient(45deg,transparent,transparent 20px,rgba(255,255,255,.3) 20px,rgba(255,255,255,.3) 21px)` }} />
        <div className="relative">
          <div className="flex justify-center gap-3 text-4xl mb-3">🇺🇸🇨🇦🇲🇽</div>
          <p className="font-black text-3xl mb-1">Copa do Mundo 2026</p>
          <p className="text-white/80 mb-4">Estados Unidos · Canadá · México — 48 seleções, 104 jogos</p>
          <Link to="/loja?tipo=moderna" className="inline-block bg-white text-green-700 font-black px-6 py-2.5 rounded-xl hover:bg-green-50 transition-colors">
            🛍️ Ver camisas modernas
          </Link>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line — desktop */}
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gray-200" style={{ left: 40 }} />

        {[...copaTimeline].reverse().map((copa, i) => (
          <CopaCard key={copa.year} copa={copa} index={i} />
        ))}
      </div>

      {/* Before 1994 teaser */}
      <div className="mt-8 bg-gray-50 rounded-2xl p-6 text-center border-2 border-dashed border-gray-200">
        <span className="text-4xl">📼</span>
        <h3 className="font-black text-xl text-gray-800 mt-3 mb-2">Copas de 1970 a 1990</h3>
        <p className="text-gray-500 text-sm mb-4">Explore as camisas das lendas como Pelé (1970), Maradona (1986) e muito mais.</p>
        <Link to="/loja?tipo=lenda" className="inline-block btn-primary text-sm">
          ⭐ Ver camisas de lendas
        </Link>
      </div>
    </div>
  )
}
