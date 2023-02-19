import { BAR_CHART_HEIGHT } from 'components/BarChart/BarChart'
import * as d3 from 'd3'
import React from 'react'
import { DataPoint } from 'utils/hooks'

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
export type FoodType = 'hotdog' | 'burger' | 'sandwich' | 'kebab' | 'fries' | 'donut'
type FoodNameTotalValueObject = { name: FoodType; value: number }

export const FOODS = ['hotdog', 'burger', 'sandwich', 'kebab', 'fries', 'donut'] as const

export const drawStackedBarChart = (
  ref: React.RefObject<SVGSVGElement>,
  data: DataPoint[],
  maxValue: number,
  foodWiseTotalValues: FoodNameTotalValueObject[],
) => {
  const sortedFoods = foodWiseTotalValues.map((food) => food.name)
  console.log(sortedFoods, 'sorted foods')

  data.forEach((dataPoint, index) => {
    const x = index * (BAR_WIDTH + SPACE_BETWEEN_BARS)
    drawStackedBar(ref, dataPoint, maxValue, x, sortedFoods)
  })
}

export const drawStackedBar = (
  ref: React.RefObject<SVGSVGElement>,
  data: DataPoint,
  maxValue: number,
  x: number,
  sortedFoods: FoodType[],
) => {
  const scaleHeight = d3.scaleLinear().domain([0, maxValue]).range([0, BAR_CHART_HEIGHT])

  let heighLeft = BAR_CHART_HEIGHT
  sortedFoods.forEach((foodType, index) => {
    const height = scaleHeight(data[foodType])
    const color = COLORS[foodType]
    const y = heighLeft - height
    heighLeft = heighLeft - height
    drawBar(ref, y, x, height, color, maxValue, foodType)
  })
}

export const drawBar = (
  ref: React.RefObject<SVGSVGElement>,
  y: number,
  x: number,
  height: number,
  color: string,
  maxValue: number,
  foodType: FoodType,
) => {
  const svg = d3.select(ref.current)
  let text: d3.Selection<SVGTextElement, unknown, null, undefined>
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
    .on('mouseover', function (d) {
      d3.select(this).attr('stroke', 'black').raise()
      text.raise()
    })
    .on('mouseout', function (d) {
      d3.select(this).attr('stroke', 'white')
    })

  text = addTextOnBar(ref, x, y, height, foodType, bar)
  text.on('mouseover', function (d) {
    bar.attr('stroke', 'black').raise()
    bar.raise()
    d3.select(this).raise()
  })
}

const addTextOnBar = (
  ref: React.RefObject<SVGSVGElement>,
  x: number,
  y: number,
  height: number,
  foodType: FoodType,
  bar: d3.Selection<SVGRectElement, unknown, null, undefined>,
) => {
  const svg = d3.select(ref.current)
  const text = svg
    .append('text')
    .attr('x', x + BAR_WIDTH / 2)
    .attr('y', y)
    .attr('dy', height / 2)
    .attr('text-anchor', 'middle')
    .attr('dominant-baseline', 'middle')
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
