
# 🚀 RALPH PLAN — INFINITY PORTFOLIO: Multi-Page Restructuring

> **Nome in codice:** INFINITY PORTFOLIO v2
> **Core Objective:** Trasformare il portfolio single-page scroll in un'app multi-page con react-router-dom, Home page immersiva con FloatingLines, navigazione premium e transizioni Apple-style.
> **Ultimo Aggiornamento:** 2026-03-10 18:40 JST
> **Questo file traccia l'avanzamento. Segna i task come completati `[x]` quando la DoD è soddisfatta.**

---

## LEGACY — Fasi Completate (BlurSlider Integration)

<details>
<summary>✅ Click per espandere le fasi legacy già completate</summary>

### Phase 1 — Foundation e Typescript (BlurSlider)
- [x] `BlurSlider/types.ts` — interfacce generiche.
- [x] `BlurSlider.scss` — architettura SCSS BEM.

### Phase 2 — Core Component Development & Scroll Hijack
- [x] `BlurSlider.tsx` con `swiper/react`.
- [x] Scroll Locking & Handling (`releaseOnEdges`).
- [x] Transizioni ed Effetti Visivi (scaling, blur background).

### Phase 3 — Projects Section Integration
- [x] Rifattorizzato `ProjectsSection.tsx` con BlurSlider.
- [x] `PixelCard` iniettato tramite polimorfismo.

### Phase 4 — Testing & Polish
- [x] Responsiveness multi-breakpoint.
- [x] QA Visuale & Prestazioni.

</details>

---

# 🌌 INFINITY PORTFOLIO v2 — PIANO DI RISTRUTTURAZIONE

> Ogni Fase ha un **Agente Supervisore** e ogni subtask ha il proprio **Agente Esecutore** con le skill specifiche.

> **🛡️ PROTOCOLLO GIT:**
>
> | Branch | Scopo |
> |--------|-------|
> | `main` | Produzione stabile |
> | `feat/multipage-restructure` | Branch di lavoro per tutta la ristrutturazione |
>
> **Regole:**
> 1. **Branch da `main`:** `git checkout main && git checkout -b feat/multipage-restructure`.
> 2. **Commit Atomici:** Conventional Commits (`feat:`, `fix:`, `refactor:`, `chore:`).
> 3. **📝 COMMIT CHECKPOINT:** Ogni task `[x]` → commit immediato con DoD nel body.
> 4. **Merge → main:** Solo dopo Phase 7 (QA completa) + approvazione utente.
>
> **Agente Responsabile:** `@devops-engineer`

---

## Phase 0 — Pre-Flight & Dependency Setup
> **🎯 Supervisore:** `@devops-engineer` (skills: `deployment-procedures`, `server-management`)
> **Obiettivo:** Preparare l'ambiente, installare dipendenze, creare branch di lavoro.

### 0.1. Git Branch & Environment
- [x] Creare branch `feat/multipage-restructure` da `main`.
  - **Agente:** `@devops-engineer` | Skills: `deployment-procedures`
  - DoD: Branch creato, working tree pulita, `git status` verde.

### 0.2. Install react-router-dom
- [x] `npm install react-router-dom@^6` nel progetto portfolio.
  - **Agente:** `@devops-engineer` | Skills: `deployment-procedures`
  - DoD: `react-router-dom@6.30.3` in `package.json` dependencies, `npm ls react-router-dom` OK. ✅

### 0.3. Verify Build Baseline
- [x] `npm run build` passa senza errori PRIMA di qualsiasi modifica.
  - **Agente:** `@devops-engineer` | Skills: `deployment-procedures`
  - DoD: Build exit code 0, TypeScript compiled in 12.9s, static pages generated. ✅

---

## Phase 1 — Folder Structure & Routing Core
> **🎯 Supervisore:** `@project-planner` (skills: `architecture`, `plan-writing`)
> **Obiettivo:** Creare la struttura cartelle per le route e il core `AppRouter.tsx`.

### 1.1. Create Route Component Directories
- [x] Creare `src/components/routes/` directory.
  - **Agente:** `@frontend-specialist` | Skills: `react-patterns`, `clean-code`
  - DoD: Directory creata con 4 page components (HomePage, AboutPage, ExperiencePage, ProjectsPage). ✅

