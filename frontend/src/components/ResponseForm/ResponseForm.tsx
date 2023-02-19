import { useState } from 'react'
import { postRespondToExistingThread } from 'utils/hooks'

export const ResponseForm = ({ threadId }: { threadId: string }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      name: { value: string }
      comment: { value: string }
    }
    const name = target.name.value
    const comment = target.comment.value
    console.log(name, comment, 'name comment')
    postRespondToExistingThread(threadId, {
      userName: name,
      text: comment,
    })
  }
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name</label> <br />
        <input type="text" name="name" id="name" />
      </div>
      <div>
        <label htmlFor="comment">Comment</label> <br />
        <textarea name="comment" id="comment" />
      </div>
      <button>Submit</button>
    </form>
  )
}
