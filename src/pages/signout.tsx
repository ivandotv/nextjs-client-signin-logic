import { useAuth } from "components/AuthProvider"
import { PageLinks } from "components/PageLinks"
import { useEffect } from "react"

export default function SignOut() {
  const { auth } = useAuth()

  useEffect(() => {
    auth.signOut()
  }, [auth])

  return (
    <div>
      <p>You have been signed out:</p>
      <PageLinks />
    </div>
  )
}
