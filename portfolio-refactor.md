# Portfolio Refactoring (Vibrant UI/UX Pro Max)

## Goal
Rifattorizzare il portfolio appena generato per rimuovere completamente Tailwind v4 (su richiesta), implementare un'architettura SCSS BEM professionale modulare speculare a `@uderly`, e sfruttare i componenti di React Bits basandosi sulle direttive visive "Vibrant & Block-based" generate dal `MASTER.md` di *UI/UX Pro Max*.

## Tasks

- [ ] Task 1: **Purge Tailwind**
  - Rimuovere librerie e config correlate a Tailwind (`npm uninstall tailwindcss @tailwindcss/postcss`, `rm postcss.config.mjs`, svuotare `globals.css`).
  - *Verify:* `npm run build` non mostra dipendenze Tailwind o file di configurazione residui.

- [ ] Task 2: **Scaffold SCSS Architecture**
  - Creare la gerarchia in `src/styles/` (`_colors.scss`, `_tokens.scss`, `_theme.scss`, `components/_button.scss`, `main.scss`) importando i token colori e spazi da `MASTER.md` (es. primary `#3B82F6`, shadow-xl, font Space Grotesk/DM Sans).
  - *Verify:* I file SCSS sono formattati correttamente, usano le variabili (es. `--color-primary`), e `main.scss` li importa tutti.

- [ ] Task 3: **Refactor Layout Globale**
  - Configurare `layout.tsx` e `page.tsx` rimuovendo tutte le classi utility Tailwind e assegnando classi semantiche BEM (es. `.pf-page`, `.pf-sidebar`, `.pf-content`).
  - *Verify:* La pagina carica con il layout "Left Fixed / Right Scroll" mantenuto intatto unicamente da regole SCSS in `.pf-sidebar` e `.pf-content`.

- [ ] Task 4: **Refactor React Bits Components (Spotlight & DecryptedText)**
  - Adattare i componenti esistenti (Spotlight, DecryptedText) per usare logica Inline Styles/SCSS anziché Tailwind.
  - *Verify:* Il cursore Spotlight funziona; il testo viene ancora decriptato nell'header.

- [ ] Task 5: **Integrare PixelCard e TiltedCard (Projects)**
  - Installare e implementare `PixelCard` (o `TiltedCard`) per la sezione Projects, applicando i token `shadow-md` e transizioni a 200ms suggerite da UI/UX Pro Max.
  - *Verify:* Passando il mouse sulle card progetto la griglia pixel animata o il tilt parallax funzionano coerentemente.

- [ ] Task 6: **Integrare InfiniteScroll (Experience)**
  - Aggiungere il componente `InfiniteScroll` per la lista delle tecnologie ("React", "Next.js", "SCSS", "Framer").
  - *Verify:* Loghi o stringhe scorrono infinitamente senza scrollbar visive o breaking layout.

- [ ] Task 7: **Integrare Magnet Buttons (CTA)**
  - Implementare l'animazione `Magnet` sui bottoni principali (es. "Deploy Now" / "Documentation" da convertire in "Download CV" / "Contact Me"), combinata con `.btn-primary` di `_button.scss`.
  - *Verify:* I bottoni attirano fisicamente il cursore prima del click seguendo la logica *Vibrant* interattiva.

## Done When
- [ ] Il portfolio builda in locale con layout responsivo perfetto e design system DM Sans + Space Grotesk.
- [ ] Il codice non fa NESSUN USO di Tailwind.
- [ ] L'interattività "Wow" di React Bits è completamente integrata nell'architettura a componenti CSS Modules o SCSS globaux.
- [ ] Ogni componente rispetta lo standard dell'A11y (cursor-pointer ovunque, no emojis come icone).
