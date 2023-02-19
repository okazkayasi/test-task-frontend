import { useEffect, useState } from 'react'


export type ChartDataFeature = 'hotdog' | 'burger' | 'sandwich' | 'kebab' | 'fries' | 'donut';

export type Country = 'FR' | 'GB' | 'BE' | 'DE' | 'ES' | 'IT'

export type ChartDataPoint = {
  feature: ChartDataFeature;
  country: Country;
}

export type CommentThread = {
  id: string;
  comments_count: number;
  chart_data_point: ChartDataPoint[];
}

export type Comment = {
  user_name: string;
  text: string;
}

export type FetchComment = {
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

type FetchCommentHook = {

}
export function useFetchChartData() {
  const {data, loading} = useFetch('http://localhost:8000/chart/data')
  return { data, loading } as FetchHook
}

export function useFetchComments() {
  const {data, loading} = useFetch('http://localhost:8000/chart/comment_threads')
  return {data, loading} as FetchComment
}

function useFetch(url: string) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [url])
  return {data, loading}
}
