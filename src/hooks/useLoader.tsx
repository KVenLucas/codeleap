import { useEffect, useState } from 'react'

export const useLoader = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000)
  }, [])

  return { loading }
}
