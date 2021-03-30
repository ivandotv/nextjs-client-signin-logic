export type UserCB = (user: User, error: any) => void

const userEmail = `admin@example.com`
const userPassword = "admin123"

export type User = {
  email: string
  name: string
  token: string
}

export class Auth {
  user: User

  error: { message: string } | null

  cb: UserCB

  constructor() {
    this.user = null
    this.error = null
  }

  onAuthStateChanged(cb: UserCB) {
    this.cb = cb

    return () => {
      this.cb = null
    }
  }

  protected onUserChange(user: User | null, error?: { message: string }) {
    this.cb && this.cb(user, error)
  }

  signIn(email: string, password: string, delay = 2000) {
    console.log(`Sign in with email: ${email} password: ${password}`)

    return new Promise((resolve, reject) => {
      if (email !== userEmail || password !== userPassword) {
        const error = { message: "Wrong email or password" }
        this.error = error
        reject(error)
        this.onUserChange(null, this.error)

        return
      }

      setTimeout(() => {
        this.user = {
          name: "Ivan",
          email,
          token: "dfasdfadsf.asdfasdf.afsdfasd",
        }

        window.sessionStorage.setItem("user", JSON.stringify(this.user))
        this.onUserChange(this.user)
        resolve(this.user)
      }, delay)
    })
  }

  signOut() {
    console.log("sign out")
    window.sessionStorage.removeItem("user")
    this.user = null
    this.onUserChange(this.user)
  }

  resolveUser(timeout: number) {
    setTimeout(() => {
      if (window) {
        const signedInUser = window.sessionStorage.getItem("user")
        if (signedInUser) {
          this.user = JSON.parse(signedInUser)
        }
      } else {
        this.user = null
      }
      this.onUserChange(this.user)
    }, timeout)

    return this
  }
}
