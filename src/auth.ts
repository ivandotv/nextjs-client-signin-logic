// let signleton: Auth

// export function createAuth() {
//   if (signleton) return signleton
//   return new Auth()
// }

export type UserCB = (user: User) => void

const userEmail = `admin@example.com`
const userPassword = "admin123"

export type User = {
  email: string
  name: string
  token: string
}

export class Auth {
  user: User

  error: { message: string; code: number } | null

  cb: UserCB

  constructor() {
    console.log("auth constructor")
    this.user = null
    this.error = null
  }

  onAuthStateChanged(cb: UserCB) {
    this.cb = cb

    return () => {
      this.cb = null
    }
  }

  protected onUserChange(user: User | null) {
    this.cb && this.cb(user)
  }

  signIn(email: string, password: string, delay = 2000) {
    console.log(`Sign in with email: ${email} password: ${password}`)

    return new Promise((resolve, reject) => {
      if (email !== userEmail || password !== userPassword) {
        reject({ message: "Wrong email or password" })
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
