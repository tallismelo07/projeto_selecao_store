import { Link } from 'react-router-dom'
import { getFeaturedProducts, getLendas, teamConfig, copaTimeline } from '../data/products'
import ProductCard from '../components/ProductCard'
import JerseyImage from '../components/JerseyImage'

const featuredProducts = getFeaturedProducts().slice(0, 8)
const lendas = getLendas().slice(0, 4)

const features = [
  { icon: '🏆', title: 'Produtos Oficiais', desc: 'Camisas licenciadas das maiores seleções' },
  { icon: '📼', title: 'Edições Retrô', desc: 'Copas históricas de 1994 a 2022' },
  { icon: '⭐', title: 'Lendas do Futebol', desc: 'Pelé, Maradona, Zidane e muito mais' },
  { icon: '🚚', title: 'Entrega Rápida', desc: 'Frete grátis acima de R$ 299' },
]

const featuredTeamIds = ['brasil', 'argentina', 'franca', 'portugal', 'espanha', 'alemanha', 'marrocos', 'japao']

const recentCopas = copaTimeline.slice(-4)

export default function Home() {
  return (
    <div>
      {/* ── Hero ── */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0a0a1a 0%, #0f1f0a 40%, #1a1a0a 70%, #0a0a1a 100%)' }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(0,176,75,0.15) 40px, rgba(0,176,75,0.15) 41px)` }} />
        </div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-10 -right-10 opacity-10 rotate-12 scale-150"><JerseyImage team="brasil" number={10} size={200} /></div>
          <div className="absolute -bottom-10 -left-10 opacity-10 -rotate-12 scale-150"><JerseyImage team="argentina" number={10} size={200} /></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center py-24">
          <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Copa do Mundo 2026 — EUA, Canadá e México
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
            Moderna, Retrô{' '}
            <span style={{ background: 'linear-gradient(135deg,#00B04B,#FFD700)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              ou Lenda
            </span>
            <br />
            você escolhe.
          </h1>

          <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
            Mais de 60 camisas cobrindo 40+ seleções, Copas de 1970 a 2022 e as maiores lendas da história do futebol.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/loja" className="w-full sm:w-auto px-8 py-4 bg-green-500 hover:bg-green-400 text-white font-black text-lg rounded-2xl transition-all active:scale-95 shadow-2xl shadow-green-500/30">
              🛍️ Explorar loja
            </Link>
            <Link to="/timeline" className="w-full sm:w-auto px-8 py-4 border-2 border-green-500/50 text-green-400 hover:bg-green-500/10 font-bold text-lg rounded-2xl transition-all">
              🏆 Linha do Tempo das Copas
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-14 max-w-lg mx-auto">
            {[['40+', 'Seleções'], ['60+', 'Produtos'], ['3', 'Tipos']].map(([v, l]) => (
              <div key={l} className="text-center">
                <p className="text-3xl font-black text-white">{v}</p>
                <p className="text-xs text-gray-400 font-medium mt-0.5">{l}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map(({ icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center text-center p-4 rounded-2xl hover:bg-green-50 transition-colors">
                <span className="text-3xl mb-2">{icon}</span>
                <p className="font-bold text-gray-800 text-sm">{title}</p>
                <p className="text-gray-500 text-xs mt-1 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tipo filter shortcuts ── */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { tipo: 'moderna', emoji: '🆕', title: 'Camisas Modernas', desc: 'Coleção 2024 com os astros atuais', color: 'from-green-600 to-emerald-700', to: '/loja?tipo=moderna' },
              { tipo: 'retro',   emoji: '📼', title: 'Edições Retrô',    desc: 'Copas históricas de 1994 a 2022',   color: 'from-amber-500 to-orange-600',  to: '/loja?tipo=retro'   },
              { tipo: 'lenda',   emoji: '⭐', title: 'Lendas do Futebol', desc: 'Pelé, Maradona, Zidane e outros', color: 'from-purple-700 to-purple-900',   to: '/loja?tipo=lenda'   },
            ].map(({ emoji, title, desc, color, to }) => (
              <Link
                key={to}
                to={to}
                className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${color} p-6 text-white hover:scale-[1.02] transition-all duration-300 shadow-md hover:shadow-xl`}
              >
                <span className="text-4xl block mb-3">{emoji}</span>
                <h3 className="font-black text-xl mb-1">{title}</h3>
                <p className="text-white/80 text-sm">{desc}</p>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured products ── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-green-500 font-semibold text-sm uppercase tracking-wider">🔥 Mais Vendidos</span>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-1">Produtos em Destaque</h2>
            </div>
            <Link to="/loja" className="text-green-600 hover:text-green-700 font-semibold text-sm inline-flex items-center gap-1 whitespace-nowrap">
              Ver tudo <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {featuredProducts.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ── Lendas showcase ── */}
      <section className="py-16" style={{ background: 'linear-gradient(135deg, #1a0030 0%, #2d0050 50%, #1a0030 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="text-purple-400 font-semibold text-sm uppercase tracking-wider">⭐ Imortais do Futebol</span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-2 mb-3">Lendas das Copas</h2>
            <p className="text-purple-200/70 max-w-xl mx-auto">
              Reviva os momentos mais épicos da história através das camisas dos maiores jogadores que já existiram.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
            {lendas.map((product) => {
              const config = teamConfig[product.team]
              return (
                <Link
                  key={product.id}
                  to={`/produto/${product.id}`}
                  className="group bg-white/10 hover:bg-white/20 border border-white/10 hover:border-purple-400/50 rounded-2xl p-5 flex flex-col items-center text-center transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${config?.bgCard} flex items-center justify-center mb-4`}>
                    <JerseyImage team={product.team} number={product.number} size={60} />
                  </div>
                  <p className="text-white font-black text-lg leading-tight">{product.player}</p>
                  <p className="text-purple-300 text-sm font-medium mt-0.5">
                    {config?.flag} {config?.name} · {product.ano}
                  </p>
                  <p className="text-purple-200/60 text-xs mt-2 leading-relaxed line-clamp-2">{product.historia?.slice(0, 80)}...</p>
                  <p className="text-white font-black text-lg mt-3">R$ {product.price.toFixed(2).replace('.', ',')}</p>
                </Link>
              )
            })}
          </div>

          <div className="text-center">
            <Link to="/loja?tipo=lenda" className="inline-flex items-center gap-2 px-8 py-3.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-2xl transition-all active:scale-95 shadow-lg shadow-purple-900/50">
              ⭐ Ver todas as Lendas
            </Link>
          </div>
        </div>
      </section>

      {/* ── Copa do Mundo Timeline strip ── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-green-500 font-semibold text-sm uppercase tracking-wider">🏆 História do Futebol</span>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-1">Copas do Mundo</h2>
              <p className="text-gray-500 mt-2">Explore as camisas de cada era histórica</p>
            </div>
            <Link to="/timeline" className="text-green-600 hover:text-green-700 font-semibold text-sm inline-flex items-center gap-1 whitespace-nowrap">
              Linha do tempo completa
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentCopas.map((copa) => (
              <Link
                key={copa.year}
                to={`/loja?ano=${copa.year}`}
                className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${copa.color} text-white p-5 hover:scale-[1.02] transition-all duration-300 shadow-md hover:shadow-xl`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-black text-3xl">{copa.year}</span>
                  <span className="text-3xl">{copa.championFlag}</span>
                </div>
                <p className="text-sm text-white/80 mb-1">{copa.host}</p>
                <p className="font-bold text-lg">{copa.champion}</p>
                <p className="text-white/70 text-xs mt-1">{copa.score}</p>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs font-semibold bg-white/20 px-2 py-1 rounded-lg">Ver camisas →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured teams ── */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">Seleções em Destaque</h2>
            <p className="text-gray-500 max-w-xl mx-auto">De 4 continentes, as maiores seleções do mundo</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {featuredTeamIds.map((teamId) => {
              const config = teamConfig[teamId]
              return (
                <Link
                  key={teamId}
                  to={`/loja?seleção=${teamId}`}
                  className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${config.bgGradient} p-4 flex flex-col items-center gap-2 hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-lg`}
                >
                  <span className="text-3xl">{config.flag}</span>
                  <p className="text-white font-bold text-xs text-center leading-tight">{config.name}</p>
                </Link>
              )
            })}
          </div>
          <div className="text-center mt-6">
            <Link to="/loja" className="text-green-600 hover:text-green-700 font-semibold text-sm inline-flex items-center gap-1">
              Ver todas as 40+ seleções
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-16 sm:py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg,#009C3B 0%,#00B04B 50%,#15803d 100%)' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `repeating-linear-gradient(-45deg,transparent,transparent 30px,rgba(255,255,255,.3) 30px,rgba(255,255,255,.3) 31px)` }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-5xl sm:text-6xl">🏆</span>
          <h2 className="text-3xl sm:text-5xl font-black text-white mt-4 mb-4 leading-tight">Copa do Mundo 2026</h2>
          <p className="text-green-100 text-lg sm:text-xl max-w-xl mx-auto mb-8">
            Três países-sede. Quarenta e oito seleções. Garanta já a camisa do seu time favorito.
          </p>
          <Link to="/loja" className="inline-block px-10 py-4 bg-white text-green-700 font-black text-lg rounded-2xl hover:bg-green-50 transition-all active:scale-95 shadow-2xl">
            Garantir minha camisa
          </Link>
        </div>
      </section>
    </div>
  )
}
