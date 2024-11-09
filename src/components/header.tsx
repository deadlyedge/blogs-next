import { getCurrentUser } from "@/lib/session"
import Link from "next/link"
import LoggedIn from "./loggedIn"

const Header = async () => {
  const user = await getCurrentUser()

  return (
    <header className='bg-blue-500 p-4'>
      <nav className='flex items-center justify-between max-w-4xl mx-auto'>
        <Link href='/' className='text-white text-2xl font-bold'>
          My Blog
        </Link>

        <ul className='flex items-center justify-center space-x-4'>
          <li>
            <Link href='/blogs' className='text-white hover:underline'>
              Blogs
            </Link>
          </li>
          <li>
            {user?.name ? (
              <LoggedIn />
            ) : (
              <Link
                href='/api/auth/signin'
                className='text-white hover:underline'>
                login
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
