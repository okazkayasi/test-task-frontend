import { Nullable } from 'components/App/types'
import { Dispatch, SetStateAction } from 'react'
import { ChartDataPoint } from 'utils/types'

export type SortingType = 'country' | 'food'
export type SetThreadIdType = Dispatch<SetStateAction<Nullable<string>>>
export type SetDataPointType = Dispatch<SetStateAction<Nullable<ChartDataPoint>>>
export type SetDataType = { threadId: SetThreadIdType; dataPoint: SetDataPointType }
