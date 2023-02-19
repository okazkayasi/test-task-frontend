import { Dispatch, SetStateAction } from 'react'

export type SortingType = 'country' | 'food'
export type SetThreadIdType = Dispatch<SetStateAction<string | null>>