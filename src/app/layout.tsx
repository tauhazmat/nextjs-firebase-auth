"use client"

import { useAuth } from "../hooks/useAuth"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"
import Head from "next/head" // Import Head to modify the document's head
import type React from "react"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (user && (pathname === "/login" || pathname === "/signup")) {
      router.push("/")
    } else if (!user && pathname !== "/login" && pathname !== "/signup") {
      router.push("/login")
    }
  }, [user, pathname, router])

  return (
    <html lang="en">
      <Head>
        <title>Tauha AUTH FireBase</title> {/* Change title here */}
        <meta name="description" content="Your website description here" />
      </Head>
      <body>{children}</body>
    </html>
  )
}
