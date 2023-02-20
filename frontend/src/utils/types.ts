import { Nullable } from 'components/App/types'

export type ChartDataFeature = 'hotdog' | 'burger' | 'sandwich' | 'kebab' | 'fries' | 'donut'
export type Country = 'FR' | 'GB' | 'BE' | 'DE' | 'ES' | 'IT'
export type ChartDataPoint = {
  feature: ChartDataFeature
  country: Country
}
export type CommentThread = {
  id: string
  commentsCount: number
  chartDataPoint: ChartDataPoint
}
export type Comment = {
  userName: string
  text: string
}
export type CommentThreadResponse = CommentThread & {
  comments: Comment[]
}
export type FetchCommentHook = {
  data: CommentThread[] | null
  loading: boolean
}
export type DataPoint = {
  country: Country
  hotdog: number
  burger: number
  sandwich: number
  kebab: number
  fries: number
  donut: number
}
export type FetchHook = {
  data: DataPoint[] | null
  loading: boolean
}
export type FetchCommentWithIdHook = {
  data: CommentThreadResponse | null
  loading: boolean
}

export type ShareResponse = {
  token: Nullable<string>
}
