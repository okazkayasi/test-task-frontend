import { BASE_URL, FRONTEND_BASE_URL } from 'components/App/constants'
import { Nullable } from 'components/App/types'
import { useEffect, useState } from 'react'
import {
  ChartDataPoint,
  Comment,
  CommentThreadResponse,
  FetchCommentHook,
  FetchCommentWithIdHook,
  FetchHook,
  ShareResponse,
} from 'utils/types'

export async function getTokenData(token: string) {
  return await getFetch('/chart/shared/' + token)
    .then((data) => {
      return data as ShareResponse
    })
    .catch((err) => {
      return null
    })
}

export async function getShareableLink() {
  const data = await getFetch('/share').then((data) => {
    return data as ShareResponse
  })
  if (!data) return { token: null }
  return { token: FRONTEND_BASE_URL + '/shared/' + data.token }
}

export function useFetchCommentWithId(threadId: Nullable<string>, trigger?: number) {
  const { data, loading } = useFetch(
    threadId ? `/chart/comment_threads/${threadId}` : null,
    trigger,
  )
  if (!threadId) return { data: null, loading: false } as FetchCommentWithIdHook
  return { data, loading } as FetchCommentWithIdHook
}

export async function postCreateThread(comment: Comment, dataPoint: ChartDataPoint) {
  const res = (await fetch(BASE_URL + '/chart/comment_threads', {
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
  const res = (await fetch(BASE_URL + `/chart/comment_threads/${threadId}/respond`, {
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
  const { data, loading } = useFetch('/chart/data')
  return { data, loading } as FetchHook
}

export function useFetchComments(trigger: number) {
  const { data, loading } = useFetch('/chart/comment_threads', trigger)
  return { data, loading } as FetchCommentHook
}

function useFetch(url: Nullable<string>, trigger?: number) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (url == null) return
    getFetch(url).then((data) => {
      setData(data)
      setLoading(false)
    })
  }, [url, trigger])
  return { data, loading }
}

const getFetch = (url: string) =>
  fetch(BASE_URL + url).then((res) => {
    if (!res.ok) {
      throw new Error('Network response was not ok')
    }
    return res.json()
  })
