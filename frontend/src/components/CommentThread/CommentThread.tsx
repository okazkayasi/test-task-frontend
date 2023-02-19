import { CommentThread } from 'utils/hooks'

export const CommentThreadComponent = ({
  commentData,
}: {
  commentData: CommentThread[] | null
}) => {
  console.log(commentData, 'comment data')
  return (
    <div>
      <div>
        <h2>Comment Thread</h2>
      </div>
    </div>
  )
}
