"use client"

import axios from "axios"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

type FormCommentProps = {
  postId: string
}

const FormComment = ({ postId }: FormCommentProps) => {
  const [comment, setComment] = useState("")
  const router = useRouter()
  const { data } = useSession()

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value)
  }

  const handleCommentSubmit = async () => {
    if (comment.trim() !== "") {
      try {
        const newComment = await axios.post("/api/comments", {
          postId,
          text: comment,
        })
        if (newComment.status === 200) {
          router.refresh()
        }
      } catch (error) {
        console.log(error)
      } finally {
        setComment("")
      }
    }
  }

  return (
    <div>
      <div className='mt-4'>
        <label
          htmlFor='comment'
          className='block text-gray-700 text-sm font-bold mb-2'>
          Add Comment
        </label>
        <input
          type='text'
          className='w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300'
          name='comment'
          value={comment}
          onChange={handleCommentChange}
        />
        <button
          disabled={!data?.user?.email}
          onClick={handleCommentSubmit}
          className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mt-2 disabled:bg-gray-400'>
          Submit Comment
        </button>
      </div>
    </div>
  )
}

export default FormComment
