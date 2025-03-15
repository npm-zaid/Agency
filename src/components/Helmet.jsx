import React, { useEffect, useRef, useCallback,useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import helmetModel from '../model/02.glb';
import texPic from '../assets/A_C_02.jpg';
import texPic2 from '../assets/A_N_02.jpg';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Scale from '../components/Scale';
import Bubble from '../components/Bubble';
import arrow from "../assets/right-arrow-svgrepo-com.svg";
import see from "../assets/add-plus-svgrepo-com.svg";
import item3 from "../assets/item1.png";
import item2 from "../assets/item2.png";
import item1 from "../assets/item3.png";
import HomePage from '../components/HomePage';

const Helmet = () => {
    const canvasRef = useRef();
    const HelmetRef = useRef();
    const cursorRef = useRef();
    const OneRef = useRef(null);
    const TwoRef = useRef(null);
    const ThreeRef = useRef(null);
    const carouselRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(2);
    const arrowImgRef = useRef(null);
    const seeImgRef = useRef(null);
    const isRotating = useRef(false); 

    const images = [
      item1,
      item2,
      item3,
      item1,
      item2,
     
    ];

    const Positions = [
      { id: 'first', position: { x: -.5, y: -2, z: -1 }, rotation: { x: -.2, y: -.2, z: -.06 } },
      { id: 'second', position: { x: 2, y: -2, z: .8 }, rotation: { x: -0.5, y: 3.14*1.5, z: -.4 } },
      { id: 'third', position: { x: -2, y: -2, z: -10 }, rotation: { x: 0.3, y: -0.5, z: 0 } },
      { id: 'fourth', position: { x: -3.14*1.2, y: -1.5, z: 1.8}, rotation: { x: 0.2, y: 1.2, z: -.3 }},
      { id: 'fifth', position: { x: -3.14*1.2, y: -1.5, z: 1.8}, rotation: { x: 0.2, y: 1.2, z: -.3 }},
      { id: 'sixth', position: { x: -3.14*1.2, y: -1, z: -10 }, rotation: { x: 0, y: 3.14, z: -.2 } },
      { id: 'seventh', position: { x: 0, y: -2, z: 1 }, rotation: { x: -.2, y: -.2, z: -.06 } },
    ];

  
    useEffect(() => {
      // Scene Setup
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.set(2, 2, 5);
      const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.shadowMap.enabled = true;
  
      window.addEventListener("resize", () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      });
  
      // Lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 2);
      scene.add(ambientLight);
      const directionalLight = new THREE.DirectionalLight(0xffffff, 4);
      directionalLight.position.set(5, 5, 5);
      directionalLight.castShadow = true;
      scene.add(directionalLight);
  
      // Controls
      const controls = new OrbitControls(camera, canvasRef.current);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.enableZoom = false;
  
      // Load Textures
      const textureLoader = new THREE.TextureLoader();
      const texture = textureLoader.load(texPic);
      const texture2 = textureLoader.load(texPic2);
      texture.flipY = false;
      texture2.flipY = false;
  
      // Load Model
      const gltfLoader = new GLTFLoader();
      gltfLoader.load(helmetModel, (gltf) => {
        const model = gltf.scene;
        model.position.set(-0.5, -2, -1);
        model.rotation.set(-0.3, -0.2, 0);
        model.castShadow = true;
        model.receiveShadow = true;
        HelmetRef.current = model;
  
        model.traverse((child) => {
          if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial({
              map: texture,
              roughnessMap: texture2,
              roughness: 0.4,
              metalness: 0.5,
            });
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
  
        scene.add(model);
      });
  
      // Animation Loop
      const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
  
       if (HelmetRef.current) {
        HelmetRef.current.rotation.y += isRotating.current ? 0.02 : 0.001;
      }
  
        renderer.render(scene, camera);
      };
  
      animate();
    }, []);
  
  
  // Detect 7th section for rotation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isRotating.current = entry.isIntersecting; 
      },
      { threshold: 0.5 }
    );

    const seventhSection = document.getElementById("seventh");
    if (seventhSection) observer.observe(seventhSection);

    return () => {
      if (seventhSection) observer.unobserve(seventhSection);
    };
  }, []);


  //move model
    const modelMove = () => {
        const sections = document.querySelectorAll('.section');
        let currentSection;
        sections.forEach((section) => {
          const rect = section.getBoundingClientRect();
          if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            currentSection = section.id;
          }
        });
    
        const position_active = Positions.findIndex((val) => val.id === currentSection);
        if (position_active >= 0 && HelmetRef.current) {
          const new_coordinate = Positions[position_active];
        
          gsap.to(HelmetRef.current.position, {
            x: new_coordinate.position.x,
            y: new_coordinate.position.y,
            z: new_coordinate.position.z,
            duration: 1.2,
            ease: "power2.out",
          });
        
          gsap.to(HelmetRef.current.rotation, {
            x: new_coordinate.rotation.x,
            y: new_coordinate.rotation.y,
            z: new_coordinate.rotation.z,
            duration: 1.2,
            ease: "power2.out",
          });
        }
        
      };

    useEffect(() => {
        window.addEventListener('scroll', modelMove);
        return () => {
          window.removeEventListener('scroll', modelMove);
        };
      }, []); // Add and remove scroll event listener
    




  //THIS IS  CURSOR LOGIC
   const moveCursor = (e) => {
        if (cursorRef.current) {
          gsap.to(cursorRef.current, {
            x: e.clientX - 25,
            y: e.clientY - 25,
            duration: 0.1,
            ease: "power2.out",
          });
        }
      };

      useEffect(() => {
        window.addEventListener('mousemove', moveCursor);
        return () => {
          window.removeEventListener('mousemove', moveCursor);
        };
      }, [moveCursor]);

        // Cursor Effects
  const handleMouseEnter = useCallback((imgRef, rotateValue) => {
    if (imgRef.current) {
      imgRef.current.style.visibility = "visible";
    }
    gsap.to(cursorRef.current, {
      scale: 2,
      rotate: rotateValue,
      duration: 0.5,
      ease: "back.out(1.7)",
    });
  }, []);

  const handleMouseLeave = useCallback((imgRef) => {
    if (imgRef.current) {
      imgRef.current.style.visibility = "hidden";
    }
    gsap.to(cursorRef.current, {
      scale: 1,
      rotate: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  }, []);

  useEffect(() => {

    const one = OneRef.current;
    const two = TwoRef.current;
    const three = ThreeRef.current;

   
    if (one) {
      one.addEventListener("mouseenter", () => handleMouseEnter(arrowImgRef, -90));
      one.addEventListener("mouseleave", () => handleMouseLeave(arrowImgRef));
    }

    if (two) {
      two.addEventListener("mouseenter", () => handleMouseEnter(seeImgRef, 360));
      two.addEventListener("mouseleave", () => handleMouseLeave(seeImgRef));
    }

    if (three) {
      three.addEventListener("mouseenter", () => handleMouseEnter(arrowImgRef, 90));
      three.addEventListener("mouseleave", () => handleMouseLeave(arrowImgRef));
    }

    return () => {
      if (one) {
        one.removeEventListener("mouseenter", () => handleMouseEnter(arrowImgRef, -90));
        one.removeEventListener("mouseleave", () => handleMouseLeave(arrowImgRef));
      }
      if (two) {
        two.removeEventListener("mouseenter", () => handleMouseEnter(seeImgRef, 360));
        two.removeEventListener("mouseleave", () => handleMouseLeave(seeImgRef));
      }
      if (three) {
        three.removeEventListener("mouseenter", () => handleMouseEnter(arrowImgRef, 90));
        three.removeEventListener("mouseleave", () => handleMouseLeave(arrowImgRef));
      }
    };
  }, [moveCursor, handleMouseEnter, handleMouseLeave]);

  // Move Carousel Left
  const moveLeft = () => {
    if (currentIndex === 0) return;
    setCurrentIndex((prev) => prev - 1);
    gsap.to(carouselRef.current, { x: `+=35vw`, duration: 0.8, ease: "sine.inOut" });
    triggerAnimation("left");
  };

  // Move Carousel Right
  const moveRight = () => {
    if (currentIndex === images.length - 1) return;
    setCurrentIndex((prev) => prev + 1);
    gsap.to(carouselRef.current, { x: `-=35vw`, duration: 0.8, ease: "sine.inOut" });
    triggerAnimation("right");
  };

  // GSAP Smooth Sliding Effect
  const triggerAnimation = (dir) => {
    gsap.timeline()
      .to(".childBox", {
        scaleX: 1.1,
        duration: 0.3,
        ease: "sine.inOut",
      })
      .to(".childBox", {
        scaleX: 1,
        duration: 0.3,
        ease: "sine.inOut",
      });
  };

  return (
      <>
      <div ref={cursorRef} className="cursor h-[50px] w-[50px] active:scale-90 z-[9999]  fixed pointer-events-none flex items-center justify-center"
        >
        <img ref={arrowImgRef} src={arrow} alt="arrow" className="absolute w-[5vw]" style={{ visibility: "hidden" }} />
        <img ref={seeImgRef} src={see} alt="see" className="absolute w-[5vw]" style={{ visibility: "hidden" }} />
      </div>
      
        <canvas className="fixed inset-0 z-10 pointer-events-none" ref={canvasRef}></canvas>
        <div id="first" className="w-full h-screen section"><HomePage/></div>
        <div id="second" className="w-full h-screen section "><Scale/></div>
        <div id="third" className="w-full h-screen section "><Bubble/></div>
        <div id="fourth" className="w-full h-screen section"></div>
        <div id="fifth" className="h-screen w-full  section">
          {/* Carousel Container */}
      <div  className="carousel  h-screen w-full bg-[#E99768] flex items-center relative z-[888]">
        <button ref={OneRef} onClick={moveLeft} className={`h-full w-full z-50 `}></button>
        <button ref={TwoRef} className="h-full w-full z-50 "></button>
        <button ref={ThreeRef} onClick={moveRight} className={`h-full w-full z-50  `}></button>

        {/* Image Carousel */}
        <div className="h-screen min-w-[100vw] bg-[#E99768] z-0 flex items-center p-6 absolute">
          <div ref={carouselRef} className="flex gap-22 flex-nowrap justify-center items-center sm:-translate-x-[65vw] -translate-x-[100vw]">
            {images.map((src, index) => (
              <div key={index} className="h-[50vh] childBox sm:min-w-[40vw] min-w-[80vw]">
                <img className="h-full w-full object-cover rounded-xl" src={src} alt={`carousel-${index}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
       </div>
      <div id="sixth" className="h-screen w-full section"></div>
      <div id="seventh" className="h-screen p-8 w-full section  flex items-end justify-center">
<h1 className=" py-4 border-t border-black text-center">
© 2025 Envato Trademarks and brands are the property of their respective owners.
</h1>
      </div>
      </>
    );
};

export default Helmet;
