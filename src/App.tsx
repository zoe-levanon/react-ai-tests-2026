import { Route, Routes } from 'react-router-dom'
import { HomeScreen } from './screens/HomeScreen'
import { WeatherScreen } from './screens/WeatherScreen'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/weather" element={<WeatherScreen />} />
    </Routes>
  )
}

export default App
