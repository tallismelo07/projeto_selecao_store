import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { teamConfig } from '../data/products'
import JerseyImage from '../components/JerseyImage'

const ORDER_NUMBER = () =>
  `SEL-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 100).toString().padStart(2, '0')}`

const shippingOptions = [
  { id: 'standard', label: 'Entrega Padrão', days: '5-8 dias úteis', price: 0, minOrder: 299 },
  { id: 'express', label: 'Entrega Expressa', days: '2-3 dias úteis', price: 24.9, minOrder: 0 },
  { id: 'same_day', label: 'Entrega no Dia', days: 'Hoje até 22h', price: 49.9, minOrder: 0 },
]

export default function Checkout() {
  const { items, totalPrice, totalItems, clearCart } = useCart()
  const navigate = useNavigate()

  const [step, setStep] = useState(1)
  const [orderNumber, setOrderNumber] = useState('')
  const [shipping, setShipping] = useState('express')

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    cep: '',
    address: '',
    number: '',
    complement: '',
    city: '',
    state: '',
    payment: 'pix',
  })

  const [errors, setErrors] = useState({})

  const shippingCost = (() => {
    const opt = shippingOptions.find((o) => o.id === shipping)
    if (!opt) return 0
    if (opt.id === 'standard' && totalPrice >= 299) return 0
    return opt.price
  })()

  const grandTotal = totalPrice + shippingCost

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Nome obrigatório'
    if (!form.email.includes('@')) e.email = 'E-mail inválido'
    if (form.phone.replace(/\D/g, '').length < 10) e.phone = 'Telefone inválido'
    if (form.cep.replace(/\D/g, '').length < 8) e.cep = 'CEP inválido'
    if (!form.address.trim()) e.address = 'Endereço obrigatório'
    if (!form.number.trim()) e.number = 'Número obrigatório'
    if (!form.city.trim()) e.city = 'Cidade obrigatória'
    if (!form.state.trim()) e.state = 'Estado obrigatório'
    return e
  }

  const handleChange = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }))
    if (errors[field]) setErrors((e) => ({ ...e, [field]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setOrderNumber(ORDER_NUMBER())
    setStep(3)
    clearCart()
  }

  if (items.length === 0 && step !== 3) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold text-gray-700 mb-3">Seu carrinho está vazio</h2>
        <p className="text-gray-400 mb-6">Adicione produtos antes de prosseguir para o checkout</p>
        <Link to="/loja" className="btn-primary">
          Ir para a loja
        </Link>
      </div>
    )
  }

  // Success screen
  if (step === 3) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-in">
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h2 className="text-3xl font-black text-gray-900 mb-2">Pedido realizado!</h2>
          <p className="text-gray-500 mb-4">
            Obrigado pela sua compra, {form.name.split(' ')[0]}! 🎉
          </p>

          <div className="bg-gray-50 rounded-2xl p-4 mb-6">
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Número do pedido</p>
            <p className="font-black text-xl text-gray-900">{orderNumber}</p>
          </div>

          <div className="text-left bg-green-50 rounded-2xl p-4 mb-6 space-y-2">
            <p className="text-sm text-green-800">
              <strong>📧 Confirmação</strong> enviada para <strong>{form.email}</strong>
            </p>
            <p className="text-sm text-green-800">
              <strong>🚚 Entrega</strong> em{' '}
              <strong>{shippingOptions.find((o) => o.id === shipping)?.days}</strong>
            </p>
            <p className="text-sm text-green-800">
              <strong>💳 Total</strong>: R$ {grandTotal.toFixed(2).replace('.', ',')}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Link
              to="/"
              className="btn-primary text-center"
            >
              🏠 Voltar para o início
            </Link>
            <Link
              to="/loja"
              className="btn-secondary text-center"
            >
              Continuar comprando
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-3xl font-black text-gray-900 mb-2">Finalizar Pedido</h1>
      <p className="text-gray-500 mb-8">
        {totalItems} {totalItems === 1 ? 'item' : 'itens'} no carrinho
      </p>

      {/* Steps */}
      <div className="flex items-center gap-2 mb-8">
        {['Carrinho', 'Dados', 'Confirmação'].map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                step > i + 1
                  ? 'bg-green-500 text-white'
                  : step === i + 1
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {step > i + 1 ? '✓' : i + 1}
            </div>
            <span className={`text-sm font-medium hidden sm:block ${step === i + 1 ? 'text-gray-900' : 'text-gray-400'}`}>
              {label}
            </span>
            {i < 2 && <div className="w-8 sm:w-12 h-0.5 bg-gray-200 mx-1" />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main */}
        <div className="lg:col-span-2 space-y-6">
          {step === 1 && (
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <h2 className="font-bold text-gray-900">Resumo do Carrinho</h2>
              </div>
              <ul className="divide-y divide-gray-100">
                {items.map((item) => {
                  const config = teamConfig[item.team]
                  return (
                    <li key={`${item.id}-${item.size}`} className="px-5 py-4 flex gap-4 items-center">
                      <div className={`w-16 h-16 flex-shrink-0 rounded-xl bg-gradient-to-br ${config.bgCard} flex items-center justify-center`}>
                        <JerseyImage team={item.team} number={item.number} size={48} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-sm">{item.player}</p>
                        <p className="text-xs text-gray-500">{config.flag} {config.name} · #{item.number} · Tam. {item.size}</p>
                        <p className="text-xs text-gray-400 mt-0.5">Qtd: {item.qty}</p>
                      </div>
                      <p className="font-bold text-gray-900 text-sm flex-shrink-0">
                        R$ {(item.price * item.qty).toFixed(2).replace('.', ',')}
                      </p>
                    </li>
                  )
                })}
              </ul>

              {/* Shipping */}
              <div className="px-5 py-4 border-t border-gray-100">
                <h3 className="font-semibold text-gray-800 mb-3 text-sm">Opção de entrega</h3>
                <div className="space-y-2">
                  {shippingOptions.map((opt) => {
                    const isFree = opt.id === 'standard' && totalPrice >= opt.minOrder
                    return (
                      <label
                        key={opt.id}
                        className={`flex items-center justify-between p-3 rounded-xl border-2 cursor-pointer transition-all ${
                          shipping === opt.id
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="shipping"
                            value={opt.id}
                            checked={shipping === opt.id}
                            onChange={() => setShipping(opt.id)}
                            className="accent-green-500"
                          />
                          <div>
                            <p className="text-sm font-semibold text-gray-800">{opt.label}</p>
                            <p className="text-xs text-gray-500">{opt.days}</p>
                          </div>
                        </div>
                        <p className={`text-sm font-bold ${isFree || opt.price === 0 ? 'text-green-600' : 'text-gray-800'}`}>
                          {isFree || opt.price === 0 ? 'Grátis' : `R$ ${opt.price.toFixed(2).replace('.', ',')}`}
                        </p>
                      </label>
                    )
                  })}
                </div>
              </div>

              <div className="px-5 pb-5">
                <button
                  onClick={() => setStep(2)}
                  className="w-full btn-primary mt-2"
                >
                  Continuar para dados de entrega →
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Personal info */}
              <div className="bg-white rounded-2xl shadow-sm p-5">
                <h2 className="font-bold text-gray-900 mb-4">Dados Pessoais</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nome completo *</label>
                    <input
                      value={form.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400/20 focus:border-green-400 transition-all ${errors.name ? 'border-red-400' : 'border-gray-200'}`}
                      placeholder="Seu nome completo"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">E-mail *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400/20 focus:border-green-400 transition-all ${errors.email ? 'border-red-400' : 'border-gray-200'}`}
                      placeholder="seu@email.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Telefone *</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400/20 focus:border-green-400 transition-all ${errors.phone ? 'border-red-400' : 'border-gray-200'}`}
                      placeholder="(11) 99999-9999"
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="bg-white rounded-2xl shadow-sm p-5">
                <h2 className="font-bold text-gray-900 mb-4">Endereço de Entrega</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">CEP *</label>
                    <input
                      value={form.cep}
                      onChange={(e) => handleChange('cep', e.target.value)}
                      className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400/20 focus:border-green-400 transition-all ${errors.cep ? 'border-red-400' : 'border-gray-200'}`}
                      placeholder="00000-000"
                    />
                    {errors.cep && <p className="text-red-500 text-xs mt-1">{errors.cep}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Endereço *</label>
                    <input
                      value={form.address}
                      onChange={(e) => handleChange('address', e.target.value)}
                      className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400/20 focus:border-green-400 transition-all ${errors.address ? 'border-red-400' : 'border-gray-200'}`}
                      placeholder="Rua, Avenida..."
                    />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Número *</label>
                    <input
                      value={form.number}
                      onChange={(e) => handleChange('number', e.target.value)}
                      className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400/20 focus:border-green-400 transition-all ${errors.number ? 'border-red-400' : 'border-gray-200'}`}
                      placeholder="123"
                    />
                    {errors.number && <p className="text-red-500 text-xs mt-1">{errors.number}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Complemento</label>
                    <input
                      value={form.complement}
                      onChange={(e) => handleChange('complement', e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400/20 focus:border-green-400 transition-all"
                      placeholder="Apto, bloco..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cidade *</label>
                    <input
                      value={form.city}
                      onChange={(e) => handleChange('city', e.target.value)}
                      className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400/20 focus:border-green-400 transition-all ${errors.city ? 'border-red-400' : 'border-gray-200'}`}
                      placeholder="São Paulo"
                    />
                    {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Estado *</label>
                    <select
                      value={form.state}
                      onChange={(e) => handleChange('state', e.target.value)}
                      className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400/20 focus:border-green-400 transition-all bg-white ${errors.state ? 'border-red-400' : 'border-gray-200'}`}
                    >
                      <option value="">Selecione</option>
                      {['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'].map(
                        (s) => <option key={s} value={s}>{s}</option>
                      )}
                    </select>
                    {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="bg-white rounded-2xl shadow-sm p-5">
                <h2 className="font-bold text-gray-900 mb-4">Forma de Pagamento</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'pix', icon: '⚡', label: 'PIX', desc: '5% de desconto' },
                    { id: 'credit', icon: '💳', label: 'Cartão de Crédito', desc: 'Até 12x sem juros' },
                    { id: 'boleto', icon: '📄', label: 'Boleto', desc: 'Vence em 3 dias' },
                  ].map(({ id, icon, label, desc }) => (
                    <label
                      key={id}
                      className={`flex flex-col items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        form.payment === id
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={id}
                        checked={form.payment === id}
                        onChange={() => handleChange('payment', id)}
                        className="sr-only"
                      />
                      <span className="text-2xl mb-1">{icon}</span>
                      <p className="text-sm font-semibold text-gray-800">{label}</p>
                      <p className="text-xs text-green-600 font-medium">{desc}</p>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn-secondary flex-1"
                >
                  ← Voltar
                </button>
                <button type="submit" className="btn-primary flex-1 text-lg">
                  ✅ Finalizar Pedido
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Order summary */}
        <div>
          <div className="bg-white rounded-2xl shadow-sm p-5 sticky top-24">
            <h2 className="font-bold text-gray-900 mb-4">Resumo do Pedido</h2>

            <ul className="space-y-3 mb-4">
              {items.map((item) => {
                const config = teamConfig[item.team]
                return (
                  <li key={`${item.id}-${item.size}`} className="flex items-center gap-3">
                    <div className={`w-10 h-10 flex-shrink-0 rounded-lg bg-gradient-to-br ${config.bgCard} flex items-center justify-center`}>
                      <JerseyImage team={item.team} number={item.number} size={32} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-800 truncate">{item.player}</p>
                      <p className="text-xs text-gray-500">x{item.qty} · Tam. {item.size}</p>
                    </div>
                    <p className="text-xs font-bold text-gray-800 flex-shrink-0">
                      R$ {(item.price * item.qty).toFixed(2).replace('.', ',')}
                    </p>
                  </li>
                )
              })}
            </ul>

            <div className="border-t border-gray-100 pt-4 space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Frete</span>
                <span className={shippingCost === 0 ? 'text-green-600 font-semibold' : ''}>
                  {shippingCost === 0 ? 'Grátis' : `R$ ${shippingCost.toFixed(2).replace('.', ',')}`}
                </span>
              </div>
              {form.payment === 'pix' && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Desconto PIX (5%)</span>
                  <span>- R$ {(totalPrice * 0.05).toFixed(2).replace('.', ',')}</span>
                </div>
              )}
              <div className="flex justify-between font-black text-gray-900 text-lg pt-2 border-t border-gray-100">
                <span>Total</span>
                <span>
                  R$ {(grandTotal - (form.payment === 'pix' ? totalPrice * 0.05 : 0))
                    .toFixed(2)
                    .replace('.', ',')}
                </span>
              </div>
            </div>

            {totalPrice < 299 && (
              <div className="mt-4 bg-amber-50 text-amber-700 text-xs px-3 py-2 rounded-lg">
                🚚 Falta <strong>R$ {(299 - totalPrice).toFixed(2).replace('.', ',')}</strong> para frete grátis!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
