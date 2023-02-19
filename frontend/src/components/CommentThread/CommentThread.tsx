import styled from '@emotion/styled'
import { Nullable } from 'components/App/types'
import { CommentCard } from 'components/CommentCard/CommentCard'
import { ResponseForm } from 'components/ResponseForm/ResponseForm'
import { Block } from 'lib/Block'
import { Stack } from 'lib/Stack'
import { useEffect, useState } from 'react'
import { postRespondToExistingThread, useFetchCommentWithId } from 'utils/talkToAPIFunctions'
import { ChartDataPoint, Comment, CommentThread } from 'utils/types'

const SStack = styled(Stack)`
  margin-top: 1rem;
`
export const CommentThreadComponent = ({
  commentData,
  threadId,
  dataPoint,
  triggerFetch,
  trigger,
}: {
  commentData: CommentThread[] | null
  threadId: Nullable<string>
  dataPoint: Nullable<ChartDataPoint>
  triggerFetch: () => void
  trigger: number
}) => {
  const { data, loading } = useFetchCommentWithId(threadId, trigger)

  const setCommentAndTrigger = (comments: Comment[]) => {
    triggerFetch()
  }

  return (
    <Block>
      <div>
        <h2>Comment Thread</h2>
        {loading ? (
          <p>Super nice loading component</p>
        ) : !dataPoint && !threadId && !data?.comments ? (
          <p>Select a data point from bar chart</p>
        ) : (
          <SStack>
            <SStack space="1.5rem">
              {data?.comments?.map((comment) => (
                <CommentCard comment={comment} />
              ))}
            </SStack>
            {(threadId || dataPoint) && (
              <ResponseForm
                threadId={threadId}
                setCommentAndTrigger={setCommentAndTrigger}
                dataPoint={dataPoint}
              />
            )}
          </SStack>
        )}
      </div>
    </Block>
  )
}
