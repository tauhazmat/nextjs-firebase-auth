"use client"

import type React from "react"
import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../lib/firebase"
import { useRouter } from "next/navigation"
import GoogleSignInButton from "./GoogleSignInButton"
import { FiMail, FiLock } from "react-icons/fi"
import Link from "next/link"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push("/")
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("auth/operation-not-allowed")) {
          setError("Email/password sign-in is not enabled. Please contact the administrator.")
        } else if (error.message.includes("auth/user-not-found") || error.message.includes("auth/wrong-password")) {
          setError("Invalid email or password")
        } else {
          setError("Failed to log in. Please try again.")
        }
      } else {
        setError("An unexpected error occurred")
      }
      console.error(error)
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F9FAFB",
        padding: "3rem 1rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "1.75rem",
            fontWeight: "bold",
            color: "#374151",
            marginBottom: "1.5rem",
          }}
        >
          Login to your account
        </h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label
              htmlFor="email"
              style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.875rem", fontWeight: "500", color: "#374151" }}
            >
              Email
            </label>
            <div style={{ position: "relative" }}>
              <FiMail style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#9CA3AF" }} size={20} />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: "85.5%",
                  padding: "0.75rem 1rem 0.75rem 2.5rem",
                  borderRadius: "0.375rem",
                  border: "1px solid #D1D5DB",
                  fontSize: "0.875rem",
                  lineHeight: "1.25rem",
                  color: "#111827",
                  backgroundColor: "#F9FAFB",
                }}
                placeholder="youremail@example.com"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.875rem", fontWeight: "500", color: "#374151" }}
            >
              Password
            </label>
            <div style={{ position: "relative" }}>
              <FiLock style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#9CA3AF" }} size={20} />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: "85.5%",
                  padding: "0.75rem 1rem 0.75rem 2.5rem",
                  borderRadius: "0.375rem",
                  border: "1px solid #D1D5DB",
                  fontSize: "0.875rem",
                  lineHeight: "1.25rem",
                  color: "#111827",
                  backgroundColor: "#F9FAFB",
                }}
                placeholder="••••••••"
              />
            </div>
          </div>
          {error && <p style={{ color: "#EF4444", fontSize: "0.875rem" }}>{error}</p>}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.75rem",
              backgroundColor: "#4F46E5",
              color: "white",
              fontWeight: "500",
              borderRadius: "0.375rem",
              fontSize: "0.875rem",
              lineHeight: "1.25rem",
              border: "none",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#4338CA")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4F46E5")}
          >
            Log In
          </button>
        </form>
        <div style={{ position: "relative", textAlign: "center", margin: "1rem 0" }}>
          <div style={{ borderBottom: "1px solid #E5E7EB", lineHeight: "0.1em", margin: "10px 0 20px" }}>
            <span style={{ background: "#fff", padding: "0 10px", color: "#6B7280", fontSize: "0.875rem" }}>
              Or continue with
            </span>
          </div>
        </div>
        <GoogleSignInButton />
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <Link href="/signup" style={{ color: "#4F46E5", textDecoration: "none", fontWeight: "500" }}>
            Don&apos;t have an account? Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}
