import React, { useLayoutEffect, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { gsap } from 'gsap';

// Icona SVG Inline per rimuovere la dipendenza da react-icons
const ArrowUpRightIcon = () => (
  <svg 
    width="1em" 
    height="1em" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M7 17L17 7M7 7h10v10"/>
  </svg>
);

// --- TYPES ---
export type NavCardLink = {
  label: string;
  href: string;
  ariaLabel: string;
};

export type NavCardItem = {
  label: string;
  bgColor: string;
  textColor: string;
  links: NavCardLink[];
};

export interface NavCardProps {
  logo: string;
  logoAlt?: string;
  items: NavCardItem[];
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  ease?: string;
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
}

// --- NAV CARD COMPONENT ---
const NavCard: React.FC<NavCardProps> = ({
  logo,
  logoAlt = 'Logo',
  items,
  orientation = 'vertical',
  className = '',
  ease = 'power3.out',
  baseColor = '#fff',
  menuColor,
  buttonBgColor = '#111',
  buttonTextColor = 'white'
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const navRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Se l'orientamento cambia, chiudiamo il menu per evitare glitch di layout
  useEffect(() => {
    if (isExpanded) {
      setIsExpanded(false);
      setIsHamburgerOpen(false);
      // Pulisci stili inline residui per il cambio layout
      if (navRef.current) {
        gsap.set(navRef.current, { clearProps: "width,height" });
        gsap.set(cardsRef.current, { clearProps: "x,y,opacity" });
      }
    }
  }, [orientation]);

  const calculateVerticalWidth = () => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    return isMobile ? window.innerWidth - 32 : 420; 
  };

  const calculateHorizontalHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    
    if (isMobile) {
      const contentEl = navEl.querySelector('.card-nav-content') as HTMLElement;
      if (contentEl) {
        const wasVisible = contentEl.style.visibility;
        const wasPosition = contentEl.style.position;
        contentEl.style.visibility = 'visible';
        contentEl.style.position = 'static';
        
        const contentHeight = contentEl.scrollHeight;
        
        contentEl.style.visibility = wasVisible;
        contentEl.style.position = wasPosition;
        return 60 + contentHeight + 16;
      }
    }
    return 260;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    gsap.set(navEl, { clearProps: "width,height" });
    gsap.set(cardsRef.current, { clearProps: "x,y,opacity" });

    const tl = gsap.timeline({ paused: true });

    if (orientation === 'vertical') {
      // SETUP VERTICALE (Squircle)
      gsap.set(navEl, { width: 60, height: 60, overflow: 'hidden' });
      gsap.set(cardsRef.current, { x: 50, y: 0, opacity: 0 });

      tl.to(navEl, { height: '100%', duration: 0.35, ease: 'power2.inOut' });
      tl.to(navEl, { width: calculateVerticalWidth, duration: 0.45, ease });
      tl.to(cardsRef.current, { x: 0, opacity: 1, duration: 0.35, ease, stagger: 0.08 }, '-=0.25');
      
    } else {
      // SETUP ORIZZONTALE (Dropdown Classico)
      gsap.set(navEl, { height: 60, width: '100%', overflow: 'hidden' });
      gsap.set(cardsRef.current, { x: 0, y: 50, opacity: 0 });

      tl.to(navEl, { height: calculateHorizontalHeight, duration: 0.4, ease });
      tl.to(cardsRef.current, { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 }, '-=0.1');
    }

    return tl;
  };

  useLayoutEffect(() => {
    if (isExpanded) return; 
    const tl = createTimeline();
    tlRef.current = tl;

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
  }, [ease, items, orientation]);

  // Gestione Resize per adattamenti responsive
  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;

      if (isExpanded) {
        tlRef.current.kill();
        if (orientation === 'vertical') {
          gsap.set(navRef.current, { width: calculateVerticalWidth(), height: '100%' });
        } else {
          gsap.set(navRef.current, { height: calculateHorizontalHeight(), width: '100%' });
        }
        
        const newTl = createTimeline();
        if (newTl) {
          newTl.progress(1);
          tlRef.current = newTl;
        }
      } else {
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          tlRef.current = newTl;
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isExpanded, orientation]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el;
  };

  return (
    <div className={`card-nav-container mode-${orientation} ${className}`}>
      <nav ref={navRef} className={`card-nav ${isExpanded ? 'open' : ''}`} style={{ backgroundColor: baseColor }}>
        
        <div className="card-nav-persistent">
          <div
            className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''}`}
            onClick={toggleMenu}
            role="button"
            aria-label={isExpanded ? 'Close menu' : 'Open menu'}
            tabIndex={0}
            style={{ color: menuColor || '#000' }}
          >
            <div className="hamburger-line" />
            <div className="hamburger-line" />
          </div>

          <div className="logo-container">
            <img src={logo} alt={logoAlt} className="logo" onError={(e) => { e.currentTarget.style.display='none' }} />
            {logoAlt === 'TextLogo' && <span className="fallback-text-logo">Brand</span>}
          </div>

          <button
            type="button"
            className="card-nav-cta-button"
            style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
          >
            Get Started
          </button>
        </div>

        <div className="card-nav-content" aria-hidden={!isExpanded}>
          {(items || []).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="nav-card"
              ref={setCardRef(idx)}
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <div className="nav-card-label">{item.label}</div>
              <div className="nav-card-links">
                {item.links?.map((lnk, i) => (
                  <NavLink key={`${lnk.label}-${i}`} className="nav-card-link" to={lnk.href} aria-label={lnk.ariaLabel} onClick={() => { if(isExpanded) toggleMenu() }}>
                    <ArrowUpRightIcon />
                    {lnk.label}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default NavCard;