import { Nullable } from 'components/App/App'
import React from 'react'
import { ChartDataPoint, Comment, postRespondToExistingThread } from 'utils/hooks'

export const ResponseForm = ({
  threadId,
  dataPoint,
  setComments,
}: {
  threadId: Nullable<string>
  dataPoint: Nullable<ChartDataPoint>
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>
}) => {
  const postData = async (name: string, comment: string) => {
    if (threadId) {
      postRespondToExistingThread(threadId, {
        userName: name,
        text: comment,
      })
        .then((comments) => {
          console.log(comments, 'post response comments')
          setComments(comments)
        })
        .catch((err) => console.error(err, 'err'))
    } else if (dataPoint) {
    }
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      name: { value: string }
      comment: { value: string }
    }
    const name = target.name.value
    const comment = target.comment.value

    postData(name, comment)
      .then(() => {
        target.name.value = ''
        target.comment.value = ''
      })
      .catch((err) => console.error(err))
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
