import styled from '@emotion/styled'
import { CommentCard } from 'components/CommentCard/CommentCard'
import { ResponseForm } from 'components/ResponseForm/ResponseForm'
import { Block } from 'lib/Block'
import { Stack } from 'lib/Stack'
import { useEffect, useState } from 'react'
import {
  Comment,
  CommentThread,
  postRespondToExistingThread,
  useFetchCommentWithId,
} from 'utils/hooks'

const SStack = styled(Stack)`
  margin-top: 1rem;
`
export const CommentThreadComponent = ({
  commentData,
  threadId,
}: {
  commentData: CommentThread[] | null
  threadId: string | null
}) => {
  const { data, loading } = useFetchCommentWithId(threadId)
  const [comments, setComments] = useState(data?.comments || [])

  console.log(data, 'data in thread')

  useEffect(() => {
    setComments(data?.comments || [])
  }, [data])

  const sendResponse = () => {
    if (data?.id) {
      postRespondToExistingThread(data.id, {
        userName: 'oguz',
        text: 'example response',
      }).then(
        (res) => console.log(res, 'res'),
        (err) => console.log(err, 'err'),
      )
    }
  }
  return (
    <Block>
      <div>
        <h2>Comment Thread</h2>
        {loading ? (
          <p>Super nice loading component</p>
        ) : !data || !comments ? (
          <p>Super nice no data component</p>
        ) : (
          <SStack>
            <SStack space="1.5rem">
              {comments?.map((comment) => (
                <CommentCard comment={comment} />
              ))}
            </SStack>
            {threadId && <ResponseForm threadId={threadId} setComments={setComments} />}
          </SStack>
        )}
      </div>
    </Block>
  )
}
