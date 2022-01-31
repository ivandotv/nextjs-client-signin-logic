import { useAuth } from "components/AuthProvider"
import { UserStatus } from "components/UserStatus"
import { useRouter } from "next/router"
import React, { useEffect, useRef, useState } from "react"

const defaultEmail = "admin@example.com"
const defaultPassword = "admin123"

export default function SignIn() {
  const { auth, initializing, getRedirect, clearRedirect, user, error } =
    useAuth()
  const [email, setEmail] = useState<string>(defaultEmail)
  const [pswd, setPswd] = useState<string>(defaultPassword)
  const [signInInProgress, setInProgress] = useState(false)
  const mounted = useRef<boolean>()
  const router = useRouter()

  /* Guard if page is navigated away while sign in process is still active */
  useEffect(() => {
    mounted.current = true

    return () => {
      mounted.current = false
    }
  }, [])

  useEffect(() => {
    if (!initializing) {
      if (user) {
        const redirect = getRedirect()
        if (redirect) {
          router.push(redirect) // go to page which redirected to login
          clearRedirect()
        } else {
          router.push("/protected") // go to default protected page
        }
      }
    }
  }, [router, getRedirect, clearRedirect, initializing, user])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (email && pswd) {
      try {
        setInProgress(true)
        await auth.signIn(email, pswd, 2000)
      } catch (error) {
        if (mounted.current) {
          setInProgress(false)
        }
      }
    } else {
      console.log("email or password is empty")
    }
  }

  const handleEmail = function (e: React.FormEvent<HTMLInputElement>) {
    setEmail(e.currentTarget.value)
  }
  const handlePswd = function (e: React.FormEvent<HTMLInputElement>) {
    setPswd(e.currentTarget.value)
  }

  if (initializing) {
    return <h1>Application Loading </h1>
  }
  if (signInInProgress) {
    return <h1>Signing in progress</h1>
  }

  return (
    <>
      <h1>Sign In</h1>
      <UserStatus />
      {!user ? ( // there is no user, show sign in form
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              Email:
              <input type="email" value={email} onChange={handleEmail} />
            </label>
            <br />
            <label>
              Password:
              <input
                type="password"
                required
                value={pswd}
                onChange={handlePswd}
              />
            </label>
            <input type="submit" required value="Submit" />
          </form>
          {error ? (
            <div>
              <p>Sign in error:</p>
              <p>{error.message}</p>
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  )
}
