export interface WeatherData {
  temperature: number
  condition: string
  windSpeed: number
  humidity: number | null
  locationLabel: string
  updatedAt: Date
}

const WMO_CODES: Record<number, string> = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Foggy',
  48: 'Icy fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  71: 'Slight snow',
  73: 'Moderate snow',
  75: 'Heavy snow',
  80: 'Slight showers',
  81: 'Moderate showers',
  82: 'Violent showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with hail',
  99: 'Thunderstorm with heavy hail',
}

export async function fetchWeather(lat: number, lon: number): Promise<WeatherData> {
  const weatherUrl =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${lat}&longitude=${lon}` +
    `&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`

  const [weatherResult, geoResult] = await Promise.allSettled([
    fetch(weatherUrl),
    fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
      { headers: { 'Accept-Language': 'en' } },
    ),
  ])

  if (weatherResult.status === 'rejected' || !weatherResult.value.ok) {
    throw new Error('Failed to fetch weather data. Please try again.')
  }

  const weather = await weatherResult.value.json()
  const current = weather.current

  let locationLabel = `${lat.toFixed(2)}°, ${lon.toFixed(2)}°`
  if (geoResult.status === 'fulfilled' && geoResult.value.ok) {
    const geo = await geoResult.value.json()
    const city =
      geo.address?.city ||
      geo.address?.town ||
      geo.address?.village ||
      geo.address?.county
    const state = geo.address?.state
    if (city && state) locationLabel = `${city}, ${state}`
    else if (city) locationLabel = city
  }

  return {
    temperature: Math.round(current.temperature_2m),
    condition: WMO_CODES[current.weather_code as number] ?? 'Unknown',
    windSpeed: Math.round(current.wind_speed_10m),
    humidity: current.relative_humidity_2m ?? null,
    locationLabel,
    updatedAt: new Date(),
  }
}
