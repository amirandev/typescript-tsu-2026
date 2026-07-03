# ლექცია 20 — UI Testing: Pages + Objects + Filters

---

## **სლაიდი 1**
### **UI Testing: Pages + Objects + Filters**

---

## **სლაიდი 2: Real Talk**

**ვამოწმებთ მთლიან გვერდებს (pages), არა ცალკეულ კომპონენტებს.**

**Page =** კომპონენტების კომბინაცია (header + list + modal + form)
**Objects =** რას ხედავს მომხმარებელი გვერდზე (table, card, button, input, modal, dropdown)
**Filters =** მონაცემების ფილტრაცია (search, category, sort, price range)

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

---

## **სლაიდი 3: ProductPage — Objects on Page**

```typescript
// types.ts
export interface Product {
  id: number
  name: string
  price: number
  category: string
  inStock: boolean
}
```

```typescript
// ProductPage.tsx
import { useState } from 'react'
import type { Product } from '../types'

const allProducts: Product[] = [
  { id: 1, name: 'iPhone 15', price: 2999, category: 'Electronics', inStock: true },
  { id: 2, name: 'MacBook Air', price: 4999, category: 'Electronics', inStock: true },
  { id: 3, name: 'Nike Shoes', price: 350, category: 'Sports', inStock: false },
  { id: 4, name: 'iPad Pro', price: 3999, category: 'Electronics', inStock: true },
  { id: 5, name: 'Adidas Tee', price: 120, category: 'Sports', inStock: true },
]

export function ProductPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState<'none' | 'asc' | 'desc'>('none')
  const [cart, setCart] = useState<number[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filtered = allProducts
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .filter(p => category === 'All' || p.category === category)
    .sort((a, b) => {
      if (sort === 'asc') return a.price - b.price
      if (sort === 'desc') return b.price - a.price
      return 0
    })

  const totalPrice = filtered
    .filter(p => cart.includes(p.id))
    .reduce((sum, p) => sum + p.price, 0)

  return (
    <div data-testid="product-page">
      <h1>Products</h1>

      {/* Objects: search input + category dropdown */}
      <div data-testid="filters">
        <input
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          data-testid="search-input"
        />
        <select value={category} onChange={e => setCategory(e.target.value)} data-testid="category-select">
          <option value="All">All</option>
          <option value="Electronics">Electronics</option>
          <option value="Sports">Sports</option>
        </select>
        <select value={sort} onChange={e => setSort(e.target.value as any)} data-testid="sort-select">
          <option value="none">Default</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      {/* Objects: product list */}
      <div data-testid="product-list">
        {filtered.length === 0
          ? <p data-testid="no-results">No products found</p>
          : filtered.map(p => (
              <div key={p.id} data-testid="product-card">
                <span data-testid="product-name">{p.name}</span>
                <span data-testid="product-price">{p.price}$</span>
                <span data-testid="product-category">{p.category}</span>
                <span data-testid="product-stock">{p.inStock ? 'In Stock' : 'Out of Stock'}</span>
                <button
                  data-testid={`add-to-cart-${p.id}`}
                  onClick={() => setCart(c => c.includes(p.id) ? c : [...c, p.id])}
                  disabled={!p.inStock}
                >
                  {cart.includes(p.id) ? 'Added' : 'Add to Cart'}
                </button>
              </div>
            ))
        }
      </div>

      {/* Objects: cart */}
      {cart.length > 0 && (
        <div data-testid="cart">
          <p data-testid="cart-count">Cart: {cart.length} items</p>
          <p data-testid="cart-total">Total: {totalPrice}$</p>
          <button onClick={() => setIsModalOpen(true)} data-testid="checkout-btn">Checkout</button>
        </div>
      )}

      {/* Objects: modal */}
      {isModalOpen && (
        <div data-testid="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div data-testid="modal-content" onClick={e => e.stopPropagation()}>
            <h2>Checkout</h2>
            <p>Total: {totalPrice}$</p>
            <button onClick={() => { setCart([]); setIsModalOpen(false) }} data-testid="confirm-btn">
              Confirm Order
            </button>
            <button onClick={() => setIsModalOpen(false)} data-testid="close-modal">Close</button>
          </div>
        </div>
      )}
    </div>
  )
}
```

---

## **სლაიდი 4: Objects on Page — რას ვამოწმებთ**

**Objects =** ყველაფერი რაც გვერდზე ჩანს:

