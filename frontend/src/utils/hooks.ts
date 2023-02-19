import { useEffect, useState } from 'react'

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

type FetchHook = {
  data: DataPoint[] | null
  loading: boolean
}

type FetchCommentWithIdHook = {
  data: CommentThreadResponse | null
  loading: boolean
}
export function useFetchCommentWithId(threadId: string | null) {
  const { data, loading } = useFetch(
    threadId ? `http://localhost:8000/chart/comment_threads/${threadId}` : null,
  )
  if (!threadId) return { data: null, loading: false } as FetchCommentWithIdHook
  return { data, loading } as FetchCommentWithIdHook
}

export function useFetchChartData() {
  const { data, loading } = useFetch('http://localhost:8000/chart/data')
  return { data, loading } as FetchHook
}

export function useFetchComments() {
  const { data, loading } = useFetch('http://localhost:8000/chart/comment_threads')
  return { data, loading } as FetchCommentHook
}

function useFetch(url: string | null) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (url == null) return
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [url])
  return { data, loading }
}
