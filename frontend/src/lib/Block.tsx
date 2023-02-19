import styled from '@emotion/styled'
import { BREAKPOINTS } from 'utils/styled'

const width = `${BREAKPOINTS.LG.size}px`
export const minSpace = `5vw`

export const maxSpace = `calc((100% - ${width}) / 2)`

export const Block = styled.div`
  display: grid;
  grid-template-columns: minmax(${minSpace}, ${maxSpace}) minmax(0, 1fr) minmax(
      ${minSpace},
      ${maxSpace}
    );
  grid-template-areas: 'left center right';
  align-items: flex-start;

  &:before,
  &:after {
    content: '';
  }
`
