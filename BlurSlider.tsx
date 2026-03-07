import React, { useEffect, useRef, useState } from 'react';

// --- DATA MOCK ---
// Utilizziamo immagini reali per una resa premium. 
// Il CSS si occuperà di sfumarle e fonderle.
const showcaseItems = [
  {
    id: 1,
    title: 'QuietComfort Ultra',
    description: 'Auricolari con audio spaziale e cancellazione del rumore di prima classe. Fino a 6 ore di ascolto con tecnologia CustomTune.',
    price: '$279.00',
    actionUrl: '#',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'
  },
  {
    id: 2,
    title: 'Powerbeats Pro',
    description: 'Auricolari ad alte prestazioni totalmente wireless con fino a 9 ore di ascolto. Design resistente al sudore con ganci regolabili.',
    price: '$249.99',
    actionUrl: '#',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80'
  },
  {
    id: 3,
    title: 'FocusBuds Elite',
    description: 'Cancellazione del rumore di fama mondiale con fino a 8.5 ore di batteria. Auricolari wireless IPX4 con qualità sonora notevole.',
    price: '$199.00',
    actionUrl: '#',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80'
  },
  {
    id: 4,
    title: 'Ultra Open Design',
    description: 'Design open-ear con audio immersivo spazializzato. Ascolta il mondo intorno a te mentre ti godi un suono ricco e privato.',
    price: '$299.00',
    actionUrl: '#',
    image: 'https://images.unsplash.com/photo-1590658268826-363ac6d28f97?w=800&q=80'
  },
  {
    id: 5,
    title: 'TE-W1 Adaptive',
    description: 'Cancellazione del rumore ibrida adattiva avanzata con sistema 3D coassiale. Configurazione a doppio driver dinamico.',
    price: '$245.00',
    actionUrl: '#',
    image: 'https://images.unsplash.com/photo-1572536147155-6a15abe0411d?w=800&q=80'
  },
  {
    id: 6,
    title: 'CCA CA24 IEM',
    description: 'Monitor in-ear professionali Hi-Fi con 12 unità BA per lato. Serie King Kong con crossover elettronico e stampa 3D.',
    price: '$605.00',
    actionUrl: '#',
    image: 'https://images.unsplash.com/photo-1613040809024-e4edac217a17?w=800&q=80'
  }
];