### 1.2. Create Layout Component Directory
- [x] Creare `src/components/layout/` directory.
  - **Agente:** `@frontend-specialist` | Skills: `react-patterns`, `clean-code`
  - DoD: Directory creata con `PortfolioLayout.tsx`. ✅

### 1.3. Create Catch-All Route for Direct URL Access
- [x] Gestione URL diretti tramite `next.config.ts` rewrites (catch-all `[[...slug]]` causava conflitto con root page.tsx).
  - **Agente:** `@frontend-specialist` | Skills: `react-patterns`, `architecture`
  - DoD: Rewrites per `/about`, `/experience`, `/projects` → `/` in `next.config.ts`. ✅
  - Nota: Approccio cambiato da catch-all a rewrites per compatibilità Next.js 16.

### 1.4. Build `AppRouter.tsx`
- [x] Creare `src/components/AppRouter.tsx` con `BrowserRouter` + `Routes` + `React.lazy()`.
  - **Agente:** `@frontend-specialist` | Skills: `react-patterns`, `architecture`, `clean-code`
  - DoD: Routes: `/` → HomePage, `/about` → AboutPage, `/experience` → ExperiencePage, `/projects` → ProjectsPage. ✅
  - DoD: Nested route con `PortfolioLayout` per le 3 portfolio pages. ✅
  - DoD: `React.lazy()` su tutti i 5 route components. `<Suspense>` con dark-themed fallback. ✅
  - DoD: Build exit code 0, zero TypeScript errors. ✅

### 1.5. Modify Root `app/page.tsx`
- [x] Trasformare `page.tsx` da single-page scroll a entry point per `AppRouter`.
  - **Agente:** `@frontend-specialist` | Skills: `react-patterns`, `clean-code`
  - DoD: `"use client"` + `dynamic(() => import("@/components/AppRouter"), { ssr: false })`. ✅
  - DoD: Tutto il contenuto precedente rimosso. ✅

### 1.6. Simplify Root `app/layout.tsx`
- [x] Ridurre `layout.tsx` al minimo: solo fonts + SCSS import + `{children}`.
  - **Agente:** `@frontend-specialist` | Skills: `react-patterns`, `clean-code`
  - DoD: Solo fonts (DM Sans + Space Grotesk) + `main.scss` import + `{children}`. Zero UI components. ✅

---

## Phase 2 — Home Page (Landing con FloatingLines)
> **🎯 Supervisore:** `@orchestrator` (skills: `parallel-agents`, `behavioral-modes`)
> **Obiettivo:** Creare la Home page immersiva con FloatingLines background, hero overlay e bento skill showcase.

### 2.1. Build `HomePage.tsx` — Hero Section
- [x] Creare `src/components/routes/HomePage.tsx` con hero full-viewport.
  - **Agente:** `@frontend-specialist` | Skills: `react-patterns`, `frontend-design`, `ui-ux-pro-max`
  - DoD: `FloatingLines` come background full-viewport (z-0).
  - DoD: Content overlay (z-10): status pill ("Available for new projects"), hero title (grande, typography di impatto), subtitle.
  - DoD: **CTA 1**: "View Projects" → naviga a `/projects` (usa `react-router-dom` `Link`).
  - DoD: **CTA 2**: "Contact Me" → azione di contatto (mailto o modal, TBD).
  - DoD: FadeIn animations con stagger delay (ispirato da `inspirationLandingPage.tsx`).
  - DoD: Responsivo: `clamp()` per font-size, layout flex che si adatta a mobile.

### 2.2. Build `HomePage.tsx` — Bento Skill Showcase Section
- [x] Aggiungere sezione bento grid sotto l'hero (scrollabile).
  - **Agente:** `@frontend-specialist` | Skills: `react-patterns`, `frontend-design`, `ui-ux-pro-max`
  - DoD: Grid bento con card skill (ispirato dalla sezione "expertise" di `inspirationLandingPage.tsx`).
  - DoD: Card con icone Lucide (NO emoji), titolo, descrizione, tags.
  - DoD: FadeIn/scroll-reveal per ogni card con stagger.
  - DoD: Layout responsivo: 1 colonna mobile, 3 colonne desktop.

