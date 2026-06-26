import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import type { User } from '../types'

const BASE = 'https://courses.xrow.asia/api'

function getToken(): string | null {
  return localStorage.getItem('api_token')
}

function setToken(t: string) {
  localStorage.setItem('api_token', t)
}

function clearToken() {
  localStorage.removeItem('api_token')
}

interface AuthState {
  user: User | null
  token: string | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthState>(null!)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setTokenState] = useState<string | null>(getToken())
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (token) {
      fetch(`${BASE}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(r => { if (!r.ok) throw new Error(); return r.json() })
        .then(setUser)
        .catch(() => {
          clearToken()
          setTokenState(null)
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [token])

  const login = async (email: string, password: string) => {
    const res = await fetch(`${BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    if (!res.ok) throw data
    setToken(data.token)
    setTokenState(data.token)
    setUser(data.user)
  }

  const register = async (name: string, email: string, password: string) => {
    const res = await fetch(`${BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, password_confirmation: password }),
    })
    const data = await res.json()
    if (!res.ok) throw data
    setToken(data.token)
    setTokenState(data.token)
    setUser(data.user)
  }

  const logout = async () => {
    try {
      await fetch(`${BASE}/logout`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${getToken()}` },
      })
    } catch { /* ignore */ }
    clearToken()
    setTokenState(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
