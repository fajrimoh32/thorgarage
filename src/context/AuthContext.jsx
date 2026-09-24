import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { mockUsers } from '../data/mockData'
import { firebaseAuth, firebaseDb, isFirebaseReady } from '../lib/firebase'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

const AuthContext = createContext(null)

const AUTH_STORAGE_KEY = 'thorgarage-auth-user'

function makeSafeUser(rawUser) {
  return {
    id: rawUser.id,
    name: rawUser.name,
    email: rawUser.email,
    role: rawUser.role || 'admin',
    status: rawUser.status || 'active',
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(AUTH_STORAGE_KEY)
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY)
    }
  }, [user])

  useEffect(() => {
    if (!isFirebaseReady || !firebaseAuth) return undefined

    let mounted = true

    const sync = async (userObj) => {
      if (!userObj) {
        setUser(null)
        return
      }

      try {
        const profileRef = doc(firebaseDb, 'profiles', userObj.uid)
        const profileSnap = await getDoc(profileRef)
        const profile = profileSnap.exists() ? profileSnap.data() : null

        if (!mounted) return

        setUser(makeSafeUser({
          id: userObj.uid,
          name: profile?.name || userObj.displayName || userObj.email,
          email: userObj.email,
          role: profile?.role || 'admin',
          status: 'active',
        }))
      } catch (err) {
        console.warn('Failed to load profile:', err)
      }
    }

    const unsub = onAuthStateChanged(firebaseAuth, (u) => {
      sync(u)
    })

    return () => {
      mounted = false
      unsub()
    }
  }, [])

  const login = async ({ email, password }) => {
    const trimmedEmail = String(email || '').trim().toLowerCase()
    const trimmedPassword = String(password || '').trim()

    if (!trimmedEmail || !trimmedPassword) {
      throw new Error('Email dan password harus diisi.')
    }

    if (isFirebaseReady && firebaseAuth) {
      try {
        const cred = await signInWithEmailAndPassword(firebaseAuth, trimmedEmail, trimmedPassword)
        const userObj = cred.user

        const profileRef = doc(firebaseDb, 'profiles', userObj.uid)
        const profileSnap = await getDoc(profileRef)
        const profile = profileSnap.exists() ? profileSnap.data() : null

        const safeUser = makeSafeUser({
          id: userObj.uid,
          name: profile?.name || userObj.displayName || userObj.email,
          email: userObj.email,
          role: profile?.role || 'admin',
          status: 'active',
        })

        setUser(safeUser)
        return safeUser
      } catch (err) {
        throw new Error(err.message || 'Email atau password tidak valid.')
      }
    }

    const found = mockUsers.find(
      (item) => item.email.toLowerCase() === trimmedEmail && item.password === trimmedPassword,
    )

    if (!found) {
      throw new Error('Email atau password tidak valid.')
    }

    const safeUser = makeSafeUser(found)
    setUser(safeUser)
    return safeUser
  }

  const logout = async () => {
    if (isFirebaseReady && firebaseAuth) {
      await signOut(firebaseAuth)
    }
    setUser(null)
  }

  const value = useMemo(() => ({ user, login, logout }), [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}
