import styled from '@emotion/styled'
import { BarChart } from 'components/BarChart/BarChart'
import { CommentThreadComponent } from 'components/CommentThread/CommentThread'
import { Stack } from 'lib/Stack'
import { useState } from 'react'
import { ChartDataPoint, useFetchComments } from 'utils/hooks'

const SStack = styled(Stack)`
  padding-bottom: 3rem;
`

export type Nullable<T> = T | null

function App() {
  const [threadId, setThreadId] = useState<Nullable<string>>(null)
  const [dataPoint, setDataPoint] = useState<Nullable<ChartDataPoint>>(null) // [x, y
  const { data: commentData, loading: commentLoading } = useFetchComments()

  console.log(dataPoint, 'datapoint')
  const setThreadAndDataPoint = (
    dataPoint: Nullable<ChartDataPoint>,
    threadId: Nullable<string>,
  ) => {
    setDataPoint(dataPoint)
    setThreadId(threadId)
  }

  return (
    <SStack>
      <BarChart commentData={commentData} setThreadId={setThreadId} setDataPoint={setDataPoint} />
      <CommentThreadComponent
        commentData={commentData}
        setThreadAndDataPoint={setThreadAndDataPoint}
        threadId={threadId}
        dataPoint={dataPoint}
      />
    </SStack>
  )
}

export default App
