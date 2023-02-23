import { BAR_CHART_HEIGHT, BAR_WIDTH, PADDING_LEFT } from 'components/App/constants'
import { ScaleLinear, select as d3Select } from 'd3'
import { axisBottom as d3AxisBottom, axisLeft as d3AxisLeft } from 'd3-axis'
import { ScaleBand as ScaleBandType } from 'd3-scale'
import React from 'react'
import { ChartDataFeature, ChartValues, D3Selection } from 'utils/types'

export const drawMainSVGElements = (
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

export const raiseBar = (
  bar: D3Selection<SVGRectElement>,
  text1: D3Selection<SVGTextElement>,
  text2: D3Selection<SVGTextElement>,
) => {
  bar.attr('stroke', 'black').raise()
  text1.raise()
  text2.raise()
}

export const addCommentTextOnBar = (
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

export const addFoodTextOnBar = (
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
s
