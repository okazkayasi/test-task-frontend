import {
  BAR_CHART_HEIGHT,
  BAR_CHART_WIDTH,
  BAR_WIDTH,
  COLORS,
  COUNTRIES,
  PADDING_LEFT,
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
  ChartDataFeature,
  ChartDataPoint,
  ChartValues,
  CommentThread,
  D3Selection,
  DataPoint,
  FoodNameTotalValueObject,
} from 'utils/types'
import {
  getCountrySortedValues,
  getCountryWiseMaxValue,
  getFoodWiseValues,
  getNames,
} from 'utils/valueFunctions'

const drawMainSVGElements = (
  ref: React.RefObject<SVGSVGElement>,
  scaleBand: ScaleBandType<string>,
  scaleYAxis: ScaleLinear<number, number>,
) => {
  const svg = d3Select(ref.current)

  svg
    .append('g')
    .call(d3AxisBottom(scaleBand))
    .attr('transform', `translate(${PADDING_LEFT}, ${BAR_CHART_HEIGHT + 10})`)
    .attr('data-testid', 'x-axis')

  svg
    .append('g')
    .call(d3AxisLeft(scaleYAxis))
    .attr('transform', `translate(${PADDING_LEFT}, ${0})`)
    .attr('data-testid', 'y-axis')

  return svg
    .append('g')
    .attr('transform', `translate(${PADDING_LEFT}, ${0})`)
    .attr('data-testid', 'chart-svg')
}

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

  data.forEach((dataPoint, index) => {
    const countryCommentData =
      commentData?.filter((c) => c.chartDataPoint?.country === dataPoint.country) ?? []

    const countryWiseFoodOrdered =
      sortingType === 'food' ? [] : getCountrySortedValues(dataPoint).map(getNames)
    const orderedFoodArray = sortingType === 'food' ? totalFoodOrdered : countryWiseFoodOrdered

    drawStackedBar(
      chartSvg,
      dataPoint,
      orderedFoodArray,
      setData,
      countryCommentData,
      scaleHeight,
      scaleBand,
    )
  })
}

export const drawStackedBar = (
  chartSvg: D3Selection<SVGGElement>,
  data: DataPoint,
  orderedFoodArray: ChartDataFeature[],
  setData: SetDataType,
  countryCommentData: CommentThread[],
  scaleHeight: ScaleLinear<number, number>,
  scaleBand: ScaleBandType<string>,
) => {
  const xVal = scaleBand(data.country) ?? BAR_WIDTH / 2

  let heightLeft = Number.MAX_VALUE
  orderedFoodArray.forEach((foodType, index) => {
    const countryFoodCommentData = countryCommentData?.find(
      (c) => c.chartDataPoint?.feature === foodType,
    )
    const barInfo = {
      country: data.country,
      feature: foodType,
    }
    heightLeft = Math.min(heightLeft, BAR_CHART_HEIGHT)
    const height = scaleHeight(data[foodType])
    const y = heightLeft - height
    heightLeft = heightLeft - height
    const chartValues = { x: xVal, y, height }
    drawBar(chartSvg, chartValues, barInfo, setData, countryFoodCommentData)
  })
}

export const raiseBar = (
  bar: D3Selection<SVGRectElement>,
  text1: D3Selection<SVGTextElement>,
  text2: D3Selection<SVGTextElement>,
) => {
  bar.attr('stroke', 'black').raise()
  text1.raise()
  text2.raise()
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

const addCommentTextOnBar = (
  chartSvg: D3Selection<SVGGElement>,
  chartValues: ChartValues,
  countryFoodCommentDataLength: number,
  onClick: () => void,
) => {
  return chartSvg
    .append('text')
    .attr('x', chartValues.x + BAR_WIDTH / 2)
    .attr('y', chartValues.y)
    .attr('dy', chartValues.height / 2 + 8)
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .attr('font-size', () => {
      return '0.4rem'
    })
    .style('display', () => (chartValues.height < 25 ? 'none' : 'block'))
    .style('cursor', 'pointer')
    .text(countryFoodCommentDataLength ? `${countryFoodCommentDataLength} comments` : 'No comment')
    .on('click', onClick)
}

const addFoodTextOnBar = (
  chartSvg: D3Selection<SVGGElement>,
  chartValues: ChartValues,
  foodType: ChartDataFeature,
  onClick: () => void,
) => {
  return chartSvg
    .append('text')
    .attr('x', chartValues.x + BAR_WIDTH / 2)
    .attr('y', chartValues.y)
    .attr('dy', chartValues.height / 2)
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .style('text-transform', 'capitalize')
    .style('cursor', 'pointer')
    .attr('font-size', () => (chartValues.height > 14 ? '0.5rem' : '0.3rem'))
    .text(foodType)
    .on('click', onClick)
}
