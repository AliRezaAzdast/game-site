import React, { useEffect, useRef, useState } from 'react'
import Button from './button'
import gsap from 'gsap'
import { TiLocationArrow } from 'react-icons/ti'
import { useWindowScroll } from 'react-use';

const navItems = ["Nexus", "Vault", "Prologue", "About", "Contact"];

const Navbar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [isIndicaterActive, setIsIndicaterActive] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isNavVisible, setIsNavVisible] = useState(true)

  const navContainerRef = useRef(null)
  const audioElementRef = useRef(null)

  const {y: currentScollY } = useWindowScroll();

    useEffect(() => {
        if(currentScollY === 0){
          navContainerRef.current.classList.remove('floating-nav')
        } else if (currentScollY > lastScrollY){
          setIsNavVisible(false)
          navContainerRef.current.classList.add('floating-nav')
        } else if (currentScollY < lastScrollY){
          setIsNavVisible(true)
          navContainerRef.current.classList.add('floating-nav')
        }
        setLastScrollY(currentScollY)

    },[currentScollY, lastScrollY])
  
    useEffect(() => {
      gsap.to(navContainerRef.current, {
        y: isNavVisible ? 0 : -100,
        opacity: isNavVisible ? 1 : 0,
        duration: 0.2,
      })
    },[isNavVisible])

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((pre) => !pre);
    setIsIndicaterActive((pre) => !pre);
  }

  useEffect(() => {
    if(isAudioPlaying){
      audioElementRef.current.play();
    }else{
      audioElementRef.current.pause();
    }
  },[isAudioPlaying])

  return (
    <div ref={navContainerRef} className='fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6 '>
      <header className='absolute top-1/2 w-full -translate-y-1/2'>
        <nav className='flex size-full items-center justify-between p-4'>
          <div className='flex items-center gap-7'>
            <img src="/img/logo.png" alt="logo" className='w-10' />
            <Button 
            id='product-button'
            title='Product'
            rightIcon={<TiLocationArrow/>}
            containerClass='bg-blue-50 md:flex hidden items-center justify-center gap-1'
            ></Button>
          </div>
          <div className='flex h-full items-center'>
            <div className='hidden md:block'>
              {navItems.map(item => (
                <a key={item} href={`#${item.toLowerCase()}`} className='nav-hover-btn'>
                  {item}
                </a>
              ))}
            </div>
            <button className='ml-10 p-2 flex items-center space-x-0.5' onClick={toggleAudioIndicator}>
              <audio ref={audioElementRef} src="/audio/loop.mp3"  className='hidden' loop/>
              {[1,2,3,4].map(bar => (
                  <div key={bar} className={`indicator-line bg-white ${isIndicaterActive ? 'active' : ''}`}
                   style={{ animationDelay: `${bar * 0.1}s`}}/>
                ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default Navbar