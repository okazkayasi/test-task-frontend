import styled from '@emotion/styled'
import { Nullable } from 'components/App/types'
import { CommentCard } from 'components/CommentCard/CommentCard'
import { ResponseForm } from 'components/ResponseForm/ResponseForm'
import { Block } from 'lib/Block'
import { Stack } from 'lib/Stack'
import { useEffect, useState } from 'react'
import {
  ChartDataPoint,
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
  setThreadAndDataPoint,
  threadId,
  dataPoint,
}: {
  commentData: CommentThread[] | null
  setThreadAndDataPoint: (dataPoint: Nullable<ChartDataPoint>, threadId: Nullable<string>) => void
  threadId: Nullable<string>
  dataPoint: Nullable<ChartDataPoint>
}) => {
  const { data, loading } = useFetchCommentWithId(threadId)
  const [comments, setComments] = useState(data?.comments || [])

  console.log(data, 'data in thread')

  useEffect(() => {
    setComments(data?.comments || [])
  }, [data])

  return (
    <Block>
      <div>
        <h2>Comment Thread</h2>
        {loading ? (
          <p>Super nice loading component</p>
        ) : !dataPoint && !threadId ? (
          <p>Select a data point from bar chart</p>
        ) : (
          <SStack>
            <SStack space="1.5rem">
              {comments?.map((comment) => (
                <CommentCard comment={comment} />
              ))}
            </SStack>
            {(threadId || dataPoint) && (
              <ResponseForm threadId={threadId} setComments={setComments} dataPoint={dataPoint} />
            )}
          </SStack>
        )}
      </div>
    </Block>
  )
}
