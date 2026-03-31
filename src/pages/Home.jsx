import { Link } from 'react-router-dom'
import { getFeaturedProducts, allTeams, teamConfig } from '../data/products'
import ProductCard from '../components/ProductCard'
import JerseyImage from '../components/JerseyImage'

const featuredProducts = getFeaturedProducts()

const features = [
  { icon: '🏆', title: 'Produtos Oficiais', desc: 'Camisas licenciadas das maiores seleções' },
  { icon: '🚚', title: 'Entrega Rápida', desc: 'Frete grátis acima de R$ 299' },
  { icon: '🔄', title: 'Troca Fácil', desc: 'Devolução em até 30 dias' },
  { icon: '🔒', title: 'Compra Segura', desc: 'Pagamento 100% protegido' },
]

const featuredTeams = ['brasil', 'argentina', 'franca', 'portugal', 'espanha', 'alemanha']

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0a0a1a 0%, #0f1f0a 40%, #1a1a0a 70%, #0a0a1a 100%)',
        }}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 40px,
                rgba(0, 176, 75, 0.15) 40px,
                rgba(0, 176, 75, 0.15) 41px
              )`,
            }}
          />
        </div>

        {/* Floating jersey decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-10 -right-10 opacity-10 rotate-12 scale-150">
            <JerseyImage team="brasil" number={10} size={200} />
          </div>
          <div className="absolute -bottom-10 -left-10 opacity-10 -rotate-12 scale-150">
            <JerseyImage team="argentina" number={10} size={200} />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center py-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Copa do Mundo 2026 — Coleção Oficial
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-tight mb-6">
            Veste a{' '}
            <span
              className="relative"
              style={{
                background: 'linear-gradient(135deg, #00B04B, #FFD700)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Seleção
            </span>
            <br />
            do seu coração
          </h1>

          <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
            Camisas oficiais das maiores seleções do mundo. Brasil, Argentina, França e muito mais.
            Qualidade premium, frete grátis acima de R$ 299.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/loja"
              className="w-full sm:w-auto px-8 py-4 bg-green-500 hover:bg-green-400 text-white font-black text-lg rounded-2xl transition-all duration-200 active:scale-95 shadow-2xl shadow-green-500/30 hover:shadow-green-400/50"
            >
              🛍️ Ver todas as camisas
            </Link>
            <Link
              to="/loja?seleção=brasil"
              className="w-full sm:w-auto px-8 py-4 border-2 border-green-500/50 text-green-400 hover:bg-green-500/10 font-bold text-lg rounded-2xl transition-all duration-200"
            >
              🇧🇷 Seleção Brasileira
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-14 max-w-lg mx-auto">
            {[
              { value: '12+', label: 'Seleções' },
              { value: '24+', label: 'Produtos' },
              { value: '5★', label: 'Avaliação' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-3xl font-black text-white">{value}</p>
                <p className="text-xs text-gray-400 font-medium mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map(({ icon, title, desc }) => (
              <div
                key={title}
                className="flex flex-col items-center text-center p-4 rounded-2xl hover:bg-green-50 transition-colors"
              >
                <span className="text-3xl mb-2">{icon}</span>
                <p className="font-bold text-gray-800 text-sm">{title}</p>
                <p className="text-gray-500 text-xs mt-1 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Teams */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-3">
              Seleções em Destaque
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              As maiores seleções do mundo, prontas para você vestir as cores da sua favorita
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {featuredTeams.map((teamId) => {
              const config = teamConfig[teamId]
              return (
                <Link
                  key={teamId}
                  to={`/loja?seleção=${teamId}`}
                  className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${config.bgGradient} p-4 flex flex-col items-center gap-2 hover:scale-105 transition-all duration-300 shadow-sm hover:shadow-lg`}
                >
                  <span className="text-4xl">{config.flag}</span>
                  <p className="text-white font-bold text-sm text-center">{config.name}</p>
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors rounded-2xl" />
                </Link>
              )
            })}
          </div>

          <div className="text-center mt-6">
            <Link to="/loja" className="text-green-600 hover:text-green-700 font-semibold text-sm inline-flex items-center gap-1">
              Ver todas as seleções
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-green-500 font-semibold text-sm uppercase tracking-wider">
                🔥 Mais Vendidos
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-1">
                Produtos em Destaque
              </h2>
            </div>
            <Link
              to="/loja"
              className="text-green-600 hover:text-green-700 font-semibold text-sm inline-flex items-center gap-1 whitespace-nowrap"
            >
              Ver tudo
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {featuredProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section
        className="py-16 sm:py-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #009C3B 0%, #00B04B 50%, #15803d 100%)' }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 30px,
              rgba(255,255,255,0.3) 30px,
              rgba(255,255,255,0.3) 31px
            )`,
          }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <span className="text-5xl sm:text-6xl">🏆</span>
          <h2 className="text-3xl sm:text-5xl font-black text-white mt-4 mb-4 leading-tight">
            Copa do Mundo 2026
          </h2>
          <p className="text-green-100 text-lg sm:text-xl max-w-xl mx-auto mb-8">
            Prepare-se para o maior evento do futebol! Vista as cores da sua seleção com nossas camisas oficiais.
          </p>
          <Link
            to="/loja"
            className="inline-block px-10 py-4 bg-white text-green-700 font-black text-lg rounded-2xl hover:bg-green-50 transition-all duration-200 active:scale-95 shadow-2xl"
          >
            Garantir minha camisa
          </Link>
        </div>
      </section>
    </div>
  )
}
