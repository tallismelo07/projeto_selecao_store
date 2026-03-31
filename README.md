# ⚽ Seleção Store

Loja virtual de camisas oficiais das maiores seleções nacionais de futebol do mundo.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react) ![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss)

## Tecnologias

- **React 18** com Context API para estado global
- **Vite 5** como bundler
- **Tailwind CSS 3** para estilização
- **React Router v6** para navegação
- **LocalStorage** para persistência do carrinho e favoritos

## Funcionalidades

- Listagem de 24 camisas de 12 seleções
- Filtro por seleção e busca por jogador
- Ordenação por preço e nome
- Carrinho com sidebar animada
- Controle de quantidade e remoção de itens
- Persistência do carrinho no LocalStorage
- Favoritar produtos com persistência
- Checkout em 3 etapas com validação de formulário
- Toasts de feedback em todas as ações
- Design responsivo (mobile, tablet e desktop)
- Camisas renderizadas em SVG — sem dependência de imagens externas

## Seleções disponíveis

🇧🇷 Brasil · 🇦🇷 Argentina · 🇫🇷 França · 🇩🇪 Alemanha · 🇪🇸 Espanha · 🇵🇹 Portugal · 🏴󠁧󠁢󠁥󠁮󠁧󠁿 Inglaterra · 🇮🇹 Itália · 🇳🇱 Holanda · 🇭🇷 Croácia · 🇯🇵 Japão · 🇲🇽 México

## Instalação e uso

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build
```

O app estará disponível em `http://localhost:5173`.

## Estrutura do projeto

```
src/
├── components/
│   ├── CartSidebar.jsx   # Gaveta lateral do carrinho
│   ├── FilterBar.jsx     # Filtros e busca da loja
│   ├── Footer.jsx
│   ├── Header.jsx        # Navbar responsiva com busca
│   ├── JerseyImage.jsx   # Camisa SVG gerada dinamicamente
│   ├── ProductCard.jsx   # Card de produto com favoritar
│   └── Toast.jsx         # Notificações de feedback
├── context/
│   ├── CartContext.jsx
│   ├── FavoritesContext.jsx
│   └── ToastContext.jsx
├── data/
│   └── products.js       # Mock de produtos e configuração das seleções
├── pages/
│   ├── Checkout.jsx      # Fluxo de compra em 3 etapas
│   ├── Favorites.jsx
│   ├── Home.jsx
│   ├── ProductDetail.jsx
│   └── Shop.jsx
├── App.jsx
├── index.css
└── main.jsx
```

## Páginas

| Rota | Página |
|---|---|
| `/` | Home com hero, seleções em destaque e produtos populares |
| `/loja` | Catálogo completo com filtros e paginação |
| `/produto/:id` | Detalhes do produto com seletor de tamanho |
| `/favoritos` | Produtos salvos |
| `/checkout` | Finalização de compra (sem pagamento real) |

## Notas

- Nenhum backend necessário — todos os dados são mockados em `src/data/products.js`
- Nenhum pagamento real é processado
- As camisas são renderizadas como SVG com as cores e padrões de cada seleção
