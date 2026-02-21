# Audit Pro-Max: Portfolio "Infinity"
**Obiettivo:** Raggiungere l'eccellenza assoluta (Top Tier Portfolio) basandosi sulle performance UI/UX di Brittay Chiang, Cassie Evans e linee guida Pro-Max.

## 🔴 CRITICITÀ RILEVATE E GAP RISPETTO ALLO STATO DELL'ARTE
Attualmente, il portfolio ha un'ottima architettura (BEM + Next.js), ma l'esperienza "guidata" manca di fluidità, storytelling e cura maniacale dei dettagli (micro-interazioni).

### 1. Hero Section & Introduzione
- **Problema:** La Hero risulta statica. Il componente `DecryptedText` è bello ma fine a sé stesso. Non ci sono inviti all'azione (CTA primarie) forti visibili ad occhio («View Resume» o «Get In Touch»).
- **Soluzione Top-Tier:** Introdurre un avatar/foto iper-professionale o un effetto visivo "WOW" (es. cursore che rivela il volto come in Adham Dannaway, o un layout diviso). Aggiunta di un Primary Magnetic Button per scaricare il CV.

### 2. Navigazione & Layout Asincrono (Alla Brittany Chiang)
- **Problema:** Manca un feedback sullo scroll. Le sezioni scorrono, ma il menù a sinistra non reagisce dinamicamente.
- **Soluzione Top-Tier:** Implementare un "Intersection Observer" nell'app. Quando la sezione `About` è visibile a destra, il `nav-indicator` di sinistra deve allungarsi dinamicamente col core color `--color-cta`.

### 3. Componenti React Bits Scarsamente Ottimizzati
- **Problema:** Le `PixelCard` in Projects sono scollegate dal contesto e visivamente troppo alte (`height: 300px` hardcoded senza aspect ratio elastico). L'`InfiniteScroll` in Experience è isolato dentro un `div` anonimo e sfasa col layout BEM.
- **Soluzione Top-Tier:** Integrare le label del tech-stack in badge BEM raffinati (chip style). Rifare l'hover delle Project Cards per mappare il focus dell'utente (mouse-tracking overlay, come gli spot di Cassie Evans/Brittany).

### 4. Micro-Interazioni e Feedback Fisico
- **Problema:** I link social testuali (sebbene magnetici) e la mancanza di cursori custom rendono la permanenza piatta.
- **Soluzione Top-Tier:** Implementare un cursore customizzato (un punto che diventa un cerchio grande sugli hook cliccabili). Sotituire i placeholder testuali "Github" "LinkedIn" con `SVG Icons` di alta qualità e accessibilità aria.

### 5. Accessibilità (A11Y) & Leggibilità
- **Problema:** `var(--color-text-muted)` su `var(--color-background)` ha un contrast ratio a volte rischioso sulle descrizioni lunghe. Manca uno Skip-link per screen readers.
- **Soluzione Top-Tier:** Revisionare il `_colors.scss`. Alzare il luminence del `text-muted` (verso `#94A3B8`). Garantire font-weight solido per *DM Sans*.

---
## 🎯 PIANO D'AZIONE (MASTER UPGRADE)

1. **Avatar/Hero Enhancement:** Componente Hero con Glitch/Reveal effect o foto. Magnetic Resume Button.
2. **Scroll Spy Navigation:** Hook React per tracciare lo scroll ed evidenziare la navigazione laterale.
3. **Card "Mouse-Glow" e Chips:** Riprogettazione delle experience cards e rifinitura delle PixelCard per scaling corretto.
4. **Custom Splash Cursor & SVG:** Reimportare il cursore custom (React Bits) globale e sostituire i plain-text link con icone Lucide.
5. **Color & A11y Fine-Tune:** Adeguamento dei contrast ratio finali.