### 2.3. Home Page SCSS
- [x] Creare `src/styles/components/_home.scss` con tutti gli stili della landing page.
  - **Agente:** `@frontend-specialist` | Skills: `frontend-design`, `clean-code`
  - DoD: `.pf-home` full viewport container.
  - DoD: `.pf-home__hero` — overlay posizionamento centrato.
  - DoD: `.pf-home__title` — typography responsiva con `clamp()`.
  - DoD: `.pf-home__cta-group` — button row con hover glow e transizioni.
  - DoD: `.pf-home__bento` — grid per skill showcase.
  - DoD: Usa variabili CSS da `_colors.scss` e `_tokens.scss`, zero colori hardcoded.
  - DoD: Import aggiunto in `main.scss`.

---

## Phase 3 — Portfolio Layout & Sidebar Controller
> **🎯 Supervisore:** `@frontend-specialist` (skills: `react-patterns`, `frontend-design`)
> **Obiettivo:** Creare il layout condiviso per le pagine portfolio (About, Experience, Projects) con sidebar persistente.

### 3.1. Build `PortfolioLayout.tsx`
- [x] Creare `src/components/layout/PortfolioLayout.tsx` — layout con sidebar + `<Outlet />`.
  - **Agente:** `@frontend-specialist` | Skills: `react-patterns`, `architecture`
  - DoD: Desktop: sidebar (ProfileCard + RouteNav) + main area con `<Outlet />`.
  - DoD: Mobile: MobileIdentityBar + `<Outlet />` + MobileNav (bottom).
  - DoD: Sidebar FUORI da qualsiasi transition wrapper → persiste tra route changes.
  - DoD: CSS grid: `var(--sidebar-width) 1fr` (riusa `_grid.scss` esistente).

### 3.2. Build `SidebarController.tsx`
- [x] Creare `src/components/layout/SidebarController.tsx` — sidebar con visibilità scroll/route-aware.
  - **Agente:** `@frontend-specialist` | Skills: `react-patterns`, `frontend-design`
  - DoD: Su Home (`/`): sidebar nascosta nell'hero, appare con scroll (opacity + translateX `useTransform`).
  - DoD: Trigger di apparizione: quando utente scrolla al ~60% del primo viewport (sezione bento).
  - DoD: Su portfolio pages (`/about`, `/experience`, `/projects`): sidebar sempre visibile.
  - DoD: `position: fixed` — nessun layout reflow (CLS = 0).
  - DoD: Animazione fluida: `opacity 0→1`, `translateX -100→0`, durata ~400ms.

### 3.3. Adapt `_grid.scss` for Route-Based Layout
- [x] Modificare `src/styles/layout/_grid.scss` per supportare il nuovo layout.
  - **Agente:** `@frontend-specialist` | Skills: `frontend-design`, `clean-code`
  - DoD: Rimuovere `.pf-scroll-container` e `.pf-scroll-section` (non più necessari).
  - DoD: Aggiungere `.pf-portfolio-layout` per il grid sidebar + content.
  - DoD: Mantenere stili sidebar desktop esistenti.
  - DoD: Adattare mobile styles per il layout route-based.
  - DoD: Nessun breaking change su classi ancora usate dai componenti attivi.

---

## Phase 4 — Navigation Components
> **🎯 Supervisore:** `@frontend-specialist` (skills: `react-patterns`, `ui-ux-pro-max`)
> **Obiettivo:** Costruire la top nav bar globale e convertire le nav esistenti a route-based.

### 4.1. Build `NavigationBar.tsx`
- [x] Creare `src/components/layout/NavigationBar.tsx` — top nav bar frosted glass.
  - **Agente:** `@frontend-specialist` | Skills: `react-patterns`, `frontend-design`, `ui-ux-pro-max`
  - DoD: Presente su TUTTE le pagine (Home inclusc).
  - DoD: Su Home: inizia trasparente, frosted glass on scroll (`backdrop-blur: 20px`).
  - DoD: Su portfolio pages: sempre frosted glass.
  - DoD: Links: Home, About, Experience, Projects (usa `NavLink` da react-router-dom).
  - DoD: Active state tramite `NavLink` `isActive` prop.
  - DoD: Mobile: logo solo, navigazione delegata a MobileNav bottom.
  - DoD: Transizione opacità smooth (300ms ease).

