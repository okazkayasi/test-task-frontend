import styled from '@emotion/styled'
import { Block } from 'lib/Block'
import { useEffect, useRef, useState } from 'react'
import { drawStackedBarChart } from 'utils/drawFunctions'
import { getCountryWiseMaxValue, getFoodWiseValues } from 'utils/valueFunctions'
import { CommentThread, useFetchChartData, useFetchComments } from 'utils/hooks'

export const BAR_CHART_HEIGHT = 400
export const BAR_CHART_WIDTH = 600
export const PADDING_BELOW = 200
export const PADDING_LEFT = 50

export const TOTAL_SVG_HEIGHT = BAR_CHART_HEIGHT + PADDING_BELOW
export const TOTAL_SVG_WIDTH = BAR_CHART_WIDTH + PADDING_LEFT

export type SortingType = 'country' | 'food'

const SButtonWrapper = styled.div`
  margin-bottom: 2rem;
`
export const BarChart = ({ commentData }: { commentData: CommentThread[] | null }) => {
  const ref = useRef<SVGSVGElement>(null)
  const [sorting, setSorting] = useState<SortingType>('country')
  const { data, loading } = useFetchChartData()

  useEffect(() => {
    if (data) {
      const maxValue = getCountryWiseMaxValue(data)
      const foodWiseTotalValues = getFoodWiseValues(data)
      ref.current?.replaceChildren()
      drawStackedBarChart(ref, data, maxValue, foodWiseTotalValues, sorting, commentData)
    }
  }, [data, sorting])

  const toggleSorting = () => {
    setSorting(sorting === 'country' ? 'food' : 'country')
  }

  if (loading || !data) return <p>Nice loading animation</p>

  return (
    <Block>
      <div>
        <div>Bar Chart</div>
        <SButtonWrapper>
          <button onClick={toggleSorting}>
            Set to {sorting === 'food' ? 'country' : 'food'}-based sorting
          </button>
        </SButtonWrapper>
        <svg width={TOTAL_SVG_WIDTH} height={TOTAL_SVG_HEIGHT} ref={ref} />
      </div>
    </Block>
  )
}
