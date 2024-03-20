import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

export function App() {
  const [count, setCount] = useState(0)

  return (
    // Las <> Son el inicializador
    <>
      <div class="mainbar">
        <input type="search" class="search" />
        <img src="https://unavatar.io/kikobeats" alt="imagen usuario" class="user" />
        <div class="options">
          <h1>Menu</h1>
          <h1>WishList</h1>
          <h1>Wallet</h1>
        </div>
      </div>
      <div className="content">
      </div>
    </>
  )
}