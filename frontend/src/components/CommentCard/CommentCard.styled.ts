import styled from '@emotion/styled'
import { Stack } from 'lib/Stack'

export const SNameLogoWrapper = styled.div`
  padding: 1rem;
  border-radius: 50%;
  background-color: darkgray;
`
export const SCardWrapper = styled.div`
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  max-width: 20rem;
  &:not(:last-of-type) {
    margin-bottom: 1rem;
  }
  &:not(:first-of-type) {
    margin-left: 1rem;
  }
`
export const SCardStack = styled(Stack)``

export const SNameText = styled.h5`
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-transform: capitalize;
`

export const SCommentText = styled.p`
  font-size: 0.8rem;
`
