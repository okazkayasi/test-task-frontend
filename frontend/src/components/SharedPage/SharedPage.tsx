import { HomePage } from 'components/HomePage/HomePage'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getTokenData } from 'utils/talkToAPIFunctions'

export const SharedPage = () => {
  const [checkingToken, setCheckingToken] = useState(true)
  const [validToken, setValidToken] = useState(false)

  const { token } = useParams()

  useEffect(() => {
    if (token) {
      getTokenData(token).then((data) => {
        if (data) {
          setValidToken(true)
        }
        setCheckingToken(false)
      })
    }
  }, [token])

  return validToken ? (
    <HomePage />
  ) : checkingToken ? (
    <div>Checking token</div>
  ) : (
    <div>Token is not valid</div>
  )
}
