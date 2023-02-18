import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

export type BarProps = {
  height: number
  width: number
  color: string
}
export const Bar = ({ height, width, color }: BarProps) => {
  const ref = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const barElement = d3.select(ref.current)
    barElement.append('rect').attr('width', width).attr('height', height).attr('fill', color)
  }, [height, width, color])

  return <svg width={width} height={height} ref={ref} />
}
