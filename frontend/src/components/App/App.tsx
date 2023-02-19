import { Nullable } from 'components/App/types'
import { BarChart } from 'components/BarChart/BarChart'
import { CommentThreadComponent } from 'components/CommentThread/CommentThread'
import { SStack } from 'components/App/App.styled'
import { useState } from 'react'
import { ChartDataPoint, useFetchComments } from 'utils/hooks'

function App() {
  const [trigger, setTrigger] = useState(0)
  const [threadId, setThreadId] = useState<Nullable<string>>(null)
  const [dataPoint, setDataPoint] = useState<Nullable<ChartDataPoint>>(null) // [x, y
  const { data: commentData, loading: commentLoading } = useFetchComments(trigger)

  console.log(dataPoint, 'datapoint')
  const setThreadAndDataPoint = (
    dataPoint: Nullable<ChartDataPoint>,
    threadId: Nullable<string>,
  ) => {
    setDataPoint(dataPoint)
    setThreadId(threadId)

    // defensive programming in case you click 9007199254740991 2^53 − 1 times :)
    setTrigger((prev) => (prev === Number.MAX_SAFE_INTEGER ? 0 : prev + 1))
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
