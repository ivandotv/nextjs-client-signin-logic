import { PageLinks } from "components/PageLinks"
import { UserStatus } from "components/UserStatus"

export default function Protected() {
  return (
    <div>
      <h1>Protected Page One</h1>
      <UserStatus />
      <PageLinks />
    </div>
  )
}

Protected.requireAuth = true