| Object | data-testid | რას ვამოწმებთ |
|--------|-------------|----------------|
| Page | `product-page` | გვერდი გამოისახება |
| Filters | `filters` | search, dropdown-ები არსებობს |
| Search input | `search-input` | ჩაწერა მუშაობს |
| Category select | `category-select` | მნიშვნელობის შეცვლა |
| Sort select | `sort-select` | მნიშვნელობის შეცვლა |
| Product card | `product-card` | პროდუქტის info |
| Product name | `product-name` | ტექსტი |
| Product price | `product-price` | ფასის ტექსტი |
| Add to cart btn | `add-to-cart-{id}` | ღილაკი მუშაობს |
| Cart | `cart` | კალათის განყოფილება |
| Cart count | `cart-count` | "Cart: 2 items" |
| Cart total | `cart-total` | "Total: 5998$" |
| Modal overlay | `modal-overlay` | popup ჩანს |
| Modal content | `modal-content` | popup-ის ტექსტი |

---

## **სლაიდი 5: ProductPage Test — Objects Check**

```typescript
// ProductPage.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ProductPage } from './ProductPage'

describe('ProductPage — Objects', () => {
  it('გვერდი გამოისახება', () => {
    render(<ProductPage />)
    expect(screen.getByTestId('product-page')).toBeInTheDocument()
    expect(screen.getByText('Products')).toBeInTheDocument()
  })

  it('search input არსებობს', () => {
    render(<ProductPage />)
    expect(screen.getByTestId('search-input')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
  })

  it('category dropdown არსებობს 3 ოფციით', () => {
    render(<ProductPage />)
    const select = screen.getByTestId('category-select')
    expect(select).toBeInTheDocument()
    expect(select.children).toHaveLength(3) // All, Electronics, Sports
  })

  it('sort dropdown არსებობს', () => {
    render(<ProductPage />)
    expect(screen.getByTestId('sort-select')).toBeInTheDocument()
  })

  it('5 product card ჩანს თავიდან', () => {
    render(<ProductPage />)
    const cards = screen.getAllByTestId('product-card')
    expect(cards).toHaveLength(5)
  })

  it('თითოეულ card-ში ჩანს name, price, category, stock', () => {
    render(<ProductPage />)
    const names = screen.getAllByTestId('product-name')
    const prices = screen.getAllByTestId('product-price')
    const categories = screen.getAllByTestId('product-category')
    const stocks = screen.getAllByTestId('product-stock')

    expect(names[0]).toHaveTextContent('iPhone 15')
    expect(prices[0]).toHaveTextContent('2999$')
    expect(categories[0]).toHaveTextContent('Electronics')
    expect(stocks[0]).toHaveTextContent('In Stock')
  })

  it('cart და checkout თავიდან არ ჩანს (ცარიელი კალათა)', () => {
    render(<ProductPage />)
    expect(screen.queryByTestId('cart')).not.toBeInTheDocument()
    expect(screen.queryByTestId('checkout-btn')).not.toBeInTheDocument()
  })

  it('modal თავიდან დახურულია', () => {
    render(<ProductPage />)
    expect(screen.queryByTestId('modal-overlay')).not.toBeInTheDocument()
  })
})
```

---

## **სლაიდი 6: ProductPage Test — Data Filters**

