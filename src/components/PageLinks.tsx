import Link from "next/link"
import { useRouter } from "next/router"

const links = [
  { text: "index", route: "/" },
  { text: "public", route: "/public" },
  { text: "protected one", route: "/protected" },
  { text: "protected two", route: "/protected-two" },
  { text: "sign in", route: "/signin" },
  { text: "sign out", route: "/signout" },
]
export function PageLinks() {
  const router = useRouter()

  return (
    <div>
      <ul>
        {links.map((link) =>
          router.route !== link.route ? (
            <li key={link.route}>
              <Link href={link.route}>{link.text}</Link>
            </li>
          ) : null
        )}
      </ul>
    </div>
  )
}
