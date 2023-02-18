import { useEffect, useState } from 'react'

export type DataPoint = {
  country: string
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
export function useFetch(url: string) {
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
  return { data, loading } as FetchHook
}
