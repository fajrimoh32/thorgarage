import { useMemo, useState } from 'react'
import { mockCustomers, mockInventory, mockServiceQueue, mockUsers, serviceCatalog } from '../data/mockData'
import { useAuth } from '../context/AuthContext'

const emptyUserForm = { name: '', email: '', role: 'admin', status: 'active' }
const emptyCustomerForm = { name: '', phone: '', vehicle: '', plate: '', status: 'Active' }
const emptyInventoryForm = { name: '', sku: '', stock: 0, unit: 'pcs', status: 'Ready' }
const emptyServiceForm = { id: '', customer: '', bike: '', service: '', mechanic: '', eta: '20 min', status: 'Waiting', amount: 'Rp 0' }

export default function AdminPanel() {
  const { user: currentUser } = useAuth()
  const [users, setUsers] = useState(mockUsers)
  const [customers, setCustomers] = useState(mockCustomers)
  const [inventory, setInventory] = useState(mockInventory)
  const [queue, setQueue] = useState(mockServiceQueue)
  const [catalog, setCatalog] = useState(serviceCatalog)

  const [userForm, setUserForm] = useState(emptyUserForm)
  const [customerForm, setCustomerForm] = useState(emptyCustomerForm)
  const [inventoryForm, setInventoryForm] = useState(emptyInventoryForm)
  const [serviceForm, setServiceForm] = useState(emptyServiceForm)
  const [editingUserId, setEditingUserId] = useState(null)
  const [editingCustomerId, setEditingCustomerId] = useState(null)
  const [editingInventoryId, setEditingInventoryId] = useState(null)
  const [editingServiceId, setEditingServiceId] = useState(null)

  const isOwner = currentUser?.role === 'owner'
  const canManageUsers = isOwner

  const totalRevenue = useMemo(
    () => users.length + customers.length + inventory.length + queue.length + catalog.length,
    [users.length, customers.length, inventory.length, queue.length, catalog.length],
  )

  const handleUserSubmit = (event) => {
    event.preventDefault()
    if (!userForm.name || !userForm.email) return
    if (editingUserId) {
      setUsers((prev) => prev.map((item) => item.id === editingUserId ? { ...item, ...userForm } : item))
    } else {
      setUsers((prev) => [
        ...prev,
        { id: `u-${Date.now()}`, password: 'thorgarage123', ...userForm },
      ])
    }
    setUserForm(emptyUserForm)
    setEditingUserId(null)
  }

  const handleCustomerSubmit = (event) => {
    event.preventDefault()
    if (!customerForm.name || !customerForm.phone) return
    if (editingCustomerId) {
      setCustomers((prev) => prev.map((item) => item.id === editingCustomerId ? { ...item, ...customerForm } : item))
    } else {
      setCustomers((prev) => [
        ...prev,
        { id: `C-${Date.now().toString().slice(-4)}`, ...customerForm },
      ])
    }
    setCustomerForm(emptyCustomerForm)
    setEditingCustomerId(null)
  }

  const handleInventorySubmit = (event) => {
    event.preventDefault()
    if (!inventoryForm.name || !inventoryForm.sku) return
    if (editingInventoryId) {
      setInventory((prev) => prev.map((item) => item.id === editingInventoryId ? { ...item, ...inventoryForm } : item))
    } else {
      setInventory((prev) => [
        ...prev,
        { id: `P-${Date.now().toString().slice(-4)}`, ...inventoryForm },
      ])
    }
    setInventoryForm(emptyInventoryForm)
    setEditingInventoryId(null)
  }

  const handleServiceSubmit = (event) => {
    event.preventDefault()
    if (!serviceForm.customer || !serviceForm.service) return
    if (editingServiceId) {
      setQueue((prev) => prev.map((item) => item.id === editingServiceId ? { ...item, ...serviceForm } : item))
    } else {
      setQueue((prev) => [
        ...prev,
        { id: `TS-${Date.now().toString().slice(-4)}`, ...serviceForm },
      ])
    }
    setServiceForm(emptyServiceForm)
    setEditingServiceId(null)
  }

  return (
    <div className="admin-panel">
      <section className="neo-card summary-strip">
        <div>
          <small>Aktivitas</small>
          <strong>{totalRevenue} item aktif</strong>
        </div>
        <div>
          <small>Mode</small>
          <strong>{isOwner ? 'Owner / Full Access' : 'Admin / CRUD'}</strong>
        </div>
        <div>
          <small>Role</small>
          <strong>{currentUser?.role}</strong>
        </div>
      </section>

      {canManageUsers && (
        <section className="neo-card">
          <div className="card-header">
            <span>Kelola User & Role</span>
          </div>

          <div className="form-scroll-panel">
            <form className="crud-form" onSubmit={handleUserSubmit}>
              <input value={userForm.name} onChange={(e) => setUserForm((prev) => ({ ...prev, name: e.target.value }))} placeholder="Nama" />
              <input value={userForm.email} onChange={(e) => setUserForm((prev) => ({ ...prev, email: e.target.value }))} placeholder="Email" />
              <select value={userForm.role} onChange={(e) => setUserForm((prev) => ({ ...prev, role: e.target.value }))}>
                <option value="owner">Owner</option>
                <option value="admin">Admin</option>
              </select>
              <select value={userForm.status} onChange={(e) => setUserForm((prev) => ({ ...prev, status: e.target.value }))}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
              <button type="submit" className="primary-btn small-btn">{editingUserId ? 'Update User' : 'Tambah User'}</button>
            </form>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>Nama</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td><span className="pill">{user.role}</span></td>
                  <td>{user.status}</td>
                  <td>
                    <div className="table-actions">
                      <button className="secondary-btn small-btn" onClick={() => {
                        setEditingUserId(user.id)
                        setUserForm({ name: user.name, email: user.email, role: user.role, status: user.status })
                      }}>Edit</button>
                      <button className="secondary-btn small-btn danger-btn" onClick={() => setUsers((prev) => prev.filter((item) => item.id !== user.id))}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      <section className="neo-card">
        <div className="card-header">
          <span>CRUD Customer</span>
        </div>

        <div className="form-scroll-panel">
          <form className="crud-form" onSubmit={handleCustomerSubmit}>
            <input value={customerForm.name} onChange={(e) => setCustomerForm((prev) => ({ ...prev, name: e.target.value }))} placeholder="Nama pelanggan" />
            <input value={customerForm.phone} onChange={(e) => setCustomerForm((prev) => ({ ...prev, phone: e.target.value }))} placeholder="No. telepon" />
            <input value={customerForm.vehicle} onChange={(e) => setCustomerForm((prev) => ({ ...prev, vehicle: e.target.value }))} placeholder="Motor" />
            <input value={customerForm.plate} onChange={(e) => setCustomerForm((prev) => ({ ...prev, plate: e.target.value }))} placeholder="No. polisi" />
            <select value={customerForm.status} onChange={(e) => setCustomerForm((prev) => ({ ...prev, status: e.target.value }))}>
              <option value="Active">Active</option>
              <option value="Repeat">Repeat</option>
              <option value="New">New</option>
            </select>
            <button type="submit" className="primary-btn small-btn">{editingCustomerId ? 'Update Customer' : 'Tambah Customer'}</button>
          </form>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Nama</th>
              <th>Motor</th>
              <th>No. Polisi</th>
              <th>Kontak</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.vehicle}</td>
                <td>{customer.plate}</td>
                <td>{customer.phone}</td>
                <td>{customer.status}</td>
                <td>
                  <div className="table-actions">
                    <button className="secondary-btn small-btn" onClick={() => {
                      setEditingCustomerId(customer.id)
                      setCustomerForm({ name: customer.name, phone: customer.phone, vehicle: customer.vehicle, plate: customer.plate, status: customer.status })
                    }}>Edit</button>
                    <button className="secondary-btn small-btn danger-btn" onClick={() => setCustomers((prev) => prev.filter((item) => item.id !== customer.id))}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="neo-card">
        <div className="card-header">
          <span>CRUD Service & Inventory</span>
        </div>
        <div className="admin-two-col">
          <div>
            <h4>Catalog Service</h4>
            <div className="form-scroll-panel">
              <form className="crud-form compact-form" onSubmit={handleServiceSubmit}>
                <input value={serviceForm.customer} onChange={(e) => setServiceForm((prev) => ({ ...prev, customer: e.target.value }))} placeholder="Customer" />
                <input value={serviceForm.service} onChange={(e) => setServiceForm((prev) => ({ ...prev, service: e.target.value }))} placeholder="Nama service" />
                <input value={serviceForm.mechanic} onChange={(e) => setServiceForm((prev) => ({ ...prev, mechanic: e.target.value }))} placeholder="Teknisi" />
                <input value={serviceForm.amount} onChange={(e) => setServiceForm((prev) => ({ ...prev, amount: e.target.value }))} placeholder="Nominal" />
                <button type="submit" className="primary-btn small-btn">{editingServiceId ? 'Update' : 'Tambah'}</button>
              </form>
            </div>
            <ul className="activity-list compact-list">
              {catalog.map((service) => (
                <li key={service.id}>
                  <div className="list-line">
                    <span>{service.name}</span>
                    <small>{service.duration}</small>
                  </div>
                  <div className="list-line">
                    <strong>Rp {service.price.toLocaleString('id-ID')}</strong>
                    <button className="secondary-btn small-btn" onClick={() => setCatalog((prev) => prev.filter((item) => item.id !== service.id))}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Inventory</h4>
            <div className="form-scroll-panel">
              <form className="crud-form compact-form" onSubmit={handleInventorySubmit}>
                <input value={inventoryForm.name} onChange={(e) => setInventoryForm((prev) => ({ ...prev, name: e.target.value }))} placeholder="Nama part" />
                <input value={inventoryForm.sku} onChange={(e) => setInventoryForm((prev) => ({ ...prev, sku: e.target.value }))} placeholder="SKU" />
                <input type="number" value={inventoryForm.stock} onChange={(e) => setInventoryForm((prev) => ({ ...prev, stock: Number(e.target.value) }))} placeholder="Stok" />
                <select value={inventoryForm.status} onChange={(e) => setInventoryForm((prev) => ({ ...prev, status: e.target.value }))}>
                  <option value="Ready">Ready</option>
                  <option value="Low">Low</option>
                  <option value="Critical">Critical</option>
                </select>
                <button type="submit" className="primary-btn small-btn">{editingInventoryId ? 'Update' : 'Tambah'}</button>
              </form>
            </div>
            <ul className="activity-list compact-list">
              {inventory.map((item) => (
                <li key={item.id}>
                  <div className="list-line">
                    <span>{item.name}</span>
                    <small>{item.stock} {item.unit}</small>
                  </div>
                  <div className="list-line">
                    <strong>{item.status}</strong>
                    <button className="secondary-btn small-btn" onClick={() => setInventory((prev) => prev.filter((entry) => entry.id !== item.id))}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="neo-card">
        <div className="card-header">
          <span>CRUD Antrian Service</span>
        </div>

        <div className="form-scroll-panel">
          <form className="crud-form" onSubmit={handleServiceSubmit}>
            <input value={serviceForm.id || ''} onChange={(e) => setServiceForm((prev) => ({ ...prev, id: e.target.value }))} placeholder="ID Order" />
            <input value={serviceForm.customer} onChange={(e) => setServiceForm((prev) => ({ ...prev, customer: e.target.value }))} placeholder="Customer" />
            <input value={serviceForm.bike} onChange={(e) => setServiceForm((prev) => ({ ...prev, bike: e.target.value }))} placeholder="Motor" />
            <input value={serviceForm.service} onChange={(e) => setServiceForm((prev) => ({ ...prev, service: e.target.value }))} placeholder="Service" />
            <input value={serviceForm.mechanic} onChange={(e) => setServiceForm((prev) => ({ ...prev, mechanic: e.target.value }))} placeholder="Teknisi" />
            <select value={serviceForm.status} onChange={(e) => setServiceForm((prev) => ({ ...prev, status: e.target.value }))}>
              <option value="Waiting">Waiting</option>
              <option value="In Progress">In Progress</option>
              <option value="Ready">Ready</option>
            </select>
            <button type="submit" className="primary-btn small-btn">{editingServiceId ? 'Update Order' : 'Tambah Order'}</button>
          </form>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Service</th>
              <th>Teknisi</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {queue.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.customer}</td>
                <td>{item.service}</td>
                <td>{item.mechanic}</td>
                <td><span className={`pill status-${item.status.toLowerCase().replace(/\s+/g, '-')}`}>{item.status}</span></td>
                <td>
                  <div className="table-actions">
                    <button className="secondary-btn small-btn" onClick={() => {
                      setEditingServiceId(item.id)
                      setServiceForm({ ...item, id: item.id })
                    }}>Edit</button>
                    <button className="secondary-btn small-btn danger-btn" onClick={() => setQueue((prev) => prev.filter((entry) => entry.id !== item.id))}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}
