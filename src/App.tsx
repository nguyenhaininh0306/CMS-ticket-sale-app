import React from 'react'
import Header from './component/Header'
import { BrowserRouter } from 'react-router-dom'

import './App.css'

const App: React.FunctionComponent = () => {
  return (
    <BrowserRouter>
      <div className='App'>
        <Header />
      </div>
    </BrowserRouter>
  )
}

export default App
