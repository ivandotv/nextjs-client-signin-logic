import { useAuth } from "components/AuthProvider"
import { PageLinks } from "components/PageLinks"
import { UserStatus } from "components/UserStatus"
import React from "react"

export default function Public() {
  const { user } = useAuth()

  return (
    <>
      <h1>Public page</h1>
      <p>This page is accessible to everyone.</p>
      <UserStatus />
      <PageLinks />
    </>
  )
}
