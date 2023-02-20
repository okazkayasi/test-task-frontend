import { Nullable } from 'components/App/types'
import { useEffect, useState } from 'react'
import {
  ChartDataPoint,
  Comment,
  CommentThreadResponse,
  FetchCommentHook,
  FetchCommentWithIdHook,
  FetchHook,
} from 'utils/types'

export function useFetchCommentWithId(threadId: Nullable<string>, trigger?: number) {
  const { data, loading } = useFetch(
    threadId ? `http://localhost:8000/chart/comment_threads/${threadId}` : null,
    trigger,
  )
  if (!threadId) return { data: null, loading: false } as FetchCommentWithIdHook
  return { data, loading } as FetchCommentWithIdHook
}

export async function postCreateThread(comment: Comment, dataPoint: ChartDataPoint) {
  const res = (await fetch('http://localhost:8000/chart/comment_threads', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      comment: {
        user_name: comment.userName,
        text: comment.text,
      },
      data_point: dataPoint,
    }),
  }).then((res) => res.json())) as CommentThreadResponse
  return res
}
export async function postRespondToExistingThread(threadId: string, comment: Comment) {
  const res = (await fetch(`http://localhost:8000/chart/comment_threads/${threadId}/respond`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      comment: {
        user_name: comment.userName,
        text: comment.text,
      },
    }),
  }).then((res) => res.json())) as CommentThreadResponse
  return res.comments
}

export function useFetchChartData() {
  const { data, loading } = useFetch('http://localhost:8000/chart/data')
  return { data, loading } as FetchHook
}

export function useFetchComments(trigger: number) {
  const { data, loading } = useFetch('http://localhost:8000/chart/comment_threads', trigger)
  return { data, loading } as FetchCommentHook
}

function useFetch(url: Nullable<string>, trigger?: number) {
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
  }, [url, trigger])
  return { data, loading }
}
