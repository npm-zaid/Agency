import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import CustomEase from 'gsap/CustomEase';
import Hero from '../components/Hero';

gsap.registerPlugin(CustomEase);

const HomePage = () => {
    const customEase = CustomEase.create('custom', '.87,0,.13,1');
    
    const counterRef = useRef(null);
    const loadingRef = useRef(null);
    const WrapperRef = useRef(null);

    const [showHero, setShowHero] = useState(false); // Control Hero visibility

    useEffect(() => {
        gsap.set(WrapperRef.current, { scale: 0, rotation: -20 });

        const tl = gsap.timeline();

        tl.to('.hero', {
            clipPath: 'polygon(0% 45%, 25% 45%, 25% 55%, 0% 55%)',
            ease: customEase,
            duration: 1.5,
            delay: 1
        })
        .to('.hero', {
            clipPath: 'polygon(0% 45%, 100% 45%, 100% 55%, 0% 55%)',
            ease: customEase,
            duration: 2
        })
        .to(loadingRef.current, { 
            width: '100vw', 
            duration: 2, 
            ease: customEase
        }, "-=2")
        .to(counterRef.current, {
            textContent: 100,
            duration: 2,
            ease: customEase,
            snap: { textContent: 1 },
        }, "-=2")
        .to('.hero', {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            ease: customEase,
            duration: 2.5,
            onStart: () => {
                gsap.to(WrapperRef.current, {
                    scale: 1,
                    rotation: 0,
                    ease: customEase,
                    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                    duration: 1.2,
                    delay: 1,
                    onStart: () => {
                        setShowHero(true); //Show Hero once animation is done
                    }
                });
            }
        })
        .to(loadingRef.current, { 
            opacity: 0,
            duration: 1.5, 
            ease: customEase
        });
    }, []);

    return (
        <div className="hero w-full h-screen flex flex-col items-center justify-between relative bg-black">
            {/* Loading Counter */}
            <div ref={loadingRef} className="loading flex items-center justify-between w-[25vw] absolute top-1/2 left-0 p-5 sm:text-3xl text-xl transform -translate-y-1/2  text-[#E99768]">
                <p>Loading</p>
                <p><span ref={counterRef}>0</span>%</p>
            </div>

            {/*  Wrapper */}
            <div ref={WrapperRef} className="wrapper absolute inset-0 top-0 left-0">
                {showHero && <Hero animationDelay={.5} />} 
                {/*Hero appears only when showHero is true */}
            </div>
        </div>
    );
};

export default HomePage;
