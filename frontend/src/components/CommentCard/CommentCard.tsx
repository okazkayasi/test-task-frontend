import {
  SCardStack,
  SCardWrapper,
  SCommentText,
  SNameLogoWrapper,
  SNameText,
} from 'components/CommentCard/CommentCard.styled'
import { HStack, Stack } from 'lib/Stack'
import { Comment } from 'utils/hooks'

const NameLogo = ({ name }: { name: string }) => {
  const nameShort = name[0]
  return (
    <SNameLogoWrapper>
      <p style={{ textTransform: 'capitalize' }}>{nameShort}</p>
    </SNameLogoWrapper>
  )
}

export const CommentCard = ({ comment }: { comment: Comment }) => {
  return (
    <SCardWrapper>
      <SCardStack>
        <HStack>
          <NameLogo name={comment.userName} />
          <Stack>
            <SNameText>{comment.userName}</SNameText>
            <SCommentText>{comment.text}</SCommentText>
          </Stack>
        </HStack>
      </SCardStack>
    </SCardWrapper>
  )
}