### 4.2. Convert `SectionNav.tsx` → Route-Based
- [x] Modificare `src/components/SectionNav.tsx` per usare `react-router-dom` `Link` invece di `smoothScrollTo`.
  - **Agente:** `@frontend-specialist` | Skills: `react-patterns`, `clean-code`
  - DoD: `smoothScrollTo()` rimosso, sostituito con `<Link to="/about">`.
  - DoD: Active state via `useLocation().pathname` al posto di `useScrollSpy`.
  - DoD: Animated indicator (`pf-section-nav__indicator`) mantenuto.
  - DoD: JSDoc aggiornato.

### 4.3. Convert `MobileNav.tsx` → Route-Based
- [x] Modificare `src/components/MobileNav.tsx` per routing + aggiungere Home.
  - **Agente:** `@frontend-specialist` | Skills: `react-patterns`, `mobile-design`, `clean-code`
  - DoD: `smoothScrollTo()` rimosso, sostituito con `<Link>` da react-router-dom.
  - DoD: Aggiunto item "Home" (🏠 icona `Home` da Lucide) come primo elemento.
  - DoD: Active state via `useLocation().pathname`.
  - DoD: Spring-animated `layoutId` indicator mantenuto.
  - DoD: Nascosto su Home (`/`), visibile su `/about`, `/experience`, `/projects`.
  - DoD: JSDoc aggiornato.

### 4.4. Navigation SCSS
- [x] Creare `src/styles/components/_navigation.scss`.
  - **Agente:** `@frontend-specialist` | Skills: `frontend-design`, `clean-code`
  - DoD: `.pf-nav-bar` — frosted glass top bar, posizionamento fixed.
  - DoD: `.pf-nav-bar--transparent` modifier per stato hero Home.
  - DoD: `.pf-nav-bar__link--active` — indicatore attivo con underline animata.
  - DoD: `.pf-sidebar-controller` — sidebar con transform-driven visibility.
  - DoD: Responsive breakpoints coerenti con il resto del sistema (`64em`).
  - DoD: Usa variabili CSS da `_colors.scss`, zero hardcoded.
  - DoD: Import aggiunto in `main.scss`.

### 4.5. IdentityBar & Layout Refactoring
- [x] Rinominare `MobileIdentityBar.tsx` in `IdentityBar.tsx` e aggiungere logica Dropdown per Desktop (click-outside) e Fullscreen Modal per Mobile.
- [x] Integrare `IdentityBar` all'interno di `NavigationBar` al posto del logo di testo.
- [x] Rimuovere `MobileIdentityBar` e `SidebarController` da `PortfolioLayout.tsx` e fixare il grid layout spegnendo il padding per la sidebar.
- [x] Eliminare i file obsoleti: `SidebarController.tsx` e `SectionNav.tsx`.
- [x] Rinominare e aggiornare `_mobile-identity.scss` in `_identity.scss` applicando i break point per Desktop (absolute dropdown) e Mobile (fixed fullscreen).

### 4.6. NavCard Integration & IdentityBar Polish
- [x] **Task 4.6.1: IdentityBar Content & Layout Left-Align**
  - **Agente:** `@frontend-specialist` | Skills: `react-patterns`, `frontend-design`
  - DoD: Sostituire "DanyP" con "Daniele Puccio" in `NavigationBar.tsx`/`IdentityBar.tsx`. 
  - DoD: In `_navigation.scss` impostare il container con `justify-content: space-between` e rimuovere fix centrati che sposterebbero l'IdentityBar su mobile.
- [x] **Task 4.6.2: DecryptedText Re-animation on Close**
  - **Agente:** `@frontend-specialist` | Skills: `react-patterns`
  - DoD: In `IdentityBar.tsx`, aggiungere uno state `animationKey` (numero).
  - DoD: Incrementare questo `key` ogni volta che `isExpanded` passa da `true` a `false`.
  - DoD: Passare il `key` al componente `<DecryptedText>` per forzarne il remount/ri-animazione.
- [x] **Task 4.6.3: ProfileCard Emerge Animation**
  - **Agente:** `@frontend-specialist` | Skills: `ui-ux-pro-max`, `react-patterns`
  - DoD: Modificare le prop di `framer-motion` in `IdentityBar.tsx` (`pf-identity__card-container`).
  - DoD: Aggiungere `style={{ transformOrigin: "top left" }}` o logica simile per fargli scalare/emergere fluidamente dallo stesso punto del trigger.
