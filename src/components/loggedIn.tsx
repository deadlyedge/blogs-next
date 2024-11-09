"use client"

import { signOut, useSession } from "next-auth/react"
import Image from "next/image"

const LoggedIn = () => {
  const { data: session } = useSession()

  if (!session?.user) return null

  return (
    <button
      onClick={() => signOut()}
      className='text-white hover:underline flex items-center justify-center'>
      <Image
        src={session.user.image || ""}
        alt='User Avatar'
        width={40}
        height={40}
        className='rounded-full'
      />
      Logout
    </button>
  )
}

export default LoggedIn
