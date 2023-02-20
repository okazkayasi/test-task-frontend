import styled from '@emotion/styled'
import { Block } from 'lib/Block'
import { Stack } from 'lib/Stack'

export const SBlock = styled(Block)`
  margin-bottom: 2rem;
`
export const SStack = styled(Stack)`
  margin-top: 0.5rem;
  & > *:not(:last-child) {
    margin-bottom: 0.5rem;
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
  margin-bottom: 0.5rem;
  text-align: left;
  strong {
    font-weight: 700;
  }
`
