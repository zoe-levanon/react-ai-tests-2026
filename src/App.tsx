import { Route, Routes } from 'react-router-dom'
import { HomeScreen } from './screens/HomeScreen'
import { PresentationScreen } from './screens/PresentationScreen'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/presentations/:slug" element={<PresentationScreen />} />
    </Routes>
  )
}

export default App
