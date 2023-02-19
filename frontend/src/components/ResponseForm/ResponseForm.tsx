import { Nullable } from 'components/App/types'
import React from 'react'
import { postCreateThread, postRespondToExistingThread } from 'utils/talkToAPIFunctions'
import { ChartDataPoint, Comment } from 'utils/types'

export const ResponseForm = ({
  threadId,
  dataPoint,
  setCommentAndTrigger,
}: {
  threadId: Nullable<string>
  dataPoint: Nullable<ChartDataPoint>
  setCommentAndTrigger: (comment: Comment[]) => void
}) => {
  const postData = async (name: string, comment: string) => {
    if (threadId) {
      postRespondToExistingThread(threadId, {
        userName: name,
        text: comment,
      })
        .then((comments) => {
          setCommentAndTrigger(comments)
        })
        .catch((err) => console.error(err, 'err'))
    } else if (dataPoint) {
      postCreateThread(
        {
          userName: name,
          text: comment,
        },
        dataPoint,
      )
        .then((comments) => {
          setCommentAndTrigger(comments)
        })
        .catch((err) => console.error(err, 'err'))
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
