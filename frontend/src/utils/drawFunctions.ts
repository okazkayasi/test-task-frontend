import { BAR_CHART_HEIGHT, BAR_CHART_WIDTH, PADDING_LEFT } from 'components/BarChart/constants'
import { SetDataType, SetThreadIdType, SortingType } from 'components/BarChart/types'
import * as d3 from 'd3'
import React from 'react'
import { ChartDataFeature, ChartDataPoint, CommentThread, Country, DataPoint } from 'utils/types'
import { getCountrySortedValues, getNames } from 'utils/valueFunctions'

export const BAR_WIDTH = 70
export const SPACE_BETWEEN_BARS = 30
export const COLORS = {
  hotdog: '#4682b4',
  burger: '#697fc4',
  sandwich: '#9876c6',
  kebab: '#c667b8',
  fries: '#ea589a',
  donut: '#ff5370',
}
type FoodNameTotalValueObject = { name: ChartDataFeature; value: number }

export const FOODS = ['hotdog', 'burger', 'sandwich', 'kebab', 'fries', 'donut'] as const
export const COUNTRIES = ['FR', 'GB', 'BE', 'DE', 'ES', 'IT'] as const

export const drawStackedBarChart = (
  ref: React.RefObject<SVGSVGElement>,
  data: DataPoint[],
  maxValue: number,
  foodWiseTotalValues: FoodNameTotalValueObject[],
  sortingType: SortingType,
  commentData: CommentThread[] | null,
  setData: SetDataType,
) => {
  const scaleYAxis = d3.scaleLinear().domain([maxValue, 0]).range([0, BAR_CHART_HEIGHT])
  const scaleBand = d3.scaleBand().domain(COUNTRIES).range([0, BAR_CHART_WIDTH]).padding(0.3)

  const svg = d3.select(ref.current)
  svg
    .append('g')
    .call(d3.axisBottom(scaleBand))
    .attr('transform', `translate(${PADDING_LEFT}, ${BAR_CHART_HEIGHT + 10})`)

  svg
    .append('g')
    .call(d3.axisLeft(scaleYAxis))
    .attr('transform', `translate(${PADDING_LEFT}, ${0})`)

  const chartSvg = svg.append('g').attr('transform', `translate(${PADDING_LEFT}, ${0})`)

  const sortedFoods = foodWiseTotalValues.map(getNames)
  data.forEach((dataPoint, index) => {
    const countryCommentData = commentData?.filter(
      (c) => c.chartDataPoint?.country === dataPoint.country,
    )
    drawStackedBar(
      chartSvg,
      dataPoint,
      maxValue,
      sortedFoods,
      sortingType,
      setData,
      scaleBand,
      countryCommentData,
    )
  })
}

export const drawStackedBar = (
  chartSvg: D3Selection<SVGGElement>,
  data: DataPoint,
  maxValue: number,
  sortedFoods: ChartDataFeature[],
  sortingType: SortingType,
  setData: SetDataType,
  scaleBand: d3.ScaleBand<string>,
  countryCommentData?: CommentThread[],
) => {
  const scaleHeight = d3.scaleLinear().domain([0, maxValue]).range([0, BAR_CHART_HEIGHT])

  const xVal = scaleBand(data.country) ?? BAR_WIDTH / 2
  const countrySortedFoods =
    sortingType === 'food' ? [] : getCountrySortedValues(data).map(getNames)

  const finalSorted = sortingType === 'food' ? sortedFoods : countrySortedFoods

  let heightLeft = Number.MAX_VALUE
  finalSorted.forEach((foodType, index) => {
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

type D3Selection<T extends d3.BaseType> = d3.Selection<T, unknown, null, undefined>

export const raiseBar = (
  bar: D3Selection<SVGRectElement>,
  text1: D3Selection<SVGTextElement>,
  text2: D3Selection<SVGTextElement>,
) => {
  bar.attr('stroke', 'black').raise()
  text1.raise()
  text2.raise()
}

type ChartValues = {
  x: number
  y: number
  height: number
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
    .style('cursor', 'pointer')
    .on('mouseout', function (d) {
      d3.select(this).attr('stroke', 'white')
    })
    .on('click', () => {
      console.log('on click')
      onClick()
    })

  foodText = addFoodTextOnBar(chartSvg, chartValues, barInfo.feature)
  commentText = addCommentTextOnBar(
    chartSvg,
    chartValues,
    countryFoodCommentData?.commentsCount ?? 0,
  )

  bar.on('mouseover', raiseBar.bind(null, bar, foodText, commentText))
  foodText.on('mouseover', raiseBar.bind(null, bar, foodText, commentText))
  commentText.on('mouseover', raiseBar.bind(null, bar, foodText, commentText))
}

const addCommentTextOnBar = (
  chartSvg: D3Selection<SVGGElement>,
  chartValues: ChartValues,
  countryFoodCommentDataLength: number,
) => {
  const text = chartSvg
    .append('text')
    .attr('x', chartValues.x + BAR_WIDTH / 2)
    .attr('y', chartValues.y)
    .attr('dy', chartValues.height / 2 + 8)
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .attr('font-size', () => {
      return '0.4rem'
    })
    .style('display', () => {
      if (chartValues.height < 25) return 'none'
      return 'block'
    })
    .style('cursor', 'pointer')
    .text(countryFoodCommentDataLength ? `${countryFoodCommentDataLength} comments` : 'No comment')
  return text
}

const addFoodTextOnBar = (
  chartSvg: D3Selection<SVGGElement>,
  chartValues: ChartValues,
  foodType: ChartDataFeature,
) => {
  const text = chartSvg
    .append('text')
    .attr('x', chartValues.x + BAR_WIDTH / 2)
    .attr('y', chartValues.y)
    .attr('dy', chartValues.height / 2)
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .style('text-transform', 'capitalize')
    .style('cursor', 'pointer')
    .attr('font-size', () => {
      if (chartValues.height > 14) {
        return '0.5rem'
      } else {
        return '0.3rem'
      }
    })
    .text(foodType)
  return text
}
