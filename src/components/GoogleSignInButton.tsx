"use client"
import { signInWithPopup } from "firebase/auth"
import { auth, googleProvider } from "../lib/firebase"
import { useRouter } from "next/navigation"
import { FcGoogle } from "react-icons/fc"

const styles = {
  button: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0.75rem 1rem",
    border: "1px solid #D1D5DB",
    borderRadius: "0.375rem",
    backgroundColor: "#FFFFFF",
    color: "#4B5563",
    fontSize: "0.875rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s ease-in-out",
  },
  buttonHover: {
    backgroundColor: "#F3F4F6",
  },
  icon: {
    width: "20px",
    height: "20px",
    marginRight: "0.5rem",
  },
}

export default function GoogleSignInButton() {
  const router = useRouter()

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
      router.push("/")
    } catch (error) {
      console.error("Error signing in with Google", error)
    }
  }

  return (
    <button
      onClick={handleGoogleSignIn}
      style={styles.button}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FFFFFF")}
    >
      <FcGoogle style={styles.icon} />
      Continue with Google
    </button>
  )
}
