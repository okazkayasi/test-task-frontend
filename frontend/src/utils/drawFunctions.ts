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

export const FOOD_TYPES = ['hotdog', 'burger', 'sandwich', 'kebab', 'fries', 'donut'] as const

export const drawStackedBarChart = (
  ref: React.RefObject<SVGSVGElement>,
  data: DataPoint[],
  maxValue: number,
) => {
  data.forEach((dataPoint, index) => {
    const x = index * (BAR_WIDTH + SPACE_BETWEEN_BARS)
    drawStackedBar(ref, dataPoint, maxValue, x)
  })
}

export const drawStackedBar = (
  ref: React.RefObject<SVGSVGElement>,
  data: DataPoint,
  maxValue: number,
  x: number,
) => {
  const scaleHeight = d3.scaleLinear().domain([0, maxValue]).range([0, BAR_CHART_HEIGHT])

  let heighLeft = BAR_CHART_HEIGHT
  FOOD_TYPES.forEach((foodType, index) => {
    const height = scaleHeight(data[foodType])
    const color = COLORS[foodType]
    const y = heighLeft - height
    heighLeft = heighLeft - height
    drawBar(ref, y, x, height, color, maxValue)
  })
}

export const drawBar = (
  ref: React.RefObject<SVGSVGElement>,
  y: number,
  x: number,
  height: number,
  color: string,
  maxValue: number,
) => {
  const barElement = d3.select(ref.current)
  barElement
    .append('rect')
    .attr('x', x)
    .attr('y', y)
    .attr('width', BAR_WIDTH)
    .attr('height', height)
    .attr('fill', color)
    .attr('stroke', 'white')
    .attr('stroke-width', 2)
    .attr('rx', '5')
}