- [x] **Task 4.6.4: Integrazione NavCard in NavigationBar**
  - **Agente:** `@frontend-specialist` | Skills: `react-patterns`, `frontend-design`
  - DoD: Rimuovere i vecchi `NavLink` testuali da `NavigationBar.tsx`.
  - DoD: Costruire l'oggetto `items` per `<NavCard>` usando i dati di `SectionNav.tsx`/`PORTFOLIO_ROUTES`.
  - DoD: Aggiungere un hook (es. `window.matchMedia`) in `NavigationBar.tsx` per passare `orientation="horizontal"` su Desktop e `"vertical"` su Mobile.
- [x] **Task 4.6.5: NavCard CSS Refinement**
  - **Agente:** `@frontend-specialist` | Skills: `frontend-design`, `clean-code`
  - DoD: Nascondere il logo ridondante in `<NavCard>` (perché abbiamo l'IdentityBar come brand).
  - DoD: Rimuovere o sistemare i `position: fixed` in `_nav-card.scss` affinché conviva armoniosamente (padding, z-index) con la logica della top bar frosted.
- [x] **Task 4.6.6: File Cleanup & Layout Adjustments**
  - **Agente:** `@frontend-specialist` | Skills: `clean-code`
  - DoD: In `PortfolioLayout.tsx`, commentare temporaneamente `<MobileNav />`.
  - DoD: Spostare `SectionNav.tsx` in `to-be-deleted/`.

---

### 4.7. Unified NavigationCardBar & GooeyNav Integration (NEW)
- [x] **Task 4.7.1: Struttura NavigationCardBar & Pulizia**
  - **Agente:** `@frontend-specialist` | Skills: `react-patterns`, `clean-code`
  - DoD: Creare `NavigationCardBar.tsx` fondendo i concetti di `NavigationBar` e `NavCard`. Questa sarà la top bar unica.
  - DoD: Posizionare `IdentityBar` a sinistra, `GooeyNav` al centro, e il bottone Hamburger a destra (rimuovendo il CTA "Get Started").
- [x] **Task 4.7.2: Refactoring GooeyNav Center**
  - **Agente:** `@frontend-specialist` | Skills: `ui-ux-pro-max`, `react-patterns`
  - DoD: Modificare `GooeyNav.tsx` per rimuovere bordi superflui o layout forzati; deve essere solo un componente di link.
  - DoD: integrare il css di `_gooey-nav.scss` per rimuovere tutti gli stili superflui e convertirli in BEM scss.
  - DoD: Passare in pasto a `GooeyNav` i `PORTFOLIO_ROUTES` in modo che renderizzi Home, About, Experience, Projects come link cliccabili a centro pagina.
- [x] **Task 4.7.3: Logica di Espansione Hover/Click**
  - **Agente:** `@frontend-specialist` | Skills: `react-patterns`
  - DoD: Implementare espansione del menù al click sull'Hamburger.
  - DoD: Implementare espansione del menù all'hover sull'Hamburger.
  - DoD: Implementare un timeout: se l'utente fa hover *su qualsiasi* parte della `NavigationCardBar` per almeno 3 secondi, il menù si srotola/espande.
- [x] **Task 4.7.4: Contenuto Interno Espanso (Fake Links)**
  - **Agente:** `@frontend-specialist` | Skills: `react-patterns`
  - DoD: Quando la barra è espansa, mostrare le sezioni delle routes ("Home", "Projects") contenenti dei finti sotto-link (es. "Progetto A", "Progetto B") in attesa dei link definitivi.
- [x] **Task 4.7.5: CSS Styling & Layout Swap**
  - **Agente:** `@frontend-specialist` | Skills: `frontend-design`, `clean-code`
  - DoD: Creare `_navigation-card-bar.scss` unendo l'estetica frosted glass a quella animata. Supporto responsive (Desktop orizzontale vs Mobile verticale).
  - DoD: Sostituire `<NavigationBar>` con `<NavigationCardBar>` in `PortfolioLayout.tsx`. Eliminare quindi `NavigationBar.tsx`, `NavCard.tsx` e file CSS spuri.

---

## Phase 5 — Route Page Wrappers & Section Cleanup
> **🎯 Supervisore:** `@frontend-specialist` (skills: `react-patterns`, `clean-code`)
> **Obiettivo:** Creare i wrapper per ogni route e pulire le sezioni dal vecchio scroll-based code.

### 5.1. Create `AboutPage.tsx`
- [ ] Creare `src/components/routes/AboutPage.tsx`.
  - **Agente:** `@frontend-specialist` | Skills: `react-patterns`
  - DoD: Importa e renderizza `<AboutSection />`.
  - DoD: Wrappa con `PageTransition` (se Option A/C) o div semplice (se Option B).

### 5.2. Create `ExperiencePage.tsx`
- [ ] Creare `src/components/routes/ExperiencePage.tsx`.
  - **Agente:** `@frontend-specialist` | Skills: `react-patterns`
  - DoD: Importa e renderizza `<ExperienceSection />`.
  - DoD: Stessi criteri di 5.1.

### 5.3. Create `ProjectsPage.tsx`
- [ ] Creare `src/components/routes/ProjectsPage.tsx`.
  - **Agente:** `@frontend-specialist` | Skills: `react-patterns`
  - DoD: Importa e renderizza `<ProjectsSection />`.
  - DoD: BlurSlider funziona correttamente nella route dedicata.

### 5.4. Clean `AboutSection.tsx`
- [ ] Rimuovere il bottone "Scroll to explore" da `AboutSection.tsx` (righe 57-97).
  - **Agente:** `@frontend-specialist` | Skills: `react-patterns`, `clean-code`
  - DoD: Bottone rimosso.
  - DoD: Nessun import orfano (rimuovere `ArrowDown` se non usato altrove).
  - DoD: Il resto del componente funziona identicamente.

### 5.5. Deprecate Single-Page Hooks
- [ ] Marcare come deprecated `useDiscreteScroll.ts` e `useScrollSpy.ts`.
  - **Agente:** `@frontend-specialist` | Skills: `clean-code`
  - DoD: Aggiungere commento `@deprecated` JSDoc in cima a ciascun hook.
  - DoD: Rimuovere tutti gli import di questi hook da `page.tsx` (già modificato in Phase 1.5).
  - DoD: NON cancellare i file — solo deprecare (potenziale uso futuro).

---

## Phase 6 — Page Transitions (VTA Hybrid + framer-motion)
> **🎯 Supervisore:** `@frontend-specialist` (skills: `react-patterns`, `ui-ux-pro-max`, `frontend-design`)
> **Obiettivo:** Implementare transizioni Apple-style tra le pagine.

### 6.1. Implement View Transitions API Integration
- [ ] Aggiungere `viewTransition` prop ai `<Link>` e `<NavLink>` di react-router-dom.
  - **Agente:** `@frontend-specialist` | Skills: `react-patterns`, `frontend-design`
  - DoD: Tutti i link di navigazione usano `viewTransition={true}`.
  - DoD: Navigazione programmatica (`useNavigate`) usa `{ viewTransition: true }`.

### 6.2. Create View Transitions CSS
- [ ] Creare `src/styles/components/_view-transitions.scss` con keyframes Apple-style.
  - **Agente:** `@frontend-specialist` | Skills: `frontend-design`, `ui-ux-pro-max`
  - DoD: `::view-transition-old(root)` → slide-fade-out (300ms, ease-in).
  - DoD: `::view-transition-new(root)` → slide-fade-in (500ms, cubic-bezier `[0.22, 1, 0.36, 1]`).
  - DoD: Blur effect: `filter: blur(4px)` in/out.
  - DoD: `@media (prefers-reduced-motion: reduce)` → durata azzerata.
  - DoD: Import aggiunto in `main.scss`.

### 6.3. Create `PageTransition.tsx` (framer-motion micro-animations)
- [ ] Creare `src/components/PageTransition.tsx` per animazioni intra-page.
  - **Agente:** `@frontend-specialist` | Skills: `react-patterns`, `frontend-design`
  - DoD: Wrapper `motion.div` con `initial/animate` variants (NO exit — VTA gestisce il page-level).
  - DoD: `staggerChildren: 0.08` per animazione sequenziale dei figli.
  - DoD: Cubic bezier Apple: `[0.22, 1, 0.36, 1]`.
  - DoD: Children animati: content slides up + de-blur.

### 6.4. Scroll Restoration
- [ ] Implementare scroll restoration su route change.
  - **Agente:** `@frontend-specialist` | Skills: `react-patterns`
  - DoD: Usare `<ScrollRestoration />` di react-router-dom OPPURE `useEffect` con `window.scrollTo(0, 0)` su pathname change.
  - DoD: Ogni pagina inizia dal top.
  - DoD: Browser back/forward gestisce lo scroll correttamente.

---

## Phase 7 — SCSS Integration & Cleanup
> **🎯 Supervisore:** `@frontend-specialist` (skills: `frontend-design`, `clean-code`)
> **Obiettivo:** Integrare tutti i nuovi SCSS, pulire i vecchi stili, garantire coerenza.

### 7.1. Update `main.scss`
- [ ] Aggiungere import per tutti i nuovi partial SCSS.
  - **Agente:** `@frontend-specialist` | Skills: `clean-code`
  - DoD: `@use 'components/navigation'`, `@use 'components/home'`, `@use 'components/view-transitions'` aggiunti.
  - DoD: Nessun import orfano o duplicato.

### 7.2. Final Grid Cleanup
- [ ] Rimuovere stili dead code da `_grid.scss` e `_page.scss`.
  - **Agente:** `@frontend-specialist` | Skills: `clean-code`
  - DoD: Classi `pf-scroll-container`, `pf-scroll-section` rimosse se non più referenziate.
  - DoD: `pf-section-content` adattato per il nuovo layout route-based.
  - DoD: Verificare con `grep -r` che nessun componente attivo usa le classi rimosse.

### 7.3. MobileIdentityBar Visibility Update
- [ ] Aggiornare `MobileIdentityBar` per nascondersi su Home (`/`).
  - **Agente:** `@frontend-specialist` | Skills: `react-patterns`
  - DoD: Componente legge `useLocation().pathname` e ritorna `null` su `/`.
  - DoD: Visibile su `/about`, `/experience`, `/projects`.

---

## Phase 8 — Testing, QA & Verification
> **🎯 Supervisore:** `@test-engineer` (skills: `testing-patterns`, `webapp-testing`)
> **Obiettivo:** Verificare TUTTO: build, routing, transizioni, responsive, performance.

### 8.1. Build Verification
- [ ] `npm run build` passa senza errori.
  - **Agente:** `@test-engineer` | Skills: `testing-patterns`
  - DoD: Exit code 0, zero TypeScript errors, zero linting errors.

### 8.2. Route Navigation Testing
- [ ] Verificare tutte le route nel browser.
  - **Agente:** `@qa-automation-engineer` | Skills: `webapp-testing`
  - DoD: `/` → Home con FloatingLines + hero.
  - DoD: `/about` → About section con sidebar visibile.
  - DoD: `/experience` → Timeline con NodeSpark + AnimatedTerminal.
  - DoD: `/projects` → BlurSlider con project cards.
  - DoD: Direct URL access (digitare `/experience` nella barra) → funziona.
  - DoD: Browser back/forward → transizioni corrette.

### 8.3. Page Transitions QA
- [ ] Verificare transizioni tra tutte le route.
  - **Agente:** `@qa-automation-engineer` | Skills: `webapp-testing`
  - DoD: VTA crossfade fluida tra Home → About → Experience → Projects.
  - DoD: No flicker, no double animation, no layout shift.
  - DoD: `prefers-reduced-motion` → transizioni istantanee.

### 8.4. Home Page Scroll Behavior
- [ ] Verificare sidebar reveal on scroll nella Home.
  - **Agente:** `@qa-automation-engineer` | Skills: `webapp-testing`
  - DoD: Hero → sidebar nascosta.
  - DoD: Scroll a bento section → sidebar appare con animazione fluida.
  - DoD: Nessun layout shift (CLS = 0).
  - DoD: Back from portfolio page → sidebar nascosta di nuovo su Home.

### 8.5. Mobile QA
- [ ] Verificare responsive su mobile (< 1024px).
  - **Agente:** `@qa-automation-engineer` | Skills: `webapp-testing`, `mobile-design`
  - DoD: Bottom nav visibile su `/about`, `/experience`, `/projects`.
  - DoD: Bottom nav nascosto su `/`.
  - DoD: MobileIdentityBar visibile su portfolio pages, nascosto su Home.
  - DoD: Active indicator segue la route.
  - DoD: No horizontal overflow a 375px.
  - DoD: Home hero leggibile e CTA cliccabili su mobile.

### 8.6. Performance & WebGL Audit
- [ ] Verificare che FloatingLines non causi memory leak.
  - **Agente:** `@performance-optimizer` | Skills: `performance-profiling`
  - DoD: FloatingLines renderizza SOLO su Home (`/`).
  - DoD: Navigare via da Home → Three.js resources disposed (geometry, material, renderer).
  - DoD: DevTools Memory tab: nessun leak dopo 5 navigazioni Home↔About.
  - DoD: `will-change` usato con parsimonia.

---

## Phase 9 — Documentation & Commit
> **🎯 Supervisore:** `@documentation-writer` (skills: `documentation-templates`)
> **Obiettivo:** Documentare i cambiamenti e fare commit/push finale.

### 9.1. Update Component JSDoc
- [ ] Aggiornare JSDoc per tutti i file nuovi e modificati.
  - **Agente:** `@documentation-writer` | Skills: `documentation-templates`
  - DoD: `AppRouter.tsx`, `HomePage.tsx`, `PortfolioLayout.tsx`, `SidebarController.tsx`, `NavigationBar.tsx` hanno JSDoc con descrizione, props, e architettura.

### 9.2. Final Commit & Push
- [ ] Commit atomico con tutti i cambiamenti su `feat/multipage-restructure`.
  - **Agente:** `@devops-engineer` | Skills: `deployment-procedures`
  - DoD: Commit message: `feat(portfolio): restructure to multi-page SPA with react-router-dom`.
  - DoD: Body elenca i DoD principali raggiunti.
  - DoD: Push su remote.

---

## 📊 Orchestration Summary

| Dominio | Agente | Skills |
|---------|--------|--------|
| Planning | `@project-planner` | `architecture`, `plan-writing` |
| Frontend/UI | `@frontend-specialist` | `react-patterns`, `frontend-design`, `ui-ux-pro-max`, `clean-code`, `mobile-design` |
| Routing/Arch | `@frontend-specialist` | `react-patterns`, `architecture` |
| Styling | `@frontend-specialist` | `frontend-design`, `clean-code` |
| Testing | `@test-engineer` | `testing-patterns`, `webapp-testing` |
| E2E QA | `@qa-automation-engineer` | `webapp-testing`, `mobile-design` |
| Performance | `@performance-optimizer` | `performance-profiling` |
| DevOps | `@devops-engineer` | `deployment-procedures` |
| Documentation | `@documentation-writer` | `documentation-templates` |
| Orchestration | `@orchestrator` | `parallel-agents`, `behavioral-modes` |

> **📊 Totale Fasi:** 10 (0-9) | **Agenti Coinvolti:** 7/20 | **Skills Attivate:** 14
> **Priorità di esecuzione:** 0 → 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9
> **Nota:** Phase 2, 3, 4 possono avere parallelismo parziale (SCSS di Phase 2 e 4 in parallelo).

---

## Processi Attivi

| PID | Tipo | Porta | Stato |
|-----|------|-------|-------|
| — | — | — | Nessun processo attivo |

## Log Decisioni

| Data | Decisione | Motivazione |
|------|-----------|-------------|
| 2026-03-10 | react-router-dom v6 al posto di Next.js App Router | Pieno controllo sulle transizioni, animazioni exit, pattern SPA familiare |
| 2026-03-10 | View Transitions API (Hybrid) per transizioni pagina | Nativo nel browser, zero JS overhead, built-in in react-router-dom v6.4+ |
| 2026-03-10 | framer-motion per micro-animazioni intra-page | Già installato, usato ovunque, staggered children + scroll reveals |
| 2026-03-10 | Sidebar scroll-reveal su Home | UX premium: immersione hero → reveal graduale su scroll |
| 2026-03-10 | CTA: "View Projects" + "Contact Me" | Focus su portfolio e contattabilità, non GitHub |
