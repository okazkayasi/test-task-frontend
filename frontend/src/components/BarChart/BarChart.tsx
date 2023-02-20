import { SButtonWrapper, SStack, STitle } from 'components/BarChart/BarChart.styled'
import { TOTAL_SVG_HEIGHT, TOTAL_SVG_WIDTH } from 'components/BarChart/constants'
import { SButton, ToggleButton } from 'components/BarChart/ToggleButton'
import { SetDataPointType, SetThreadIdType, SortingType } from 'components/BarChart/types'
import { Block } from 'lib/Block'
import { useEffect, useRef, useState } from 'react'
import { drawStackedBarChart } from 'utils/drawFunctions'
import { getShareableLink, useFetchChartData } from 'utils/talkToAPIFunctions'
import { CommentThread } from 'utils/types'
import { getCountryWiseMaxValue, getFoodWiseValues } from 'utils/valueFunctions'

export const BarChart = ({
  commentData,
  setThreadId,
  setDataPoint,
}: {
  commentData: CommentThread[] | null
  setThreadId: SetThreadIdType
  setDataPoint: SetDataPointType
}) => {
  const ref = useRef<SVGSVGElement>(null)
  const [sorting, setSorting] = useState<SortingType>('country')
  const [linkCopied, setLinkCopied] = useState(false)
  const { data, loading } = useFetchChartData()

  useEffect(() => {
    if (linkCopied) {
      setTimeout(() => {
        setLinkCopied(false)
      }, 2000)
    }
  }, [linkCopied])

  useEffect(() => {
    if (data) {
      const setData = {
        threadId: setThreadId,
        dataPoint: setDataPoint,
      }
      const maxValue = getCountryWiseMaxValue(data)
      const foodWiseTotalValues = getFoodWiseValues(data)
      ref.current?.replaceChildren()
      drawStackedBarChart(ref, data, maxValue, foodWiseTotalValues, sorting, commentData, setData)
    }
  }, [data, sorting, commentData, setThreadId, setDataPoint])

  const copyLink = async () => {
    const data = await getShareableLink()
    await navigator.clipboard.writeText(data.token || 'not-successful')
    setLinkCopied(true)
  }
  const toggleSorting = () => {
    setSorting(sorting === 'country' ? 'food' : 'country')
  }

  if (loading || !data) return <p>Nice loading animation</p>

  return (
    <Block>
      <div>
        <SStack>
          <STitle>Country-Food Bar Chart</STitle>
          <SStack style={{ marginBottom: '2rem' }}>
            <SButtonWrapper>
              <ToggleButton sorting={sorting} toggleSorting={toggleSorting} />
            </SButtonWrapper>
            <SButtonWrapper>
              <SButton onClick={copyLink}>
                {!linkCopied ? 'Copy sharing link' : 'Link copied'}
              </SButton>
            </SButtonWrapper>
          </SStack>
        </SStack>
        <svg width={TOTAL_SVG_WIDTH} height={TOTAL_SVG_HEIGHT} ref={ref} />
      </div>
    </Block>
  )
}
