import { useState, useEffect } from "react"
import type { User } from "firebase/auth"
// import { auth } from "../lib/firebase"
import { auth } from "../lib/firebase"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user)
    })

    return () => unsubscribe()
  }, [])

  return user
}

