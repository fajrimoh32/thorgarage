import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: 'owner@thorgarage.id', password: 'owner123' })
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const user = await login(form)
      setError('')
      if (user.role === 'owner' || user.role === 'admin') {
        navigate('/dashboard')
      } else {
        navigate('/dashboard')
      }
    } catch (err) {
      setError(err.message || 'Login gagal.')
    }
  }

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <div className="brand-block auth-brand">
          <div className="brand-icon"><span>TH</span></div>
          <div>
            <h1>THOR GARAGE</h1>
            <p>Workshop Management</p>
          </div>
        </div>

        <h2>Masuk ke dashboard</h2>
        <p className="auth-subtitle">Gunakan akun demo sesuai role Anda.</p>

        <div className="demo-boxes">
          <span>Owner: owner@thorgarage.id / owner123</span>
          <span>Admin: admin@thorgarage.id / admin123</span>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Email
            <input type="email" value={form.email} onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))} />
          </label>
          <label>
            Password
            <input type="password" value={form.password} onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))} />
          </label>

          {error && <div className="error-box">{error}</div>}

          <button type="submit" className="primary-btn auth-submit">Masuk</button>
        </form>
      </div>
    </div>
  )
}
