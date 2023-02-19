import styled from '@emotion/styled'

export const Stack = styled.div<{ gap?: string; space?: string }>`
  display: flex;
  break-inside: avoid;
  flex-direction: column;
  ${({ gap }) => (!gap ? 0 : gap)}
  & > *:not(:last-child) {
    margin-bottom: ${({ space }) => (!space ? '0.75rem' : space)};
  }
`

export const HStack = styled(Stack)`
  flex-direction: row;
  & > *:not(:last-child) {
    margin-bottom: 0;
    margin-right: ${({ space }) => (!space ? '0.75rem' : space)};
  }
`
