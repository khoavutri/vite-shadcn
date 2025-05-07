import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
//tslint:disable
export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}

export const useDebouncedSearch = (callback: (code: string) => void, delay: number) => {
  const timerRef = useRef<number | null>(null)

  const debounce = useCallback(
    (code: string) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
      timerRef.current = window.setTimeout(() => {
        callback(code)
        timerRef.current = null
      }, delay)
    },
    [callback, delay]
  )

  return debounce
}

export function useTimeout(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback)

  // Remember the latest callback if it changes.
  useIsomorphicLayoutEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the timeout.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    // Note: 0 is a valid value for delay.
    if (!delay && delay !== 0) {
      return
    }

    const id = setTimeout(() => savedCallback.current(), delay)

    return () => clearTimeout(id)
  }, [delay])
}

export const useStateWithPromise = <T>(initialState: any) => {
  const [state, setState] = useState<T>(initialState)
  const resolverRef = useRef<any>(null)

  useEffect(() => {
    if (resolverRef.current) {
      resolverRef.current(state)
      resolverRef.current = null
    }
    /**
     * Since a state update could be triggered with the exact same state again,
     * it's not enough to specify state as the only dependency of this useEffect.
     * That's why resolverRef.current is also a dependency, because it will guarantee,
     * that handleSetState was called in previous render
     */
  }, [resolverRef.current, state])

  const handleSetState = useCallback(
    (stateAction: any) => {
      setState(stateAction)
      return new Promise((resolve) => {
        resolverRef.current = resolve
      })
    },
    [setState]
  )

  return [state, handleSetState]
}

export const debounce = (func: any, delay: number) => {
  let timeout: any = null

  return function executedFunc(...args: Array<any>) {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      func(...args)
      timeout = null
    }, delay)
  }
}
