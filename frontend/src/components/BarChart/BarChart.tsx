import { Block } from 'lib/Block'
import { useEffect, useRef } from 'react'
import { drawStackedBarChart, FOODS } from 'utils/drawFunctions'
import { getCountryWiseMaxValue, getFoodWiseValues } from 'utils/valueFunctions'
import { useFetch } from 'utils/hooks'

export const BAR_CHART_HEIGHT = 500

export const BarChart = () => {
  const ref = useRef<SVGSVGElement>(null)
  const { data, loading } = useFetch('http://localhost:8000/chart/data')
  console.log(data)
  console.log(loading)

  useEffect(() => {
    if (data) {
      const maxValue = getCountryWiseMaxValue(data)
      const foodWiseTotalValues = getFoodWiseValues(data)
      drawStackedBarChart(ref, data, maxValue, foodWiseTotalValues)
    }
  }, [data])

  if (loading || !data) return <p>Nice loading animation</p>

  return (
    <Block>
      <div>
        <div>Bar Chart</div>
        <svg width={1000} height={BAR_CHART_HEIGHT} ref={ref} />
      </div>
    </Block>
  )
}
