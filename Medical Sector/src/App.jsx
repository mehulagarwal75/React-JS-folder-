import React from 'react'
import './App.css'
import Header from './components/Header'
import Slider from './components/Slider'
import Work from './components/Work'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <div className="app">
      <Header />
      <Slider />
      <Work />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
