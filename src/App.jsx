import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { BrowserRouter, Navigate, Route, Routes, Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Bell,
  Bike,
  ClipboardList,
  CreditCard,
  FileText,
  LayoutGrid,
  LogOut,
  Menu,
  Moon,
  PackageCheck,
  ReceiptText,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  SunMedium,
  TrendingUp,
  Users,
  Wallet,
  Wrench,
} from 'lucide-react'
import { AreaChart, Area, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { useAuth } from './context/AuthContext'
import LoginPage from './pages/LoginPage'
import AdminPanel from './components/AdminPanel'
import {
  mockCustomers,
  mockInventory,
  mockPayments,
  mockServiceQueue,
  mockTransactions,
  serviceMix,
  technicianLoad,
  workshopActivities,
  revenueSeries,
} from './data/mockData'
import { isFirebaseReady } from './lib/firebase'

const allMenuItems = [
  { name: 'Dashboard', icon: LayoutGrid, href: '/dashboard', roles: ['owner', 'admin'] },
  { name: 'Service Queue', icon: ClipboardList, href: '/queue', roles: ['owner', 'admin'] },
  { name: 'Customers', icon: Users, href: '/customers', roles: ['owner', 'admin'] },
  { name: 'Inventory', icon: PackageCheck, href: '/inventory', roles: ['owner', 'admin'] },
  { name: 'Transactions', icon: ReceiptText, href: '/transactions', roles: ['owner', 'admin'] },
  { name: 'Payments', icon: CreditCard, href: '/payments', roles: ['owner', 'admin'] },
  { name: 'Reports', icon: TrendingUp, href: '/reports', roles: ['owner', 'admin'] },
  { name: 'Admin Panel', icon: ShieldCheck, href: '/admin', roles: ['owner', 'admin'] },
  { name: 'Settings', icon: Settings, href: '/settings', roles: ['owner', 'admin'] },
]

const kpiCards = [
  { title: 'Pendapatan Hari Ini', value: 'Rp 18,4 jt', trend: '+18.2%', icon: Wallet },
  { title: 'Job Service', value: '46', trend: '+11.6%', icon: ClipboardList },
  { title: 'Customer Masuk', value: '39', trend: '+7.8%', icon: Users },
  { title: 'Pembayaran Selesai', value: 'Rp 12,9 jt', trend: '+9.4%', icon: CreditCard },
]

function MainLayout({ children, pageTitle }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('neo-theme') || 'dark')
  const [menuOpen, setMenuOpen] = useState(true)
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('neo-theme', theme)
  }, [theme])

  const visibleMenu = allMenuItems.filter((item) => item.roles.includes(user?.role || 'owner'))

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${menuOpen ? 'open' : 'collapsed'}`}>
        <div className="brand-block">
          <div className="brand-icon"><Bike size={20} /></div>
          <div>
            <h1>THOR</h1>
            <p>GARAGE</p>
          </div>
        </div>

        <nav className="nav-list">
          {visibleMenu.map(({ name, icon: Icon, href }) => (
            <Link key={name} to={href} className={`nav-item ${location.pathname === href ? 'active' : ''}`}>
              <Icon size={18} />
              <span>{name}</span>
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="mini-card">
            <Sparkles size={18} />
            <span>{user?.role || 'Owner'} Access</span>
          </div>
          <button className="logout-button" onClick={handleLogout}>
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <button className="icon-button" onClick={() => setMenuOpen((prev) => !prev)}>
            <Menu size={18} />
          </button>
          <div className="search-box">
            <Search size={16} />
            <input placeholder="Cari pelanggan, order, part, transaksi" />
          </div>
          <div className="topbar-actions">
            <button className="icon-button"><Bell size={18} /></button>
            <button className="icon-button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
              {theme === 'dark' ? <SunMedium size={18} /> : <Moon size={18} />}
            </button>
            <div className="avatar">{user?.name?.slice(0, 2).toUpperCase() || 'TG'}</div>
          </div>
        </header>

        <section className="page-header-panel">
          <div>
            <p className="eyebrow">THOR GARAGE</p>
            <h2>{pageTitle}</h2>
          </div>
          <div className="backend-status">
            <span className={`status-dot ${isFirebaseReady ? 'online' : 'offline'}`} />
            <small>Firebase: {isFirebaseReady ? 'ready' : 'demo mode'}</small>
          </div>
        </section>

        {children}
      </main>
    </div>
  )
}

function DashboardPage() {
  const summary = useMemo(() => ({ revenue: 'Rp 18,4 jt', nps: '92%', output: '+22.5%' }), [])

  return (
    <>
      <section className="hero-card workshop-hero">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <p className="eyebrow">Workshop Operations</p>
          <h2>Customer datang, servis, sparepart, dan pembayaran dalam satu dashboard.</h2>
          <p>Monitoring harian bengkel motor mulai dari antrean customer hingga pencatatan pembayaran akhir.</p>
        </motion.div>
        <div className="hero-actions">
          <button className="secondary-btn">Tambah Booking</button>
          <button className="primary-btn">Invoice Baru</button>
        </div>
      </section>

      <section className="kpi-grid">
        {kpiCards.map(({ title, value, trend, icon: Icon }) => (
          <motion.article key={title} className="neo-card" whileHover={{ y: -4, scale: 1.01 }}>
            <div className="card-header">
              <span>{title}</span>
              <div className="icon-badge"><Icon size={16} /></div>
            </div>
            <h3>{value}</h3>
            <p className="positive">{trend} vs hari lalu</p>
          </motion.article>
        ))}
      </section>

      <section className="content-grid">
        <motion.article className="neo-card chart-card" initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}>
          <div className="card-header">
            <span>Revenue Harian</span>
            <span className="muted">{summary.revenue}</span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={revenueSeries}>
              <defs>
                <linearGradient id="workshopRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity={0.03} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="var(--border)" strokeDasharray="4 4" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="var(--primary)" fill="url(#workshopRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.article>

        <motion.article className="neo-card chart-card" initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }}>
          <div className="card-header">
            <span>Jenis Service</span>
            <span className="muted">{summary.nps}</span>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={serviceMix}>
              <CartesianGrid stroke="var(--border)" strokeDasharray="4 4" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="var(--primary)" />
            </BarChart>
          </ResponsiveContainer>
        </motion.article>
      </section>

      <section className="content-grid lower-grid">
        <article className="neo-card">
          <div className="card-header">
            <span>Antrian Service</span>
            <span className="muted">{summary.output}</span>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Motor</th>
                <th>Service</th>
                <th>Teknisi</th>
                <th>ETA</th>
                <th>Status</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {mockServiceQueue.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.customer}</td>
                  <td>{item.bike}</td>
                  <td>{item.service}</td>
                  <td>{item.mechanic}</td>
                  <td>{item.eta}</td>
                  <td><span className={`pill status-${item.status.toLowerCase().replace(/\s+/g, '-')}`}>{item.status}</span></td>
                  <td>{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>

        <div className="stacked">
          <article className="neo-card">
            <div className="card-header">
              <span>Aktivitas Terbaru</span>
            </div>
            <ul className="activity-list">
              {workshopActivities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="neo-card">
            <div className="card-header">
              <span>Stok Part</span>
            </div>
            <div className="inventory-list">
              {mockInventory.map((item) => (
                <div key={item.id} className="inventory-row">
                  <div>
                    <strong>{item.name}</strong>
                    <small>{item.stock} {item.unit}</small>
                  </div>
                  <span className={`stock-badge ${item.status.toLowerCase()}`}>{item.status}</span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="bottom-grid">
        <article className="neo-card">
          <div className="card-header">
            <span>Load Teknisi</span>
          </div>
          <div className="tech-list">
            {technicianLoad.map((tech) => (
              <div key={tech.name} className="tech-item">
                <div className="tech-meta">
                  <strong>{tech.name}</strong>
                  <span>{tech.tasks} task</span>
                </div>
                <div className="progress-bar"><span style={{ width: `${tech.finish}%`, background: tech.color }} /></div>
                <small>{tech.finish}% selesai</small>
              </div>
            ))}
          </div>
        </article>

        <article className="neo-card">
          <div className="card-header">
            <span>Ringkasan Pembayaran</span>
          </div>
          <div className="payment-summary">
            {mockPayments.slice(0, 3).map((pay) => (
              <div key={pay.id} className="payment-box">
                <span>{pay.method}</span>
                <strong>Rp {pay.total.toLocaleString('id-ID')}</strong>
              </div>
            ))}
          </div>
        </article>

        <article className="neo-card">
          <div className="card-header">
            <span>Service Rating</span>
          </div>
          <div className="rating-box">
            <h3>4.9/5</h3>
            <p>Customer puas dengan service dan kecepatan penanganan.</p>
          </div>
        </article>
      </section>
    </>
  )
}

function QueuePage() {
  return (
    <section className="neo-card">
      <div className="card-header">
        <span>Service Queue</span>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>Order</th>
            <th>Customer</th>
            <th>Motor</th>
            <th>Service</th>
            <th>Teknisi</th>
            <th>ETA</th>
            <th>Status</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {mockServiceQueue.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.customer}</td>
              <td>{item.bike}</td>
              <td>{item.service}</td>
              <td>{item.mechanic}</td>
              <td>{item.eta}</td>
              <td><span className={`pill status-${item.status.toLowerCase().replace(/\s+/g, '-')}`}>{item.status}</span></td>
              <td>{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

function CustomersPage() {
  return (
    <section className="neo-card">
      <div className="card-header">
        <span>Customer Management</span>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Telepon</th>
            <th>Motor</th>
            <th>No. Polisi</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {mockCustomers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
              <td>{customer.phone}</td>
              <td>{customer.vehicle}</td>
              <td>{customer.plate}</td>
              <td>{customer.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

function InventoryPage() {
  return (
    <section className="neo-card">
      <div className="card-header">
        <span>Inventory & Sparepart</span>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama Part</th>
            <th>SKU</th>
            <th>Stok</th>
            <th>Satuan</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {mockInventory.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.sku}</td>
              <td>{item.stock}</td>
              <td>{item.unit}</td>
              <td><span className={`pill ${item.status === 'Critical' ? 'status-ready' : ''}`}>{item.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

function TransactionsPage() {
  return (
    <section className="neo-card">
      <div className="card-header">
        <span>Transaksi & Invoice</span>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>Invoice</th>
            <th>Customer</th>
            <th>Service</th>
            <th>Metode</th>
            <th>Total</th>
            <th>Jatuh Tempo</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {mockTransactions.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.customer}</td>
              <td>{item.service}</td>
              <td>{item.method}</td>
              <td>Rp {item.total.toLocaleString('id-ID')}</td>
              <td>Rp {item.due.toLocaleString('id-ID')}</td>
              <td><span className={`pill ${item.status === 'Paid' ? 'status-ready' : item.status === 'Partial' ? 'status-in-progress' : 'status-waiting'}`}>{item.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}

function PaymentsPage() {
  return (
    <section className="neo-card">
      <div className="card-header">
        <span>Payment & Cashier</span>
      </div>
      <div className="invoice-summary-grid">
        {mockPayments.map((item) => (
          <div key={item.id} className="invoice-box">
            <div className="invoice-header">
              <strong>{item.id}</strong>
              <span className={`pill ${item.status === 'Paid' ? 'status-ready' : item.status === 'Partial' ? 'status-in-progress' : 'status-waiting'}`}>{item.status}</span>
            </div>
            <div className="invoice-meta">
              <span>Customer</span>
              <strong>{item.customer}</strong>
            </div>
            <div className="invoice-meta">
              <span>Total Tagihan</span>
              <strong>Rp {item.total.toLocaleString('id-ID')}</strong>
            </div>
            <div className="invoice-meta">
              <span>Jumlah yang harus dibayar</span>
              <strong>Rp {item.due.toLocaleString('id-ID')}</strong>
            </div>
            <div className="invoice-meta">
              <span>Metode</span>
              <strong>{item.method}</strong>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function ReportsPage() {
  return (
    <section className="neo-card">
      <div className="card-header">
        <span>Workshop Reports</span>
      </div>
      <div className="report-grid">
        <div className="metric-box">
          <small>Monthly Revenue</small>
          <strong>Rp 534 juta</strong>
        </div>
        <div className="metric-box">
          <small>Service Completed</small>
          <strong>1.240 job</strong>
        </div>
        <div className="metric-box">
          <small>Customer Retention</small>
          <strong>83%</strong>
        </div>
      </div>
    </section>
  )
}

function SettingsPage() {
  return (
    <section className="neo-card">
      <div className="card-header">
        <span>Workshop Settings</span>
      </div>
      <div className="settings-grid">
        <div className="setting-item"><span>Workshop Name</span><strong>THOR GARAGE</strong></div>
        <div className="setting-item"><span>Theme</span><strong>Dark / Light</strong></div>
        <div className="setting-item"><span>Currency</span><strong>IDR</strong></div>
        <div className="setting-item"><span>Auth</span><strong>Owner / Admin</strong></div>
      </div>
    </section>
  )
}

function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />
  }
  return children
}

function AppRoutes() {
  const { user } = useAuth()

  return (
    <Routes>
      <Route path="/" element={<Navigate to={user ? '/dashboard' : '/login'} replace />} />
      <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
      <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['owner', 'admin']}><MainLayout pageTitle="Dashboard"><DashboardPage /></MainLayout></ProtectedRoute>} />
      <Route path="/queue" element={<ProtectedRoute allowedRoles={['owner', 'admin']}><MainLayout pageTitle="Service Queue"><QueuePage /></MainLayout></ProtectedRoute>} />
      <Route path="/customers" element={<ProtectedRoute allowedRoles={['owner', 'admin']}><MainLayout pageTitle="Customer Management"><CustomersPage /></MainLayout></ProtectedRoute>} />
      <Route path="/inventory" element={<ProtectedRoute allowedRoles={['owner', 'admin']}><MainLayout pageTitle="Inventory & Sparepart"><InventoryPage /></MainLayout></ProtectedRoute>} />
      <Route path="/transactions" element={<ProtectedRoute allowedRoles={['owner', 'admin']}><MainLayout pageTitle="Transaksi & Invoice"><TransactionsPage /></MainLayout></ProtectedRoute>} />
      <Route path="/payments" element={<ProtectedRoute allowedRoles={['owner', 'admin']}><MainLayout pageTitle="Payment & Cashier"><PaymentsPage /></MainLayout></ProtectedRoute>} />
      <Route path="/reports" element={<ProtectedRoute allowedRoles={['owner', 'admin']}><MainLayout pageTitle="Reports"><ReportsPage /></MainLayout></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute allowedRoles={['owner', 'admin']}><MainLayout pageTitle="Settings"><SettingsPage /></MainLayout></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute allowedRoles={['owner', 'admin']}><MainLayout pageTitle="Admin Panel"><AdminPanel /></MainLayout></ProtectedRoute>} />
      <Route path="*" element={<Navigate to={user ? '/dashboard' : '/login'} replace />} />
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
