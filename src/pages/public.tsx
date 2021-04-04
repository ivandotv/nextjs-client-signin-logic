import { useAuth } from "components/AuthProvider"
import { PageLinks } from "components/PageLinks"
import React from "react"

export default function Public() {
  const { user } = useAuth()

  return (
    <>
      <h1>Public page</h1>
      <p>This page is accessible to everone.</p>
      <p>
        <strong>User status: {user ? "Signed in" : "Not signed in"}</strong>
      </p>
      <PageLinks />
    </>
  )
}
