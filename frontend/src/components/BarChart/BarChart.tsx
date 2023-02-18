import { Bar } from 'components/Bar/Bar'
import { StackedBar } from 'components/StackedBar/StackedBar'
import { Block } from 'lib/Block'
import { useFetch } from 'utils/hooks'

export const BarChart = () => {
  const { data, loading } = useFetch('http://localhost:8000/chart/data')
  console.log(data)
  console.log(loading)

  return (
    <Block>
      <div>
        <div>Bar Chart</div>
        <StackedBar />
      </div>
    </Block>
  )
}
