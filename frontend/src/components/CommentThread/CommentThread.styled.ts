import styled from '@emotion/styled'
import { Block } from 'lib/Block'
import { Stack } from 'lib/Stack'

export const SBlock = styled(Block)`
  margin-bottom: 2rem;
`
export const SStack = styled(Stack)`
  margin-top: 1rem;
  & > *:not(:last-child) {
    margin-bottom: 1rem;
  }
`
export const SStackCentered = styled(SStack)`
  align-items: center;
`

export const STitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
`
export const SDataPointTitle = styled.h3`
  text-transform: capitalize;
`
