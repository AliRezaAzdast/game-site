import React from 'react'
import Hero from './components/Hero'
import About from './About'
import Navbar from './components/Navbar'
import Features from './components/Features'
import Story from './components/Story'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Cursor from './components/Cursor'

const App = () => {
  return (
    <main className='relative min-h-screen w-screen overflow-x-hidden'>
      <Cursor/>
      <Navbar/>
      <Hero/>
      <About/> 
      <Features/>
      <Story/>
      <Contact/>
      <Footer/>
    </main>
  )
}

export default App