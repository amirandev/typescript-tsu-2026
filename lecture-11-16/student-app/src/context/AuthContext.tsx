import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { auth, getToken, setToken, clearToken } from '../api/client'
import type { User } from '../types'

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
      auth.me()
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
    const data = await auth.login(email, password)
    setToken(data.token)
    setTokenState(data.token)
    setUser(data.user)
  }

  const register = async (name: string, email: string, password: string) => {
    const data = await auth.register(name, email, password)
    setToken(data.token)
    setTokenState(data.token)
    setUser(data.user)
  }

  const logout = async () => {
    try { await auth.logout() } catch { /* ignore */ }
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
