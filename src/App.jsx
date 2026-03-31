import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { CartProvider } from './context/CartContext'
import { FavoritesProvider } from './context/FavoritesContext'
import { ToastProvider } from './context/ToastContext'
import Header from './components/Header'
import Footer from './components/Footer'
import CartSidebar from './components/CartSidebar'
import Toast from './components/Toast'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Checkout from './pages/Checkout'
import Favorites from './pages/Favorites'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])
  return null
}

function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-16">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/loja" element={<Shop />} />
          <Route path="/produto/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/favoritos" element={<Favorites />} />
          <Route
            path="*"
            element={
              <div className="max-w-2xl mx-auto px-4 py-20 text-center">
                <p className="text-7xl mb-4">⚽</p>
                <h2 className="text-3xl font-black text-gray-800 mb-3">Página não encontrada</h2>
                <p className="text-gray-500 mb-6">Essa página saiu da área de jogo!</p>
                <a href="/" className="btn-primary inline-block">
                  Voltar ao início
                </a>
              </div>
            }
          />
        </Routes>
      </main>
      <Footer />
      <CartSidebar />
      <Toast />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <CartProvider>
          <FavoritesProvider>
            <AppLayout />
          </FavoritesProvider>
        </CartProvider>
      </ToastProvider>
    </BrowserRouter>
  )
}
