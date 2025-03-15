import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import pic1 from '../Assets/image1.png';
import pic2 from '../Assets/image2.png';
import pic3 from '../Assets/image3.png';

const ImageBubbles = () => {
    const bubbleContainerRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const bubbles = bubbleContainerRef.current.querySelectorAll('.bubble');
        const textElements = bubbleContainerRef.current.querySelectorAll('p, h1');

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: bubbleContainerRef.current,
                start: 'top 70%',
                toggleActions: 'play none none reverse',
            },
        });

    
        tl.fromTo(
            textElements,
            { opacity: 0, scale: 0, y: '-100%' },
            { opacity: 1, scale: 1, y: '0%', duration: 0.5, ease: 'power2.out', stagger: 0.2 }
        );

    
        tl.fromTo(
            bubbles[0],
            { x: '-100%', opacity: 0, scale: 0 },
            { x: '0%', opacity: 1, scale: 1, duration: 0.75, ease: 'elastic.out(1,0.3)' }
        );

        tl.fromTo(
            bubbles[1],
            { x: '100%', opacity: 0, scale: 0 },
            { x: '0%', opacity: 1, scale: 1, duration: 0.75, ease: 'elastic.out(1,0.3)' }
        );

        tl.fromTo(
            bubbles[2],
            { y: '100%', opacity: 0, scale: 0 },
            { y: '0%', opacity: 1, scale: 1, duration: 0.75, ease: 'elastic.out(1,0.3)' }
        );

    }, []);

    return (
        <>
            {/* Spacer div */}
            <div className='h-screen w-full bg-[#E99768]'></div>

            {/* Bubble Section */}
            <section ref={bubbleContainerRef} className='h-screen text-center w-full flex flex-col gap-8 items-center justify-center relative overflow-hidden'>
                <p>WHO WE ARE</p>
                <h1 className='sm:text-[6vw] sm:leading-[6vw] text-[12vw] leading-[12vw]'>THE DESIGN <br/>AGENCY</h1>
                <p className='sm:leading-[1.8vw]'>Engaging user experience, world-class<br/> web design & development, unique <br/>brand identity solutions to shine.</p>

                {/* Bubbles */}
                <img src={pic1} alt="Bubble 1" className="bubble sm:w-32 sm:h-32 w-[24vw] h-[24vw] rounded-full absolute top-30 right-35" />
                <img src={pic2} alt="Bubble 2" className="bubble sm:w-32 sm:h-32 w-[24vw] h-[24vw] rounded-full absolute bottom-25 right-10" />
                <img src={pic3} alt="Bubble 3" className="bubble sm:w-32 sm:h-32 w-[24vw] h-[24vw] rounded-full absolute bottom-12 sm:right-[26vw] right-[50vw]" />
            </section>
        </>
    );
};

export default ImageBubbles;
