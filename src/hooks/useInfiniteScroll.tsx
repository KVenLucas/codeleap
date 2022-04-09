import { useEffect, useState } from 'react'

interface UseInfiniteScrollProps {
  callback: (args: unknown) => void
}

const useInfiniteScroll = ({ callback }: UseInfiniteScrollProps) => {
  const [isFetching, setIsFetching] = useState(false)

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isFetching
    )
      return
    setIsFetching(true)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!isFetching) return
    callback(() => {})
  }, [isFetching])

  return [isFetching, setIsFetching] as const
}

export default useInfiniteScroll
