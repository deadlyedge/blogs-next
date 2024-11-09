"use client"

import { signOut, useSession } from "next-auth/react"

const LoggedIn = () => {
  const { data: session } = useSession()

  if (!session?.user) return null

  return (
    <button onClick={() => signOut()} className='text-white hover:underline flex items-center justify-center'>
      <img
        src={session.user.image || ""}
        alt='User Avatar'
        width={32}
        className='rounded-full'
      />
      Logout
    </button>
  )
}

export default LoggedIn
