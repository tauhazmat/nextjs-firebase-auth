"use client"

import { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../lib/firebase"
import { useRouter } from "next/navigation"
import GoogleSignInButton from "./GoogleSignInButton"
import { FiMail, FiLock } from "react-icons/fi"
import Link from "next/link"

export default function SignUpForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      router.push("/")
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("auth/email-already-in-use")) {
          setError("Email is already in use")
        } else if (error.message.includes("auth/weak-password")) {
          setError("Password is too weak")
        } else {
          setError("Failed to create an account. Please try again.")
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
        padding: "2rem",
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
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "1.75rem",
            fontWeight: "bold",
            color: "#374151",
            marginBottom: "1.5rem",
          }}
        >
          Create a new account
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {/* Email Input */}
          <div style={{ textAlign: "left" }}>
            <label htmlFor="email" style={{ fontSize: "0.875rem", fontWeight: "500", color: "#374151" }}>
              Email
            </label>
            <div style={{ position: "relative", marginTop: "0.25rem" }}>
              <FiMail
                style={{
                  position: "absolute",
                  left: "0.75rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#9CA3AF",
                }}
              />
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
                  backgroundColor: "#F9FAFB",
                  outline: "none",
                }}
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Password Input */}
          <div style={{ textAlign: "left" }}>
            <label htmlFor="password" style={{ fontSize: "0.875rem", fontWeight: "500", color: "#374151" }}>
              Password
            </label>
            <div style={{ position: "relative", marginTop: "0.25rem" }}>
              <FiLock
                style={{
                  position: "absolute",
                  left: "0.75rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#9CA3AF",
                }}
              />
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
                  backgroundColor: "#F9FAFB",
                  outline: "none",
                }}
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && <p style={{ color: "#EF4444", fontSize: "0.875rem" }}>{error}</p>}

          {/* Sign Up Button */}
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
              border: "none",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#4338CA")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4F46E5")}
          >
            Sign Up
          </button>
        </form>

        {/* OR Separator */}
        <div style={{ position: "relative", textAlign: "center", marginTop: "1rem" }}>
          <div style={{ borderBottom: "1px solid #E5E7EB", lineHeight: "0.1em", margin: "10px 0 20px" }}>
            <span style={{ background: "#fff", padding: "0 10px", color: "#6B7280", fontSize: "0.875rem" }}>
              Or continue with
            </span>
          </div>
        </div>

        {/* Google Sign-In Button */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
          <GoogleSignInButton />
        </div>

        {/* Login Link */}
        <p style={{ marginTop: "1rem", fontSize: "0.875rem", color: "#6B7280" }}>
          Already have an account?{" "}
          <Link
            href="/login"
            style={{
              fontWeight: "500",
              color: "#4F46E5",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = "#4338CA")}
            onMouseOut={(e) => (e.currentTarget.style.color = "#4F46E5")}
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}
