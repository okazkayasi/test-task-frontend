import { SButtonWrapper } from 'components/BarChart/BarChart.styled'
import { TOTAL_SVG_HEIGHT, TOTAL_SVG_WIDTH } from 'components/BarChart/constants'
import { SetThreadIdType, SortingType } from 'components/BarChart/types'
import { Block } from 'lib/Block'
import { useEffect, useRef, useState } from 'react'
import { drawStackedBarChart } from 'utils/drawFunctions'
import { CommentThread, useFetchChartData } from 'utils/hooks'
import { getCountryWiseMaxValue, getFoodWiseValues } from 'utils/valueFunctions'

export const BarChart = ({
  commentData,
  setThreadId,
}: {
  commentData: CommentThread[] | null
  setThreadId: SetThreadIdType
}) => {
  const ref = useRef<SVGSVGElement>(null)
  const [sorting, setSorting] = useState<SortingType>('country')
  const { data, loading } = useFetchChartData()

  useEffect(() => {
    if (data) {
      const maxValue = getCountryWiseMaxValue(data)
      const foodWiseTotalValues = getFoodWiseValues(data)
      ref.current?.replaceChildren()
      drawStackedBarChart(
        ref,
        data,
        maxValue,
        foodWiseTotalValues,
        sorting,
        commentData,
        setThreadId,
      )
    }
  }, [data, sorting, commentData, setThreadId])

  const toggleSorting = () => {
    setSorting(sorting === 'country' ? 'food' : 'country')
  }

  if (loading || !data) return <p>Nice loading animation</p>

  return (
    <Block>
      <div>
        <div>
          <h2>Bar Chart</h2>
        </div>
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
