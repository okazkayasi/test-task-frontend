import { Nullable } from 'components/App/types'
import { BarChart } from 'components/BarChart/BarChart'
import { CommentThreadComponent } from 'components/CommentThread/CommentThread'
import { SStack } from 'components/App/App.styled'
import { useEffect, useState } from 'react'
import { useFetchComments } from 'utils/hooks'
import { ChartDataPoint } from 'utils/types'

function App() {
  const [trigger, setTrigger] = useState(0)
  const [threadId, setThreadId] = useState<Nullable<string>>(null)
  const [dataPoint, setDataPoint] = useState<Nullable<ChartDataPoint>>(null) // [x, y
  const { data: commentData } = useFetchComments(trigger)

  const triggerFetch = () => {
    setTrigger((prev) => (prev === Number.MAX_SAFE_INTEGER ? 0 : prev + 1))
  }

  return (
    <SStack>
      <BarChart commentData={commentData} setThreadId={setThreadId} setDataPoint={setDataPoint} />
      <CommentThreadComponent
        commentData={commentData}
        threadId={threadId}
        dataPoint={dataPoint}
        triggerFetch={triggerFetch}
        trigger={trigger}
      />
    </SStack>
  )
}

export default App
