import { BarChart } from 'components/BarChart/BarChart'
import { CommentThread } from 'components/CommentThread/CommentThread'
import { HStack } from 'lib/Stack'
import { useFetchComments } from 'utils/hooks'

function App() {
  const { data: commentData, loading: commentLoading } = useFetchComments()

  return (
    <HStack>
      <BarChart commentData={commentData} />
      <CommentThread />
    </HStack>
  )
}

export default App
