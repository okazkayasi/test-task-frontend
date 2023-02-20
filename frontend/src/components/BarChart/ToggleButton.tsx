import styled from '@emotion/styled'
import { SortingType } from 'components/BarChart/types'

const SButton = styled.button`
  background-color: #0a0a23;
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 15px;
  min-height: 30px;
  min-width: 120px;
  cursor: pointer;
`
export const ToggleButton = ({
  sorting,
  toggleSorting,
}: {
  sorting: SortingType
  toggleSorting: () => void
}) => (
  <SButton onClick={toggleSorting}>
    Set to {sorting === 'food' ? 'country' : 'food'}-based sorting
  </SButton>
)
