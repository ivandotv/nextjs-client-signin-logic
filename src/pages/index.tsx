import { useAuth } from "components/AuthProvider"
import { PageLinks } from "components/PageLinks"

export default function Home() {
  const { user } = useAuth()

  return (
    <div>
      <h1>Index</h1>
      <p>All pages have access to user data.</p>
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
        <PageLinks />
      </div>
    </div>
  )
}
