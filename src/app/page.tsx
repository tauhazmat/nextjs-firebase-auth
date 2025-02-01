"use client"

import { useAuth } from "../hooks/useAuth"
import { signOut } from "firebase/auth"
import { auth } from "../lib/firebase"
import { useRouter } from "next/navigation"

export default function MainPage() {
  const user = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      router.push("/login")
    } catch (error) {
      console.error("Failed to sign out", error)
    }
  }

  if (!user) {
    return null // This will be handled by the layout
  }

  return (
    <div style={styles.container}>
      <h1 style={{textAlign:"center", fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem", color: "#374151"}}>Welcome to the Main Page</h1>
      <p style={{textAlign:"center", fontSize: "1rem",color: "#6B7280", marginBottom: "1.5rem",}}>You are logged in as: {user.email}</p>
      <div style={styles.buttonDiv}>
      <button onClick={handleSignOut} style={styles.button}>
        Sign Out
      </button>
      </div>
    </div>
  )
}

const styles = {
  container: {
    padding: "1rem",
  },
  title: {
    textAlign:"center", 
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    color: "#374151", // Dark Gray
  },
  paragraph: {
    textAlign:"center", 
    fontSize: "1rem",
    color: "#6B7280", // Gray
    marginBottom: "1.5rem",
  },
  button: {
    marginTop: "1rem",
    backgroundColor: "#EF4444", // Red
    color: "#FFFFFF",
    fontWeight: "bold",
    padding: "0.5rem 1rem",
    borderRadius: "0.375rem",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  buttonDiv: {
    display: "flex",
    justifyContent: "center",
    // border: "1px solid red",
    marginTop: "-30px",
  },
}
