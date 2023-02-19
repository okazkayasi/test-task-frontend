import { SButtonWrapper } from 'components/BarChart/BarChart.styled'
import { TOTAL_SVG_HEIGHT, TOTAL_SVG_WIDTH } from 'components/BarChart/constants'
import { SetDataPointType, SetThreadIdType, SortingType } from 'components/BarChart/types'
import { Block } from 'lib/Block'
import { useEffect, useRef, useState } from 'react'
import { drawStackedBarChart } from 'utils/drawFunctions'
import { useFetchChartData } from 'utils/hooks'
import { CommentThread } from 'utils/types'
import { getCountryWiseMaxValue, getFoodWiseValues } from 'utils/valueFunctions'

export const BarChart = ({
  commentData,
  setThreadId,
  setDataPoint,
}: {
  commentData: CommentThread[] | null
  setThreadId: SetThreadIdType
  setDataPoint: SetDataPointType
}) => {
  const ref = useRef<SVGSVGElement>(null)
  const [sorting, setSorting] = useState<SortingType>('country')
  const { data, loading } = useFetchChartData()

  const setData = {
    threadId: setThreadId,
    dataPoint: setDataPoint,
  }

  useEffect(() => {
    if (data) {
      const maxValue = getCountryWiseMaxValue(data)
      const foodWiseTotalValues = getFoodWiseValues(data)
      ref.current?.replaceChildren()
      drawStackedBarChart(ref, data, maxValue, foodWiseTotalValues, sorting, commentData, setData)
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
