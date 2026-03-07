# 🕵️‍♂️ AUDIT REPORT: BlurSlider Integration
**Target**: `src/sections/ProjectsSection.tsx` => `BlurSlider.tsx`

Questo audit copre le considerazioni di architettura, BEM/SAAS e integrazione in preparazione per la creazione e implementazione del `BlurSlider` nel Portfolio. Seguendo il framework decisionale `@ui-ux-pro-max`.

---

### 1. CSS & Layout Architecture (BEM & SCSS)
- **Current Layout**: La `ProjectsSection.tsx` attualmente usa classi `.pf-section-content` e `.pf-section-content--scrollable` posizionati flessibilmente.
- **Scroll Hijack Requirement**: Il `BlurSlider` richiede un lock della pagina sul suo contenitore (in modo da rendere la navigazione orizzontale la primaria mentre il cursore è fermo in quella sezione).
- **Integrazione Raccomandata**:
  - Dobbiamo avvolgere il nuovo slider in un container con `height: 100vh` e, se pertinente, `position: sticky; top: 0;`.
  - Lo Swiper dovrà essere configurato con `mousewheel: { releaseOnEdges: true }`, così quando l'utente prova a scorrere in basso, inizierà a scorrere lo swiper lateralmente fino in fondo, e poi rilascerà la navigazione in basso.

### 2. Polymorphism, Typescript & Integration with PixelCard
- **Current Data Structure**: L'array locale `PROJECTS` (in ProjectsSection) passa dati base ad ogni `PixelCard`.
- **BlurSlider Requirement**: Il BlurSlider deve essere agnostico. Non deve conoscere i `title`, `description` e logiche UI interne.
- **Integrazione Raccomandata**:
  - Implementeremo i `generics` su TypeScript in `BlurSliderProps<T>`.
  - Ci sarà una prop `renderItem: (item: T) => React.ReactNode` in modo che il parent (`ProjectsSection`) possa restituire la `PixelCard`.
  - Attenzione alle "immagini di background sfocate": Il mockup di BlurSlider creava un'ombra/alone sfocato duplicando l'immagine (blur 50px su img). Se noi iniettiamo `PixelCard`—che è già una card complessa contenente Canvas—dovremo valutare se estrapolare `item.image` per il background sfocato dietro, e `renderItem()` per il foreground, in modo da preservare quell'epic-look mostrato nello screen.

### 3. @ui-ux-pro-max Style Adjustments & Stacks
- **Colours and Theming**: I colori hardcoded presentati nel canvas originale (`#f5f7fa`, `#111`, etc) verranno de-hardcodati e referenzieranno i token custom del portfolio (`--color-bg`, `--color-text`, `--color-text-muted`).
- **Icons & Semantics**: SVG o le interazioni animate devono essere gestite passando per i token d'interazione (es `transition: background-color 300ms ease;`).
- **Typography**: Disabilitare o omettere l'importazione di font esterni (`Roboto Condensed`) se il portfolio usa già un suo font di base per uniformità stilistica.

### 4. Code Splitting & Performance Considerations
- **Swiper Weight**: `swiper/react` e le dipendenze relative al `mousewheel` possono incrementare il first load JS payload.
- **Integrazione**: Assicurarsi di importare solo i moduli necessari (`import { Navigation, Pagination, Mousewheel } from 'swiper/modules'`).
- **Canvas Interference**: `PixelCard` contiene `<PixelCanvasRipple />`. Avere più istanze Swiper che muovono div con canvas al loro interno può essere gravoso a livello GPU. Si consiglia l'uso di `will-change: transform` limitatamente ai container in scala dello swiper, o l'attivazione del rendering solo per i `slide-active` e `slide-next`.

---
**Risultato Audit**: Semaforo Verde. Il `ralph_plan.md` orchestrerà lo sviluppo step-by-step per implementare queste restrizioni con successo.
