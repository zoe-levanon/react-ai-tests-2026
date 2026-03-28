import { useState, useCallback } from 'react'
import { fetchWeather, type WeatherData } from '../services/weather'

export type WeatherPhase = 'idle' | 'locating' | 'fetching' | 'success' | 'error'

export interface WeatherState {
  phase: WeatherPhase
  data: WeatherData | null
  error: string | null
  load: () => void
}

export function useCurrentWeather(): WeatherState {
  const [phase, setPhase] = useState<WeatherPhase>('idle')
  const [data, setData] = useState<WeatherData | null>(null)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(() => {
    if (!navigator.geolocation) {
      setPhase('error')
      setError('Geolocation is not supported by your browser.')
      return
    }

    setPhase('locating')
    setError(null)

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        setPhase('fetching')
        try {
          const result = await fetchWeather(
            position.coords.latitude,
            position.coords.longitude,
          )
          setData(result)
          setPhase('success')
        } catch (e) {
          setError(e instanceof Error ? e.message : 'Failed to fetch weather.')
          setPhase('error')
        }
      },
      (err) => {
        let msg: string
        if (err.code === err.PERMISSION_DENIED) {
          msg =
            'Location access was denied. Allow location access in your browser settings, then try again.'
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          msg = 'Your location could not be determined. Check your device settings.'
        } else {
          msg = 'Location request timed out. Please try again.'
        }
        setError(msg)
        setPhase('error')
      },
    )
  }, [])

  return { phase, data, error, load }
}
