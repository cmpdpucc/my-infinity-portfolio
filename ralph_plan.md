# 🚀 RALPH PLAN — BlurSlider Integration

> **Obiettivo:** Stravolgere la sezione Projects implementando il `BlurSlider` polimorfo con scroll orizzontale e scroll-lock verticale, integrato perfettamente nel design system (BEM/SCSS) e pronto a renderizzare i `PixelCard` attuali.
> **Supervisori:** `@orchestrator` e `@project-planner`

---

## Phase 1 — Foundation e Typescript
> **Agente Esecutore:** `@frontend-specialist` | Skills: `react-patterns`, `clean-code`
- [ ] Creare `src/components/BlurSlider/types.ts` con interfacce generiche `BlurSliderItem` e `BlurSliderProps<T>`.
  - **DoD**: Type generico supporta `renderItem?: (item: T, isActive: boolean) => React.ReactNode` e campi base necessari (id, imageURL).
- [ ] Riscrivere e ottimizzare l'architettura base SCSS in `src/components/BlurSlider/BlurSlider.scss`.
  - **DoD**: SCSS utilizza le variabili globali di tema (es. `--color-text`, `--color-bg`), usa convenzioni BEM strette e include il reset `pf-section` necessario. Nessun colore hardcoded.

## Phase 2 — Core Component Development & Scroll Hijack
> **Agente Esecutore:** `@frontend-specialist` | Skills: `react-patterns`, `ui-ux-pro-max`, `frontend-design`
- [x] Sviluppare `BlurSlider.tsx` utilizzando `swiper/react` e limitando ai moduli minimi essenziali (es. `Mousewheel`, `EffectCreative` se necessario).
  - **DoD**: Componente accetta items e usa `renderItem` per instanziare i children. Logica swiper attivata al mount.
- [x] Implementare "Scroll Locking & Handling".
  - **DoD**: Wrapper del componente occupa `100vh`, intercetta lo scroll verticale bloccandolo all'interno della section finche' non si raggiunge l'inizio o la fine dello slider (`mousewheel: { releaseOnEdges: true }`).
- [ ] Transizioni ed Effetti Visivi.
  - **DoD**: Scaling interattivo ed effetto blur di sfondo integrati tramite classi Swiper (es. `.swiper-slide-active`, `.swiper-slide-next`) per garantire che lo scale incida sulla container list e non causi clipping.

## Phase 3 — Projects Section Integration
> **Agente Esecutore:** `@frontend-specialist` | Skills: `react-patterns`, `architecture`
- [x] Rifattorizzare `src/sections/ProjectsSection.tsx`.
  - **DoD**: La Bento Grid corrente viene rimossa. Il `BlurSlider` viene importato e instanziato usando l'attuale array `PROJECTS`.
- [x] Iniettare `<PixelCard />` tramite polimorfismo.
  - **DoD**: La funzione `renderItem` per ogni elemento della lista istanzia un `<PixelCard image={item.image} title={item.title} description={item.description} />`.
  - **DoD**: Evitare collisioni visuali: l'ombra Blur di background di BlurSlider non interferisce o si sovrappone male con la Canvas idle di PixelCard. (PixelCard ha il Canvas in overlay).

## Phase 4 — Testing & Polish
> **Agente Esecutore:** `@test-engineer` | Skills: `webapp-testing`, `performance-profiling`, `mobile-design`
- [ ] Verifica Responsiveness.
  - **DoD**: Breakpoints corretti re-istruendo Swiper: `{ 320: { slidesPerView: 1.2 }, 768: { slidesPerView: 2.5 }, 1024: { slidesPerView: 4 } }`. Nessun overflow orizzontale su device da 375px.
- [ ] QA Visuale & Prestazioni.
  - **DoD**: Nessun jank ("scattosità") durante lo scroll orizzontale. Lo `z-index` del Canvas del PixelCard non oscura il contenuto dello slide successvio di BlurSlider.

---
> **Nota Operativa per OpenCode / Antigravity**: Questa planimetria e' ottimizzata per minimizzare la riscrittura del codice e fare leva sia sul lavoro Canvas della PixelCard gia' in essere, sia l'adattamento BEM preparato in precedenza da Gemini via Canvas. Segnare `[x]` solo al run in UI pulito.
