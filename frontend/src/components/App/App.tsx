import { BarChart } from 'components/BarChart/BarChart'
import { CommentThreadComponent } from 'components/CommentThread/CommentThread'
import { HStack } from 'lib/Stack'
import { useState } from 'react'
import { useFetchComments } from 'utils/hooks'

function App() {
  const [threadId, setThreadId] = useState<string | null>(null)
  const { data: commentData, loading: commentLoading } = useFetchComments()

  console.log(threadId, 'thread Id')

  return (
    <HStack>
      <BarChart commentData={commentData} setThreadId={setThreadId} />
      <CommentThreadComponent commentData={commentData} />
    </HStack>
  )
}

export default App
