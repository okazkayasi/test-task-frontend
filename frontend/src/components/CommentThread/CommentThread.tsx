import { css } from '@emotion/react'
import { Nullable } from 'components/App/types'
import { CommentCard } from 'components/CommentCard/CommentCard'
import { COUNTRIES } from 'components/CommentThread/constants'
import { ResponseForm } from 'components/ResponseForm/ResponseForm'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { useFetchCommentWithId } from 'utils/talkToAPIFunctions'
import { ChartDataPoint, Comment, CommentThread, CommentThreadResponse } from 'utils/types'
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
  trigger,
  triggerFetch,
}: {
  commentData: CommentThread[] | null
  threadId: Nullable<string>
  dataPoint: Nullable<ChartDataPoint>
  trigger: number
  triggerFetch: () => void
}) => {
  const { data, loading } = useFetchCommentWithId(threadId, trigger)

  useEffect(() => {
    console.log('mount')
    return () => {
      console.log('unmount')
    }
  }, [])

  const titleData = {
    country: data?.chartDataPoint.country ?? dataPoint?.country,
    feature: data?.chartDataPoint.feature ?? dataPoint?.feature,
  }

  const title = !!titleData.feature && (
    <div>
      <SDataPointTitle>
        <strong>Food: </strong>
        {titleData.feature}
      </SDataPointTitle>
      {!!titleData.country && (
        <SDataPointTitle>
          <strong>Country: </strong>
          {COUNTRIES[titleData.country]}
        </SDataPointTitle>
      )}
    </div>
  )

  return (
    <SBlock>
      <div>
        <STitle>Comments</STitle>
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
                {!data?.comments?.length && <p>No comments yet</p>}
              </SStackCentered>
            )}
            {data?.comments && (
              <SStack>
                {data?.comments?.map((comment) => (
                  <CommentCard comment={comment} key={comment.userName + comment.text} />
                ))}
              </SStack>
            )}

            {(threadId || dataPoint) && (
              <ResponseForm
                title={threadId ? 'Enter a response' : 'Enter a comment'}
                threadId={threadId}
                dataPoint={dataPoint}
                triggerFetch={triggerFetch}
              />
            )}
          </SStack>
        )}
      </div>
    </SBlock>
  )
}
