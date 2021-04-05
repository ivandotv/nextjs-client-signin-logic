import { useAuth } from "components/AuthProvider"
import { PageLinks } from "components/PageLinks"
import { UserStatus } from "components/UserStatus"
import { useEffect } from "react"

export default function SignOut() {
  const { auth } = useAuth()

  useEffect(() => {
    auth.signOut()
  }, [auth])

  return (
    <div>
      <h1>Sign Out</h1>
      <p>You have been signed out:</p>
      <UserStatus />
      <PageLinks />
    </div>
  )
}
