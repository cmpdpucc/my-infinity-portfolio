# 🧠 Brainstorm: PixelCard Idle Ripple Animation

## Context

La [PixelCard](file:///c:/Users/danyp/CODE/project-devs-team/portfolio/src/components/PixelCard.tsx#8-81) mostra un overlay a griglia pixel (CSS `radial-gradient`) quando l'utente **non** fa hover. Attualmente questo overlay è statico. L'obiettivo è aggiungere un'animazione "standby" che simuli un **ripple/epicentro** — come una goccia d'acqua che cade in uno stagno — dove i pixel si **accendono dal centro verso l'esterno** e poi si dissolvono.

### Vincoli Tecnici
| Vincolo | Dettaglio |
|---------|-----------|
| **Architettura attuale** | L'effetto pixel è un `<div>` con `radial-gradient` + `background-size: 10px`. NO canvas. |
| **Quando è visibile** | Solo in stato idle (`!isHovered`). All'hover sparisce con fade-out. |
| **Performance** | Deve essere leggero (**no canvas pesanti**, no reflow continuo). Target: 60fps su mobile. |
| **Estetica** | "Goccia in stagno", epicentro sismico — propagazione radiale dal centro. |

---

### Option A: CSS-Only Radial Mask Animation 🎭

Aggiungere un **secondo layer** sopra l'overlay pixel con una `radial-gradient` animata da `transform: scale()` e `opacity`. In pratica, una "maschera luminosa" circolare che parte piccola al centro, si espande radialmente, e dissolve rivelando brevemente i pixel sottostanti.

```
Layer stack:
  [3] Radial mask (animated scale + opacity)  ← NEW
  [3] Pixel grid overlay (statico)
  [2] Content (title, description)
  [1] Dark overlay
  [0] Background image
```

**Implementazione:** Un `<motion.div>` con `radial-gradient(circle, transparent 0%, var(--color-background) 60%)` che cicla `scale(0.1) → scale(2.5)` con `opacity: 0.8 → 0` ogni ~4 secondi. Quando il cerchio passa sopra i pixel, li "illumina" brevemente.

✅ **Pros:**
- **Zero JavaScript runtime** — tutta l'animazione in CSS/Framer `transition`
- **Leggerissimo** — un singolo `div` con `transform` (GPU-accelerated)
- **Facile da tweakare** — basta cambiare duration, scale, colore

❌ **Cons:**
- Non muove i pixel *singolarmente* — è un effetto "maschera" sovrapposta
- L'effetto è **soft/astratto**, meno "pixel-by-pixel" di quello desiderato
- I pixel non si "accendono" individualmente

📊 **Effort:** Low (~30 min)

---

### Option B: Animated Background-Position Ripple 🌊

Manipolare il `background-position` e il `background-size` dell'overlay pixel esistente in modo ciclico, creando un effetto "onda" che parte dal centro. Si aggiunge un **secondo background layer** alla stessa div, con un gradiente radiale animato che altera lo *stato dei punti* della griglia.

**Implementazione:** Combinare due background sovrapposti nella stessa div:
1. Il pattern a punti (già esistente)
2. Un `radial-gradient(circle at center, rgba(accent, 0.3) 0%, transparent 40%)` che si anima via `background-size` da `0px 0px` a `600px 600px` con ease-out

Il cerchio luminoso espandendosi "evidenzia" i pixel che attraversa.

✅ **Pros:**
- **Un solo elemento DOM** — nessun div extra
- Effetto visivo organico e smooth
- Buona performance (solo `background-size` animato, no layout/paint)

❌ **Cons:**
- Simile alla Option A nel risultato visivo — i pixel **non** cambiano individualmente
- Limitato nella personalizzazione delle singole "celle" pixel

📊 **Effort:** Low (~45 min)

---

### Option C: Canvas 2D Pixel Grid con Ripple Shader ⚡

Sostituire l'overlay `radial-gradient` con un vero `<canvas>` disegnato in 2D che renderizza una griglia di "pixel dots". Un loop `requestAnimationFrame` calcola la distanza di ogni cella dal centro e la confronta con un raggio `rippleRadius` che cresce nel tempo. Le celle dentro il fronte d'onda si **accendono** (cambiano colore/opacità) e poi si **spengono** man mano che l'onda le supera.

```
Per ogni frame:
  rippleRadius += speed
  for each cell (x, y):
    dist = √((x - cx)² + (y - cy)²)
    if |dist - rippleRadius| < thickness:
      cell.opacity = 1.0  // "accesa"
    else:
      cell.opacity = base  // "spenta"
```

✅ **Pros:**
- **Effetto pixel-perfect** — ogni cella si accende e spegne individualmente 🎯
- **Massimo controllo** — velocità, spessore dell'onda, colore, decay
- L'effetto più fedele alla metafora "goccia nello stagno / epicentro sismico"
- Possibilità di multi-ripple (più onde concentriche sovrapposte)

❌ **Cons:**
- **Più pesante** — canvas + rAF loop continuo (ma ottimizzabile con throttle a 30fps o pausa quando off-screen)
- Complessità di codice maggiore
- Richiede cleanup attento del canvas (unmount, resize)

📊 **Effort:** Medium (~2-3h)

---

### Option D: CSS Grid di `<div>` con Staggered Framer Motion 🧊

Generare una griglia reale di piccoli `<div>` (es. 20×12 = 240 elementi) e usare Framer Motion `stagger` con delay basato sulla distanza dal centro. Ogni div ha `opacity: 0 → 1 → 0` con un delay proporzionale alla sua distanza Euclidea dal punto centrale.

```tsx
const delay = Math.sqrt((x - cx)² + (y - cy)²) * 0.02; // 20ms per unità
<motion.div animate={{ opacity: [0.1, 0.8, 0.1] }} transition={{ delay, repeat: Infinity }} />
```

✅ **Pros:**
- **Vero effetto pixel-by-pixel** con animazione individuale di ogni cella
- Framer Motion gestisce automaticamente mount/unmount e `AnimatePresence`
- Nessun canvas — puro React, facile da debuggare
- Visivamente **spettacolare** e preciso

❌ **Cons:**
- **240+ DOM nodes** per card × N cards nella pagina = potenziale DOM bloat
- Framer Motion con 240 animazioni concorrenti può essere pesante su mobile
- Richiede attenzione ai **reflow** se non gestito con `will-change` / `transform`

📊 **Effort:** Medium (~2h)

---

## 💡 Raccomandazione

**Option C (Canvas 2D)** è la scelta migliore per il rapporto effetto/performance:

| Criterio | A (CSS Mask) | B (BG-Position) | C (Canvas) | D (Framer Grid) |
|----------|:---:|:---:|:---:|:---:|
| Effetto pixel singolo | ❌ | ❌ | ✅ | ✅ |
| Performance mobile | ✅✅ | ✅✅ | ✅ | ⚠️ |
| Fedeltà al concept | ⚠️ | ⚠️ | ✅✅ | ✅ |
| Complessità codice | ✅✅ | ✅✅ | ⚠️ | ✅ |
| DOM overhead | ✅ | ✅ | ✅ | ❌ |

L'Option C dà l'effetto **esatto** della goccia d'acqua con i pixel che si accendono uno a uno. Possiamo ottimizzarla con:
- `IntersectionObserver` per fermare il loop quando la card è fuori viewport
- Throttle a **24fps** (sufficiente per un effetto pulsante)
- Singolo `requestAnimationFrame` condiviso se ci sono multiple cards

L'Option D è il backup se vuoi evitare canvas — è più "React-native" ma ha il rischio DOM bloat.

> **Quale opzione preferisci? Posso anche combinare elementi di più opzioni (es. Canvas base + multi-ripple concentriche).**
