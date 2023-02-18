import { Bar } from 'components/Bar/Bar'
import { Block } from 'lib/Block'
import { Stack } from 'lib/Stack'

export const StackedBar = () => {
  return (
    <Block>
      <div>
        <h1>Stacked Bar</h1>
        <Stack space="0">
          <Bar width={20} height={100} color="steelblue" />
          <Bar width={20} height={100} color="pink" />
        </Stack>
      </div>
    </Block>
  )
}