```typescript
describe('ProductPage — Filters', () => {
  // === SEARCH FILTER ===
  it('search-ით ფილტრაცია: "ipad" — 1 შედეგი', async () => {
    const user = userEvent.setup()
    render(<ProductPage />)

    await user.type(screen.getByTestId('search-input'), 'ipad')

    const cards = screen.getAllByTestId('product-card')
    expect(cards).toHaveLength(1)
    expect(screen.getByText('iPad Pro')).toBeInTheDocument()
    expect(screen.queryByText('iPhone 15')).not.toBeInTheDocument()
  })

  it('search case insensitive: "MAC" — MacBook', async () => {
    const user = userEvent.setup()
    render(<ProductPage />)

    await user.type(screen.getByTestId('search-input'), 'MAC')

    expect(screen.getAllByTestId('product-card')).toHaveLength(1)
    expect(screen.getByTestId('product-name')).toHaveTextContent('MacBook Air')
  })

  it('search: "shoes" — Nike Shoes', async () => {
    const user = userEvent.setup()
    render(<ProductPage />)

    await user.type(screen.getByTestId('search-input'), 'shoes')

    expect(screen.getAllByTestId('product-card')).toHaveLength(1)
    expect(screen.getByText('Nike Shoes')).toBeInTheDocument()
  })

  it('search: nothing matches — "No products found"', async () => {
    const user = userEvent.setup()
    render(<ProductPage />)

    await user.type(screen.getByTestId('search-input'), 'xxxxx')

    expect(screen.queryByTestId('product-card')).not.toBeInTheDocument()
    expect(screen.getByTestId('no-results')).toBeInTheDocument()
  })

  // === CATEGORY FILTER ===
  it('category: Electronics — 3 products', async () => {
    const user = userEvent.setup()
    render(<ProductPage />)

    await user.selectOptions(screen.getByTestId('category-select'), 'Electronics')

    expect(screen.getAllByTestId('product-card')).toHaveLength(3)
  })

  it('category: Sports — 2 products', async () => {
    const user = userEvent.setup()
    render(<ProductPage />)

    await user.selectOptions(screen.getByTestId('category-select'), 'Sports')

    expect(screen.getAllByTestId('product-card')).toHaveLength(2)
    expect(screen.getByText('Nike Shoes')).toBeInTheDocument()
    expect(screen.getByText('Adidas Tee')).toBeInTheDocument()
  })

  // === COMBO: SEARCH + CATEGORY ===
  it('search "nike" + category Sports = 1', async () => {
    const user = userEvent.setup()
    render(<ProductPage />)

    await user.type(screen.getByTestId('search-input'), 'nike')
    await user.selectOptions(screen.getByTestId('category-select'), 'Sports')

    expect(screen.getAllByTestId('product-card')).toHaveLength(1)
  })

  it('search "nike" + category Electronics = nothing', async () => {
    const user = userEvent.setup()
    render(<ProductPage />)

    await user.type(screen.getByTestId('search-input'), 'nike')
    await user.selectOptions(screen.getByTestId('category-select'), 'Electronics')

    expect(screen.queryByTestId('product-card')).not.toBeInTheDocument()
  })

  // === SORT ===
  it('sort Low to High: iPhone 15 (2999) პირველი', async () => {
    const user = userEvent.setup()
    render(<ProductPage />)

    await user.selectOptions(screen.getByTestId('sort-select'), 'asc')

    const prices = screen.getAllByTestId('product-price')
    expect(prices[0]).toHaveTextContent('2999$') // iPhone 15
  })

  it('sort High to Low: MacBook Air (4999) პირველი', async () => {
    const user = userEvent.setup()
    render(<ProductPage />)

    await user.selectOptions(screen.getByTestId('sort-select'), 'desc')

    const prices = screen.getAllByTestId('product-price')
    expect(prices[0]).toHaveTextContent('4999$') // MacBook Air
  })

  it('sort = Default — უბრუნდება თავდაპირველ მიმდევრობას', async () => {
    const user = userEvent.setup()
    render(<ProductPage />)

    await user.selectOptions(screen.getByTestId('sort-select'), 'desc')
    await user.selectOptions(screen.getByTestId('sort-select'), 'none')

    const prices = screen.getAllByTestId('product-price')
    expect(prices[0]).toHaveTextContent('2999$') // iPhone 15 ისევ პირველი
  })
})
```

---

## **სლაიდი 7: ProductPage Test — Cart + Modal Objects**

