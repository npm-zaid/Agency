import React, { useEffect, useRef } from 'react';
import logo from '../assets/agency-logo.png';
import arrow from '../assets/right-arrow-svgrepo-com.svg';
import gsap from 'gsap';

const Hero = ({ animationDelay }) => { 
  const logoRef = useRef(null);
  const arrowRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: animationDelay }); 

    // GSAP Animation for Text
    tl.fromTo(
      'h1 span',
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power2.out' }
    );

    // GSAP Animation for Images (Logo & Arrow)
    tl.fromTo(
      logoRef.current,
      { opacity: 0, y: -100 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    );

    tl.fromTo(
      arrowRef.current,
      { opacity: 0, y: 100, rotate: 180 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    );
  }, [animationDelay]); 

  return (
    <section className='h-screen w-[100vw] bg-[#E99768] flex flex-col items-center justify-around'>
      {/* Logo */}
      <img ref={logoRef} src={logo} alt="logo" className='w-[12vw] sm:w-[3vw]' />

      {/* Text Design */}
      <div className='Text-Design'>
        <div className='overflow-hidden'>
          <h1 className='text-[15vw] leading-[15vw] sm:text-[10vw] sm:leading-[9vw] text-center sm:tracking-[-8px]'
              style={{ whiteSpace: 'pre-wrap' }}>
            {"THE DESIGN".split('').map((item, index) => (
              <span className='inline-block' key={index}>{item}</span>
            ))}
          </h1>
        </div>

        <div className='overflow-hidden'>
          <h1 className='text-[15vw] leading-[15vw] sm:text-[10vw] sm:leading-[9vw] text-center sm:tracking-[-8px]'>
            {'AGENCY'.split('').map((item, index) => (
              <span className='inline-block' key={index}>{item}</span>
            ))}
          </h1>
        </div>
      </div>

      {/* Arrow */}
      <img ref={arrowRef} src={arrow} alt="arrow" className='arr sm:w-[4vw] w-[12vw]' />
    </section>
  );
};

export default Hero;
