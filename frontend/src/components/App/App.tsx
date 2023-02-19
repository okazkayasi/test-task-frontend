import { Nullable } from 'components/App/types'
import { BarChart } from 'components/BarChart/BarChart'
import { CommentThreadComponent } from 'components/CommentThread/CommentThread'
import { SStack } from 'components/App/App.styled'
import { useState } from 'react'
import { useFetchComments } from 'utils/talkToAPIFunctions'
import { ChartDataPoint } from 'utils/types'

function App() {
  const [trigger, setTrigger] = useState(0)
  const [threadId, setThreadId] = useState<Nullable<string>>(null)
  const [dataPoint, setDataPoint] = useState<Nullable<ChartDataPoint>>(null) // [x, y
  const { data: commentData } = useFetchComments(trigger)
  const triggerFetch = () => {
    setTrigger((prev) => (prev === Number.MAX_SAFE_INTEGER ? 0 : prev + 1))
  }
  const matchingThreadId =
    commentData?.find(
      (commentThread) =>
        commentThread.chartDataPoint.country === dataPoint?.country &&
        commentThread.chartDataPoint.feature === dataPoint?.feature,
    )?.id ?? null

  return (
    <SStack>
      <BarChart commentData={commentData} setThreadId={setThreadId} setDataPoint={setDataPoint} />
      <CommentThreadComponent
        commentData={commentData}
        threadId={threadId ?? matchingThreadId}
        dataPoint={dataPoint}
        triggerFetch={triggerFetch}
        trigger={trigger}
      />
    </SStack>
  )
}

export default App
