import { Nullable } from 'components/App/types'
import {
  SForm,
  SFormField,
  SInput,
  SLabel,
  STitle,
} from 'components/ResponseForm/ResponseForm.styled'
import React, { Dispatch, SetStateAction } from 'react'
import { postCreateThread, postRespondToExistingThread } from 'utils/talkToAPIFunctions'
import { ChartDataPoint } from 'utils/types'

export const ResponseForm = ({
  title,
  threadId,
  dataPoint,
  triggerFetch,
}: {
  title: string
  threadId: Nullable<string>
  dataPoint: Nullable<ChartDataPoint>
  triggerFetch: () => void
}) => {
  const postData = async (name: string, comment: string) => {
    if (threadId) {
      postRespondToExistingThread(threadId, {
        userName: name,
        text: comment,
      })
        .then(triggerFetch)
        .catch((err) => console.error(err, 'err'))
    } else if (dataPoint) {
      postCreateThread(
        {
          userName: name,
          text: comment,
        },
        dataPoint,
      )
        .then(triggerFetch)
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
    <SForm onSubmit={handleSubmit}>
      <STitle>{title}</STitle>
      <SFormField>
        <SLabel htmlFor="name">Name</SLabel> <br />
        <SInput type="text" name="name" id="name" />
      </SFormField>
      <SFormField>
        <SLabel htmlFor="comment">Comment</SLabel> <br />
        <SInput type="text" name="comment" id="comment" />
      </SFormField>
      <SFormField>
        <SLabel htmlFor=""></SLabel>
        <SInput type="submit" value="Submit" />
      </SFormField>
    </SForm>
  )
}
