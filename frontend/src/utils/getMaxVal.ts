import { DataPoint } from 'utils/hooks'

export const getMaxValue = (data: DataPoint[] | null) => {
  if (!data) return 0
  const totalValues = data
    ?.map?.((d) => {
      const { country, ...rest } = d
      return rest
    })
    .map((d) => Object.values(d).reduce((acc, curr) => acc + curr, 0))

  const maxVal = totalValues ? Math.max(...totalValues) : 0
  return maxVal
}