// --- ICONS ---
const ExploreIcon = ({ className }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.33334 12.6667L12.6667 3.33333M12.6667 3.33333H4.66667M12.6667 3.33333V11.3333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// --- MAIN COMPONENT ---
export default function App() {
  const swiperRef = useRef(null);
  const [isSwiperLoaded, setIsSwiperLoaded] = useState(false);

  // Iniezione dinamica di Swiper tramite CDN per garantire la stabilità nell'ambiente isolato
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js';
    script.onload = () => {
      if (window.Swiper) {
        swiperRef.current = new window.Swiper('.swiper', {
          loop: true,
          mousewheel: true,
          slidesPerView: 4,
          speed: 1500,
          spaceBetween: 0
        });
        setIsSwiperLoaded(true);
      }
    };
    document.head.appendChild(script);

    return () => {
      if (swiperRef.current) swiperRef.current.destroy();
      document.head.removeChild(link);
      document.head.removeChild(script);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&family=Roboto+Condensed:wght@400;600&display=swap');

        :root {
            --transition-duration: 1.5s;
            --transition-timing: ease;
            --base-scale: 0.5;
            --active-scale: 2;
            --next-scale: 1.6;
            --next-plus-scale: 0.9;
            --base-blur: 20px;
            --next-blur: 0px;
            --next-plus-blur: 10px;
            --blur-effect: 50px;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body, html {
            height: 100vh;
            width: 100vw;
            overflow: hidden;
            background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
        }

        .blur-slider {
            height: 100vh;
            width: 100vw;
            font-family: "Roboto Condensed", sans-serif;
            position: relative;
        }

        .blur-slider__logo {
            position: absolute;
            left: 75px;
            top: 50px;
            z-index: 10;
            font-size: 28px;
            font-weight: 700;
            color: #111;
            letter-spacing: -1px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .blur-slider__logo-dot {
            width: 12px;
            height: 12px;
            background-color: #111;
            border-radius: 50%;
            display: inline-block;
        }

        .swiper {
            height: 100%;
            width: 100%;
            overflow: hidden;
        }

        .blur-slider__slide {
            display: flex;
            justify-content: center;
            align-items: center;
            transition: transform var(--transition-duration) var(--transition-timing);
        }

        /* --- IMMAGINE PRINCIPALE --- */
        .blur-slider__slide-image-container {
            width: 300px;
            aspect-ratio: 1;
            filter: blur(var(--base-blur));
            transition: all var(--transition-duration) var(--transition-timing);
            scale: var(--base-scale);
            opacity: 1;
            transform: translateX(50%);
            /* TRUCCO CSS: Rimuove lo sfondo bianco dalle immagini non trasparenti */
            mix-blend-mode: multiply; 
        }

        .blur-slider__slide-image {
            width: 100%;
            height: 100%;
            object-fit: contain;
            border-radius: 20px;
        }

        /* --- IMMAGINE DI SFONDO BLUR --- */
        .blur-slider__slide-image-blur-container {
            opacity: 0;
            position: absolute;
            z-index: -1;
            transition: all var(--transition-duration) var(--transition-timing);
            mix-blend-mode: multiply;
        }

        .blur-slider__slide-image-blur {
            width: 300px;
            aspect-ratio: 1;
            object-fit: contain;
            border-radius: 50%;
        }

        /* --- CONTENUTO (TESTI) --- */
        .blur-slider__slide-content {
            position: absolute;
            opacity: 0;
            filter: blur(20px);
            transition: opacity var(--transition-duration) ease-in-out, filter var(--transition-duration) ease-in-out, transform var(--transition-duration) var(--transition-timing);
            width: 35vw;
            min-width: 320px; /* Aggiunto: previene lo schiacciamento del testo su schermi piccoli */
            padding: 0 2vw; /* Aggiunto: padding orizzontale di sicurezza */
            z-index: 5;
            pointer-events: none; /* Previene blocchi del mousewheel */
        }

        .blur-slider__slide-content-title {
            font-size: 42px;
            margin-bottom: 16px;
            font-weight: 600;
            line-height: 1.1;
            color: #1a1a1a;
        }

        .blur-slider__slide-content-text {
            font-family: "Poppins", sans-serif;
            font-size: 15px;
            color: rgba(0,0,0,0.6);
            line-height: 1.6;
            max-width: 90%;
        }

        .blur-slider__price {
            font-size: 34px;
            margin-block: 24px;
            font-weight: 600;
            color: #888;
        }

        .blur-slider__action-button {
            display: inline-flex;
            background: transparent;
            border: none;
            font-family: "Roboto Condensed", sans-serif;
            font-weight: 600;
            font-size: 18px;
            text-transform: uppercase;
            color: #111;
            text-decoration: none;
            align-items: center;
            cursor: pointer;
            pointer-events: auto; /* Riattiva i click sul bottone */
            transition: opacity 0.3s;
        }
        
        .blur-slider__action-button:hover {
            opacity: 0.7;
        }

        .blur-slider__action-icon {
            width: 20px;
            height: 20px;
            margin-left: 10px;
        }

        /* ======================================================== */
        /* === MAGIA VISIVA SWIPER + BEM === */
        /* ======================================================== */

        /* Stato: Slide Attivo (Quello che scompare a sinistra) */
        .swiper-slide-active .blur-slider__slide-image-container {
            scale: var(--active-scale);
            transform: translateX(-60%);
            opacity: 0;
        }

        /* Stato: Slide Successivo (Quello a fuoco al centro) */
        .swiper-slide-next {
            transform: translateX(50%);
        }

        .swiper-slide-next .blur-slider__slide-image-container {
            filter: blur(var(--next-blur));
            scale: var(--next-scale);
            transform: translateX(20%);
            opacity: 1;
        }

        .swiper-slide-next .blur-slider__slide-image-blur-container {
            opacity: 0.3;
            filter: blur(var(--blur-effect));
            z-index: -1;
            transform: translate(100%);
        }

        .swiper-slide-next .blur-slider__slide-image-blur-container .blur-slider__slide-image-blur {
            scale: var(--active-scale);
        }

        .swiper-slide-next .blur-slider__slide-content {
            transform: translateX(-40%); /* Modificato da -80% a -40% per evitare il cropping a sinistra */
            opacity: 1;
            filter: blur(0);
        }

        /* Stato: Slide Successivo + 1 (Quello sfocato a destra) */
        .swiper-slide-next + .swiper-slide {
            transform: translateX(30%);
        }

        .swiper-slide-next + .swiper-slide .blur-slider__slide-image-container {
            filter: blur(var(--next-plus-blur));
            scale: var(--next-plus-scale);
            opacity: 1;
        }
      `}</style>

      <main className="blur-slider">
        <div className="blur-slider__logo">
          <span className="blur-slider__logo-dot"></span> EBüDs
        </div>

        {/* SWIPER CONTAINER */}
        <div className="swiper" style={{ opacity: isSwiperLoaded ? 1 : 0, transition: 'opacity 0.5s' }}>
          <div className="swiper-wrapper">
            {showcaseItems.map((item) => (
              <div key={item.id} className="swiper-slide blur-slider__slide">
                
                {/* Contenuto Testuale */}
                <div className="blur-slider__slide-content">
                  <div className="blur-slider__slide-content-info">
                    <h2 className="blur-slider__slide-content-title">{item.title}</h2>
                    <p className="blur-slider__slide-content-text">{item.description}</p>
                  </div>
                  <div className="blur-slider__price">
                    {item.price}
                  </div>
                  <a href={item.actionUrl} className="blur-slider__action-button">
                    <span className="blur-slider__action-text">Explore Product</span>
                    <ExploreIcon className="blur-slider__action-icon" />
                  </a>
                </div>

                {/* Immagine Principale */}
                <div className="blur-slider__slide-image-container">
                  <img src={item.image} alt={item.title} className="blur-slider__slide-image" crossOrigin="anonymous" />
                </div>

                {/* Immagine Ombra (Blur) */}
                <div className="blur-slider__slide-image-blur-container">
                  <img src={item.image} alt="" className="blur-slider__slide-image-blur" crossOrigin="anonymous" />
                </div>

              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}