import { useAuth } from "components/AuthProvider"
import { PageLinks } from "components/PageLinks"
export function UserStatus() {
  const { user } = useAuth()

  return (
    <div>
      <p>
        <strong>User status: {user ? "Signed in" : "Not signed in"}</strong>
      </p>
      <div>
        {user ? (
          <div>
            <p>name: {user.name}</p>
            <p>email: {user.email}</p>
          </div>
        ) : null}
      </div>
    </div>
  )
}
