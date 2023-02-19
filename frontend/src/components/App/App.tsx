import styled from '@emotion/styled'
import { BarChart } from 'components/BarChart/BarChart'
import { CommentThreadComponent } from 'components/CommentThread/CommentThread'
import { Stack } from 'lib/Stack'
import { useState } from 'react'
import { useFetchComments } from 'utils/hooks'

const SStack = styled(Stack)`
  padding-bottom: 3rem;
`
function App() {
  const [threadId, setThreadId] = useState<string | null>(null)
  const { data: commentData, loading: commentLoading } = useFetchComments()

  return (
    <SStack>
      <BarChart commentData={commentData} setThreadId={setThreadId} />
      <CommentThreadComponent commentData={commentData} threadId={threadId} />
    </SStack>
  )
}

export default App