```typescript
describe('ProductPage — Cart & Modal', () => {
  it('Add to Cart — ღილაკი იცვლება "Added"-ად', async () => {
    const user = userEvent.setup()
    render(<ProductPage />)

    const btn = screen.getByTestId('add-to-cart-1') // iPhone 15
    await user.click(btn)

    expect(btn).toHaveTextContent('Added')
  })

  it('cart ჩნდება პროდუქტის დამატების შემდეგ', async () => {
    const user = userEvent.setup()
    render(<ProductPage />)

    expect(screen.queryByTestId('cart')).not.toBeInTheDocument()

    await user.click(screen.getByTestId('add-to-cart-1'))

    expect(screen.getByTestId('cart')).toBeInTheDocument()
    expect(screen.getByTestId('cart-count')).toHaveTextContent('Cart: 1 items')
    expect(screen.getByTestId('cart-total')).toHaveTextContent('Total: 2999$')
  })

  it('2 პროდუქტის დამატება — Cart: 2 items', async () => {
    const user = userEvent.setup()
    render(<ProductPage />)

    await user.click(screen.getByTestId('add-to-cart-1')) // iPhone
    await user.click(screen.getByTestId('add-to-cart-4')) // iPad

    expect(screen.getByTestId('cart-count')).toHaveTextContent('Cart: 2 items')
    expect(screen.getByTestId('cart-total')).toHaveTextContent('Total: 6998$')
  })

  it('Out of Stock პროდუქტის Add to Cart ღილაკი disabled', () => {
    render(<ProductPage />)
    const btn = screen.getByTestId('add-to-cart-3') // Nike Shoes (inStock=false)
    expect(btn).toBeDisabled()
  })

  it('Checkout ღილაკი ხსნის modal-ს', async () => {
    const user = userEvent.setup()
    render(<ProductPage />)

    await user.click(screen.getByTestId('add-to-cart-1'))
    await user.click(screen.getByTestId('checkout-btn'))

    expect(screen.getByTestId('modal-overlay')).toBeInTheDocument()
    expect(screen.getByTestId('modal-content')).toBeInTheDocument()
    expect(screen.getByText('Total: 2999$')).toBeInTheDocument()
  })

  it('modal-ში Confirm Order — კალათა ცარიელდება', async () => {
    const user = userEvent.setup()
    render(<ProductPage />)

    await user.click(screen.getByTestId('add-to-cart-1'))
    await user.click(screen.getByTestId('checkout-btn'))

    await user.click(screen.getByTestId('confirm-btn'))

    expect(screen.queryByTestId('modal-overlay')).not.toBeInTheDocument()
    expect(screen.queryByTestId('cart')).not.toBeInTheDocument()
  })

  it('modal-ში Close — modal იხურება, კალათა რჩება', async () => {
    const user = userEvent.setup()
    render(<ProductPage />)

    await user.click(screen.getByTestId('add-to-cart-1'))
    await user.click(screen.getByTestId('checkout-btn'))

    await user.click(screen.getByTestId('close-modal'))

    expect(screen.queryByTestId('modal-overlay')).not.toBeInTheDocument()
    expect(screen.getByTestId('cart')).toBeInTheDocument() // კალათა ჯერ ისევ აქ არის
  })
})
```

---

## **სლაიდი 8: UsersPage — Objects: Table + API**

```typescript
// UsersPage.tsx
export function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(r => r.json())
      .then(data => { setUsers(data); setLoading(false) })
  }, [])

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return <div data-testid="loading">Loading users...</div>

  return (
    <div data-testid="users-page">
      <h1>Users</h1>

      <input
        placeholder="Search users..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        data-testid="search-users"
      />

      <p data-testid="user-count">{filtered.length} users</p>

      <div data-testid="users-table">
        {filtered.map(u => (
          <div key={u.id} data-testid="user-row" onClick={() => setSelectedUser(u)}>
            <span data-testid="user-name">{u.name}</span>
            <span data-testid="user-email">{u.email}</span>
            <span data-testid="user-company">{u.company.name}</span>
          </div>
        ))}
      </div>

      {selectedUser && (
        <div data-testid="user-detail-modal">
          <div data-testid="user-detail">
            <h2>{selectedUser.name}</h2>
            <p>Email: {selectedUser.email}</p>
            <p>Phone: {selectedUser.phone}</p>
            <p>Company: {selectedUser.company.name}</p>
            <button onClick={() => setSelectedUser(null)} data-testid="close-detail">Close</button>
          </div>
        </div>
      )}
    </div>
  )
}
```

