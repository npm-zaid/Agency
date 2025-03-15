import React, { useEffect, useRef } from 'react'
import Helmet from './components/Helmet'
import Lenis from '@studio-freight/lenis';

const App = () => {
  const lenisRef = useRef();
  useEffect(() => { 
    const lenis = new Lenis({
      duration: 1.2, 
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      direction: 'vertical',
      gestureDirection: 'vertical', 
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: true,
      touchMultiplier: 2,
      infinite: false,
      lerp: 0.02,
      wheelMultiplier: 1,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    lenisRef.current = lenis; 

    return () => {
      lenis.destroy(); 
    };
  }, []);
  return (
    <div className='overflow-hidden bg-[#E99768]'>
      <Helmet />
    </div>
  )
}

export default App