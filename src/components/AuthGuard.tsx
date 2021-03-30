import { useAuth } from "components/AuthProvider"
import { useRouter } from "next/router"
import { useEffect } from "react"

export function AuthGuard({ children }: { children: JSX.Element }) {
  const { user, initializing, setRedirect } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!initializing) {
      //auth is initialized and there is no user
      if (!user) {
        setRedirect(router.route)
        router.push("/signin")
      }
    }
  }, [initializing, router, user, setRedirect])

  if (initializing) {
    return <h1>Application Loading</h1>
  }

  if (!initializing && user) {
    return <>{children}</>
  }

  return null
}
