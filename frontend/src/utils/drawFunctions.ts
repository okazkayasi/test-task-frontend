import {
  BAR_CHART_HEIGHT,
  BAR_CHART_WIDTH,
  BAR_WIDTH,
  COLORS,
  COUNTRIES,
} from 'components/App/constants'
import { SetDataType, SortingType } from 'components/BarChart/types'
import {
  scaleLinear as d3ScaleLinear,
  scaleBand as d3ScaleBand,
  ScaleBand as ScaleBandType,
  select as d3Select,
  axisBottom as d3AxisBottom,
  axisLeft as d3AxisLeft,
  ScaleLinear,
} from 'd3'
import React from 'react'
import {
  drawMainSVGElements,
  raiseBar,
  addFoodTextOnBar,
  addCommentTextOnBar,
} from 'utils/drawHelpers'
import {
  ChartDataFeature,
  ChartDataPoint,
  ChartValues,
  CommentThread,
  D3Selection,
  DataPoint,
} from 'utils/types'
import {
  getCountrySortedValues,
  getCountryWiseMaxValue,
  getFoodWiseValues,
  getNames,
} from 'utils/valueFunctions'

export const drawStackedBarChart = (
  ref: React.RefObject<SVGSVGElement>,
  data: DataPoint[],
  sortingType: SortingType,
  commentData: CommentThread[] | null,
  setData: SetDataType,
) => {
  const maxValue = getCountryWiseMaxValue(data)
  const foodWiseTotalValues = getFoodWiseValues(data)
  const totalFoodOrdered = foodWiseTotalValues.map(getNames)

  const scaleYAxis = d3ScaleLinear().domain([maxValue, 0]).range([0, BAR_CHART_HEIGHT])
  const scaleBand = d3ScaleBand().domain(COUNTRIES).range([0, BAR_CHART_WIDTH]).padding(0.3)
  const scaleHeight = d3ScaleLinear().domain([0, maxValue]).range([0, BAR_CHART_HEIGHT])
  const chartSvg = drawMainSVGElements(ref, scaleBand, scaleYAxis)

  data.forEach((countryData, index) => {
    const countryCommentData =
      commentData?.filter((c) => c.chartDataPoint?.country === countryData.country) ?? []

    const countryWiseFoodOrdered =
      sortingType === 'food' ? [] : getCountrySortedValues(countryData).map(getNames)
    const orderedFoodArray = sortingType === 'food' ? totalFoodOrdered : countryWiseFoodOrdered

    drawStackedBar(
      chartSvg,
      countryData,
      countryCommentData,
      orderedFoodArray,
      setData,
      scaleHeight,
      scaleBand,
    )
  })
}

export const drawStackedBar = (
  chartSvg: D3Selection<SVGGElement>,
  countryData: DataPoint,
  countryCommentData: CommentThread[],
  orderedFoodArray: ChartDataFeature[],
  setData: SetDataType,
  scaleHeight: ScaleLinear<number, number>,
  scaleBand: ScaleBandType<string>,
) => {
  const xVal = scaleBand(countryData.country) ?? BAR_WIDTH / 2

  let heightLeft = Number.MAX_VALUE
  orderedFoodArray.forEach((foodType, index) => {
    const countryFoodCommentData = countryCommentData?.find(
      (c) => c.chartDataPoint?.feature === foodType,
    )
    const barInfo = {
      country: countryData.country,
      feature: foodType,
    }
    heightLeft = Math.min(heightLeft, BAR_CHART_HEIGHT)
    const height = scaleHeight(countryData[foodType])
    const y = heightLeft - height
    heightLeft = heightLeft - height
    const chartValues = { x: xVal, y, height }
    drawBar(chartSvg, chartValues, barInfo, setData, countryFoodCommentData)
  })
}

export const drawBar = (
  chartSvg: D3Selection<SVGGElement>,
  chartValues: ChartValues,
  barInfo: ChartDataPoint,
  setData: SetDataType,
  countryFoodCommentData?: CommentThread,
) => {
  const onClick = () => {
    if (countryFoodCommentData) {
      setData.threadId(countryFoodCommentData.id)
      setData.dataPoint(null)
    } else {
      setData.dataPoint(barInfo)
      setData.threadId(null)
    }
  }

  let foodText: D3Selection<SVGTextElement>
  let commentText: D3Selection<SVGTextElement>
  const bar = chartSvg
    .append('rect')
    .attr('x', chartValues.x)
    .attr('y', chartValues.y)
    .attr('width', BAR_WIDTH)
    .attr('height', chartValues.height)
    .attr('fill', COLORS[barInfo.feature])
    .attr('stroke', 'white')
    .attr('stroke-width', 2)
    .attr('rx', '5')
    .attr('data-testid', `${barInfo.country} ${barInfo.feature}`)
    .style('cursor', 'pointer')
    .on('mouseout', function (d) {
      d3Select(this).attr('stroke', 'white')
    })
    .on('click', onClick)

  foodText = addFoodTextOnBar(chartSvg, chartValues, barInfo.feature, onClick)
  commentText = addCommentTextOnBar(
    chartSvg,
    chartValues,
    countryFoodCommentData?.commentsCount ?? 0,
    onClick,
  )

  bar.on('mouseover', raiseBar.bind(null, bar, foodText, commentText))
  foodText.on('mouseover', raiseBar.bind(null, bar, foodText, commentText))
  commentText.on('mouseover', raiseBar.bind(null, bar, foodText, commentText))
}
