import { css } from '@emotion/react'
import { Nullable } from 'components/App/types'
import { CommentCard } from 'components/CommentCard/CommentCard'
import { COUNTRIES } from 'components/CommentThread/constants'
import { ResponseForm } from 'components/ResponseForm/ResponseForm'
import { useFetchCommentWithId } from 'utils/talkToAPIFunctions'
import { ChartDataPoint, Comment, CommentThread } from 'utils/types'
import {
  SStack,
  SDataPointTitle,
  STitle,
  SBlock,
  SStackCentered,
} from 'components/CommentThread/CommentThread.styled'

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

  const titleData = {
    country: data?.chartDataPoint.country ?? dataPoint?.country,
    feature: data?.chartDataPoint.feature ?? dataPoint?.feature,
  }

  const title = !!titleData.feature && (
    <SDataPointTitle>
      {titleData.feature} - {!!titleData.country && COUNTRIES[titleData.country]}
    </SDataPointTitle>
  )

  return (
    <SBlock>
      <div>
        <STitle>Comment Thread</STitle>
        {loading ? (
          <p>Super nice loading component</p>
        ) : !dataPoint && !threadId && !data?.comments ? (
          <>
            <p style={{ marginTop: '1rem', textAlign: 'center' }}>
              Select data point from bar chart to add comment
            </p>
          </>
        ) : (
          <SStack>
            {(title || !data?.comments?.length) && (
              <SStackCentered>
                {title && title}
                {!data?.comments?.length && <p style={{ marginTop: '1rem' }}>No comments yet</p>}
              </SStackCentered>
            )}
            <SStack space="1.5rem">
              {data?.comments?.map((comment) => (
                <CommentCard comment={comment} key={comment.userName + comment.text} />
              ))}
            </SStack>

            {(threadId || dataPoint) && (
              <ResponseForm
                title={threadId ? 'Enter a response' : 'Enter a comment'}
                threadId={threadId}
                setCommentAndTrigger={setCommentAndTrigger}
                dataPoint={dataPoint}
              />
            )}
          </SStack>
        )}
      </div>
    </SBlock>
  )
}
