import { Block } from 'lib/Block'
import { useEffect, useRef, useState } from 'react'
import { drawStackedBarChart } from 'utils/drawFunctions'
import { getCountryWiseMaxValue, getFoodWiseValues } from 'utils/valueFunctions'
import {useFetchChartData, useFetchComments} from 'utils/hooks'

export const BAR_CHART_HEIGHT = 400
export const PADDING_BELOW = 200
export const BAR_CHART_WIDTH = 600
export type SortingType = 'country' | 'food'
export const BarChart = () => {
  const ref = useRef<SVGSVGElement>(null)
  const [sorting, setSorting] = useState<SortingType>('country')
  const { data, loading } = useFetchChartData()
  const {data: commentData, loading: commentLoading} = useFetchComments()

  console.log(commentData, commentLoading, 'data')


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
        <button onClick={toggleSorting}>
          Set to {sorting === 'food' ? 'country' : 'food'}-based sorting
        </button>
        <svg width={1000} height={BAR_CHART_HEIGHT} ref={ref} />
      </div>
    </Block>
  )
}
