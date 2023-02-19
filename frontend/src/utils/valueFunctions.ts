import { FOODS } from 'utils/drawFunctions'
import {ChartDataFeature, DataPoint} from 'utils/hooks'

export const getCountryWiseMaxValue = (data: DataPoint[] | null) => {
  if (!data) return 0
  const countryWiseTotalValues = data
    ?.map?.((d) => {
      const { country, ...rest } = d
      return rest
    })
    .map((d) => Object.values(d).reduce((acc, curr) => acc + curr, 0))

  const maxVal = countryWiseTotalValues ? Math.max(...countryWiseTotalValues) : 0
  return maxVal
}

export const getFoodWiseValues = (data: DataPoint[] | null) => {
  if (!data) return []
  return FOODS.map((foodType) => ({
    name: foodType,
    value: data.reduce((acc, curr) => acc + curr[foodType], 0),
  })).sort((a, b) => b.value - a.value)
}

export const getCountrySortedValues = (data: DataPoint): { name: ChartDataFeature; value: number }[] =>
  FOODS.map((foodType) => {
    return {
      name: foodType,
      value: data[foodType],
    }
  }).sort((a, b) => b.value - a.value)

export const getNames = (d: { name: ChartDataFeature }) => d.name
