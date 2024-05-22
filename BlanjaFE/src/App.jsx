import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RouterBlanja from './configs/RouterBlanja/RouterBlanja'

function App() {
  const [count, setCount] = useState(0)

  return (
    <RouterBlanja />
  )
}

export default App
