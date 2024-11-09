import { prisma } from "@/lib/prismadb"
import { formatRelative } from "date-fns"
import { zhCN } from "date-fns/locale"

type CommentsProps = {
  postId: string
}

const Comments = async ({ postId }: CommentsProps) => {
  const comments = await prisma.comment.findMany({
    where: {
      postId,
    },
    orderBy: {
      createdAt: "asc",
    },
    include: {
      author: true,
    },
  })

  return (
    <div className='mt-8'>
      <h2 className='text-2xl font-bold'>Comments</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id} className='mb-4 bg-slate-300 p-2'>
            <div className='flex items-center mb-2 text-sm'>
              <div className='text-blue-500 font-bold mr-2'>
                {comment.author?.name}
              </div>
              <div className='text-gray-500 text-xs'>
                {formatRelative(comment.createdAt, new Date(), {
                  locale: zhCN,
                })}
              </div>
            </div>
            <p>{comment.text}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Comments