```typescript
// UsersPage.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { UsersPage } from './UsersPage'

const mockUsers = [
  { id: 1, name: 'Leanne Graham', email: 'leanne@example.com', phone: '123-456', company: { name: 'Romaguera-Crona' } },
  { id: 2, name: 'Ervin Howell', email: 'ervin@example.com', phone: '789-012', company: { name: 'Deckow-Crist' } },
  { id: 3, name: 'Clementine Bauch', email: 'clementine@example.com', phone: '345-678', company: { name: 'Romaguera-Jacobson' } },
]

beforeEach(() => { vi.resetAllMocks() })

describe('UsersPage — API + UI + Filters', () => {
  it('აჩვენებს Loading... API-დან მონაცემების მოსვლამდე', () => {
    globalThis.fetch = vi.fn().mockResolvedValue({ json: () => Promise.resolve(mockUsers) })
    render(<UsersPage />)

    expect(screen.getByTestId('loading')).toBeInTheDocument()
    expect(screen.getByText('Loading users...')).toBeInTheDocument()
  })

  it('API-დან მოსული მონაცემები ჩანს table-ში', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({ json: () => Promise.resolve(mockUsers) })
    render(<UsersPage />)

    await waitFor(() => {
      expect(screen.getByText('Leanne Graham')).toBeInTheDocument()
    })

    const rows = screen.getAllByTestId('user-row')
    expect(rows).toHaveLength(3)
    expect(screen.getByTestId('user-count')).toHaveTextContent('3 users')
  })

  it('table-ის თითოეულ row-ში ჩანს name, email, company', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({ json: () => Promise.resolve(mockUsers) })
    render(<UsersPage />)

    await waitFor(() => {
      expect(screen.getAllByTestId('user-name')[0]).toHaveTextContent('Leanne Graham')
    })

    const emails = screen.getAllByTestId('user-email')
    expect(emails[0]).toHaveTextContent('leanne@example.com')

    const companies = screen.getAllByTestId('user-company')
    expect(companies[0]).toHaveTextContent('Romaguera-Crona')
  })

  // === FILTERS ===
  it('search: "er" — 2 users (Ervin + Leanne != Clementine)', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({ json: () => Promise.resolve(mockUsers) })
    const user = userEvent.setup()
    render(<UsersPage />)

    await waitFor(() => expect(screen.getByText('Leanne Graham')).toBeInTheDocument())

    await user.type(screen.getByTestId('search-users'), 'er')

    expect(screen.getAllByTestId('user-row')).toHaveLength(2)
    expect(screen.queryByText('Clementine Bauch')).not.toBeInTheDocument()
  })

  it('search: "xxx" — 0 users', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({ json: () => Promise.resolve(mockUsers) })
    const user = userEvent.setup()
    render(<UsersPage />)

    await waitFor(() => expect(screen.getByText('Leanne Graham')).toBeInTheDocument())

    await user.type(screen.getByTestId('search-users'), 'xxx')

    expect(screen.queryByTestId('user-row')).not.toBeInTheDocument()
    expect(screen.getByTestId('user-count')).toHaveTextContent('0 users')
  })

  // === OBJECT: DETAIL MODAL ===
  it('row-ზე click — იხსნება user detail modal', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({ json: () => Promise.resolve(mockUsers) })
    const user = userEvent.setup()
    render(<UsersPage />)

    await waitFor(() => expect(screen.getByText('Leanne Graham')).toBeInTheDocument())

    await user.click(screen.getByText('Leanne Graham'))

    expect(screen.getByTestId('user-detail-modal')).toBeInTheDocument()
    expect(screen.getByText('Email: leanne@example.com')).toBeInTheDocument()
    expect(screen.getByText('Phone: 123-456')).toBeInTheDocument()
  })

  it('detail modal-ში Close — modal იხურება', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({ json: () => Promise.resolve(mockUsers) })
    const user = userEvent.setup()
    render(<UsersPage />)

    await waitFor(() => expect(screen.getByText('Leanne Graham')).toBeInTheDocument())
    await user.click(screen.getByText('Leanne Graham'))
    await user.click(screen.getByTestId('close-detail'))

    expect(screen.queryByTestId('user-detail-modal')).not.toBeInTheDocument()
  })
})
```

---

## **სლაიდი 9: DashboardPage — Objects: Stats + Chart + Table**

