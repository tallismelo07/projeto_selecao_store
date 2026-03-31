import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="text-gray-300 mt-20" style={{ backgroundColor: '#0a0a1a' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="text-3xl">⚽</span>
              <span className="font-black text-white text-2xl tracking-tight">
                Seleção<span className="text-green-400">Store</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
              A melhor loja de camisas oficiais das maiores seleções do mundo. Qualidade premium e entrega rápida.
            </p>
            <div className="flex gap-3 mt-4">
              {['📘', '📸', '🐦', '▶️'].map((icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 bg-white/10 hover:bg-green-500/30 rounded-lg flex items-center justify-center transition-colors text-sm"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Navegação</h3>
            <ul className="space-y-2 text-sm">
              {[
                { to: '/', label: 'Início' },
                { to: '/loja', label: 'Loja Completa' },
                { to: '/favoritos', label: 'Meus Favoritos' },
                { to: '/loja?seleção=brasil', label: 'Brasil' },
                { to: '/loja?seleção=argentina', label: 'Argentina' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-gray-400 hover:text-green-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Informações</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <span className="text-green-400">🚚</span> Frete grátis acima de R$ 299
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">🔒</span> Compra 100% segura
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">🔄</span> Troca em até 30 dias
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-400">⭐</span> Produtos oficiais
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© 2024 SeleçãoStore. Todos os direitos reservados.</p>
          <p className="flex items-center gap-2">
            <span>Feito com</span>
            <span className="text-red-500">❤️</span>
            <span>para os amantes do futebol</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
