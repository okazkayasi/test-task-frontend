import { FOODS } from 'utils/drawFunctions'
import { DataPoint } from 'utils/hooks'

export const getCountryWiseMaxValue = (data: DataPoint[] | null) => {
  if (!data) return 0
  const countryWiseTotalValues = data
    ?.map?.((d) => {
      const { country, ...rest } = d
      return rest
    })
    .map((d) => Object.values(d).reduce((acc, curr) => acc + curr, 0))

  console.log(countryWiseTotalValues, 'total')
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
