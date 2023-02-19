import { BAR_CHART_HEIGHT, BAR_CHART_WIDTH, SortingType } from 'components/BarChart/BarChart'
import * as d3 from 'd3'
import React from 'react'
import { ChartDataFeature, ChartDataPoint, Comment, CommentThread, DataPoint } from 'utils/hooks'
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
) => {
  const sortedFoods = foodWiseTotalValues.map(getNames)

  data.forEach((dataPoint, index) => {
    const countryCommentData = commentData?.filter(
      (c) => c.chartDataPoint?.country === dataPoint?.country,
    )
    const x = index * (BAR_WIDTH + SPACE_BETWEEN_BARS)
    drawStackedBar(ref, dataPoint, maxValue, x, sortedFoods, sortingType, countryCommentData)
  })
}

export const drawStackedBar = (
  ref: React.RefObject<SVGSVGElement>,
  data: DataPoint,
  maxValue: number,
  x: number,
  sortedFoods: ChartDataFeature[],
  sortingType: SortingType,
  countryCommentData?: CommentThread[],
) => {
  const scaleHeight = d3.scaleLinear().domain([0, maxValue]).range([0, BAR_CHART_HEIGHT])
  const scaleBand = d3.scaleBand().domain(COUNTRIES).range([0, BAR_CHART_WIDTH]).padding(0.8)

  const svg = d3.select(ref.current)
  svg
    .append('g')
    .call(d3.axisBottom(scaleBand))
    .attr('transform', `translate(0, ${BAR_CHART_HEIGHT})`)

  const xVal = (scaleBand(data.country) ?? BAR_WIDTH / 2) - BAR_WIDTH / 2
  const countrySortedFoods =
    sortingType === 'food' ? [] : getCountrySortedValues(data).map(getNames)

  const finalSorted = sortingType === 'food' ? sortedFoods : countrySortedFoods

  let heightLeft = Number.MAX_VALUE
  finalSorted.forEach((foodType, index) => {
    const countryFoodCommentData = countryCommentData?.filter(
      (c) => c.chartDataPoint.feature === foodType,
    )
    console.log(countryFoodCommentData, foodType, 'food')
    heightLeft = Math.min(heightLeft, BAR_CHART_HEIGHT)
    const height = scaleHeight(data[foodType])
    const color = COLORS[foodType]
    const y = heightLeft - height
    heightLeft = heightLeft - height
    drawBar(ref, y, xVal, height, color, maxValue, foodType, countryFoodCommentData)
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

export const drawBar = (
  ref: React.RefObject<SVGSVGElement>,
  y: number,
  x: number,
  height: number,
  color: string,
  maxValue: number,
  foodType: ChartDataFeature,
  countryFoodCommentData?: CommentThread[],
) => {
  const svg = d3.select(ref.current)
  let foodText: D3Selection<SVGTextElement>
  let commentText: D3Selection<SVGTextElement>
  const bar = svg
    .append('rect')
    .attr('x', x)
    .attr('y', y)
    .attr('width', BAR_WIDTH)
    .attr('height', height)
    .attr('fill', color)
    .attr('stroke', 'white')
    .attr('stroke-width', 2)
    .attr('rx', '5')
    .style('cursor', 'pointer')
    .on('mouseout', function (d) {
      d3.select(this).attr('stroke', 'white')
    })

  foodText = addFoodTextOnBar(ref, x, y, height, foodType)
  commentText = addCommentTextOnBar(ref, x, y, height, countryFoodCommentData?.length ?? 0)

  bar.on('mouseover', raiseBar.bind(null, bar, foodText, commentText))
  foodText.on('mouseover', raiseBar.bind(null, bar, foodText, commentText))
  commentText.on('mouseover', raiseBar.bind(null, bar, foodText, commentText))
}

const addCommentTextOnBar = (
  ref: React.RefObject<SVGSVGElement>,
  x: number,
  y: number,
  height: number,
  countryFoodCommentDataLength: number,
) => {
  const svg = d3.select(ref.current)
  const text = svg
    .append('text')
    .attr('x', x + BAR_WIDTH / 2)
    .attr('y', y)
    .attr('dy', height / 2 + 10)
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .attr('font-size', () => {
      return '0.4rem'
    })
    .style('display', () => {
      if (height < 25) return 'none'
      return 'block'
    })
    .style('cursor', 'pointer')
    .text(countryFoodCommentDataLength ? `${countryFoodCommentDataLength} comments` : 'No comment')
  return text
}

const addFoodTextOnBar = (
  ref: React.RefObject<SVGSVGElement>,
  x: number,
  y: number,
  height: number,
  foodType: ChartDataFeature,
) => {
  const svg = d3.select(ref.current)
  const text = svg
    .append('text')
    .attr('x', x + BAR_WIDTH / 2)
    .attr('y', y)
    .attr('dy', height / 2)
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
    .style('text-transform', 'capitalize')
    .style('cursor', 'pointer')
    .attr('font-size', () => {
      if (height > 14) {
        return '0.5rem'
      } else {
        return '0.3rem'
      }
    })
    .text(foodType)
  return text
}
