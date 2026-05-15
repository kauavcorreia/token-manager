import { useState, useEffect, useCallback } from 'react'

export const useTimer = (initialTime: number, onFinish?: () => void) => {
  const [time, setTime] = useState(initialTime)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          setIsRunning(false)
          onFinish?.()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isRunning, onFinish])

  const start = useCallback(() => setIsRunning(true), [])
  const pause = useCallback(() => setIsRunning(false), [])
  const reset = useCallback(() => {
    setTime(initialTime)
    setIsRunning(false)
  }, [initialTime])

  return { time, isRunning, start, pause, reset }
}