```typescript
// DashboardPage.tsx
export function DashboardPage() {
  const [data, setData] = useState<any>(null)
  const [period, setPeriod] = useState('week')

  useEffect(() => {
    fetch(`https://api.example.com/stats?period=${period}`)
      .then(r => r.json())
      .then(setData)
  }, [period])

  if (!data) return <div data-testid="loading">Loading dashboard...</div>

  return (
    <div data-testid="dashboard">
      <h1>Dashboard</h1>

      {/* Objects: period selector */}
      <select value={period} onChange={e => setPeriod(e.target.value)} data-testid="period-select">
        <option value="day">Daily</option>
        <option value="week">Weekly</option>
        <option value="month">Monthly</option>
      </select>

      {/* Objects: stat cards */}
      <div data-testid="stats">
        <div data-testid="stat-revenue">
          <span>Revenue</span>
          <span data-testid="revenue-value">{data.revenue}$</span>
        </div>
        <div data-testid="stat-orders">
          <span>Orders</span>
          <span data-testid="orders-value">{data.orders}</span>
        </div>
        <div data-testid="stat-users">
          <span>New Users</span>
          <span data-testid="users-value">{data.newUsers}</span>
        </div>
      </div>

      {/* Objects: recent orders table */}
      <h2>Recent Orders</h2>
      <div data-testid="orders-table">
        {data.recentOrders.map((o: any) => (
          <div key={o.id} data-testid="order-row">
            <span data-testid="order-id">#{o.id}</span>
            <span data-testid="order-customer">{o.customer}</span>
            <span data-testid="order-amount">{o.amount}$</span>
            <span data-testid="order-status" data-status={o.status}>{o.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
```

```typescript
// DashboardPage.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DashboardPage } from './DashboardPage'

const mockData = {
  revenue: 15000,
  orders: 42,
  newUsers: 8,
  recentOrders: [
    { id: 101, customer: 'John Doe', amount: 299, status: 'completed' },
    { id: 102, customer: 'Jane Smith', amount: 1499, status: 'pending' },
    { id: 103, customer: 'Bob Wilson', amount: 89, status: 'completed' },
  ]
}

beforeEach(() => { vi.resetAllMocks() })

describe('DashboardPage — Objects + API', () => {
  it('თავიდან loading...', () => {
    globalThis.fetch = vi.fn().mockResolvedValue({ json: () => Promise.resolve(mockData) })
    render(<DashboardPage />)
    expect(screen.getByTestId('loading')).toBeInTheDocument()
  })

  it('stat cards — Revenue, Orders, New Users', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({ json: () => Promise.resolve(mockData) })
    render(<DashboardPage />)

    await waitFor(() => {
      expect(screen.getByTestId('stat-revenue')).toBeInTheDocument()
      expect(screen.getByTestId('stat-orders')).toBeInTheDocument()
      expect(screen.getByTestId('stat-users')).toBeInTheDocument()
    })

    expect(screen.getByTestId('revenue-value')).toHaveTextContent('15000$')
    expect(screen.getByTestId('orders-value')).toHaveTextContent('42')
    expect(screen.getByTestId('users-value')).toHaveTextContent('8')
  })

  it('orders table — 3 rows', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({ json: () => Promise.resolve(mockData) })
    render(<DashboardPage />)

    await waitFor(() => {
      expect(screen.getAllByTestId('order-row')).toHaveLength(3)
    })

    expect(screen.getByTestId('order-id')).toHaveTextContent('#101')
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  it('period selector — period dropdown', async () => {
    globalThis.fetch = vi.fn().mockResolvedValue({ json: () => Promise.resolve(mockData) })
    const user = userEvent.setup()
    render(<DashboardPage />)

    await waitFor(() => expect(screen.getByTestId('stats')).toBeInTheDocument())

    await user.selectOptions(screen.getByTestId('period-select'), 'month')

    expect(globalThis.fetch).toHaveBeenCalledWith(
      'https://api.example.com/stats?period=month'
    )
  })
})
```

---

## **სლაიდი 10: Commands**

```bash
npm test                    # watch mode
npx vitest run              # ერთხელ
npx vitest --ui             # GUI

# კონკრეტული ფაილი:
npx vitest run ProductPage
npx vitest run DashboardPage

# -t flag:
npx vitest run -t "Filters"
npx vitest run -t "Cart & Modal"
npx vitest run -t "stat card"
```

---

## **სლაიდი 11: Summary**

**ვამოწმებთ 3 რამეს:**

**1. Objects on page** — ყველაფერი რაც გვერდზეა:
- Inputs, dropdowns, buttons, tables, modals, cards
- `getByTestId()`, `getByText()`, `toBeInTheDocument()`
- `getAllByTestId().toHaveLength(N)`

**2. Data flow (API → UI)** — API-დან მოსული მონაცემები:
- `fetch`-ის mock: `vi.fn().mockResolvedValue()`
- Loading state → `waitFor()` → Data visible
- `waitFor(() => expect(text).toBeInTheDocument())`

**3. Data filters** — search, category, sort:
- `userEvent.type(input, 'text')` → filtered list
- `userEvent.selectOptions(select, 'value')` → category/sort changes
- Combo filters: search + category = combined result
- Empty result: "No products found" / "0 users"
