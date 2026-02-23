# /plan - Experience Layout Fixes

## 🧠 Brainstorming & Architecture Context
- **User Problem:** Desktop layout overlap persists, mobile spacing is zero, fast-scroll wall is buggy, and navigation indicator (`SectionNav` / `MobileNav`) doesn't reflect the active section while scrolling through the long `Experience` zone.
- **Architectural Check:**
  - `_experience.scss` uses flex-box with `calc` based widths. At breakpoints 1024px-1440px, long words or wide code snippets cause overlap.
  - `useScrollSpy.ts` uses `IntersectionObserver` with `threshold: 0.5`. Since the experience section is >200vh tall, 50% of it is never visible at once.
  - `useDiscreteScroll.ts` handles the "wall" mathematically via `viewportBottom >= sectionBottom - 5`, which fails if standard browser zoom, fractional pixels, or dynamic borders are involved.
  - Mobile spacing gap failed to apply due to `gap: space(5xl)` instead of `gap: space('5xl')`.

---

## 📋 Task Breakdown: Phase 20.7

### 1. 🐛 Fix Mobile Spacing (SCSS Map Parsing)
- **Agent:** `@frontend-specialist` | Skills: `frontend-design`, `ui-ux-pro-max`
- **Action:** Update `_experience.scss` the `gap` property from `space(5xl)` (invalid bare identifier in SCSS starting with a number) to `space('5xl')`.
- **DoD:** Mobile view has exactly 8rem (128px) of vertical breathing room between each experience item.

### 2. 🎛️ Fix Nav Active State Observer (Intersection Thresholds)
- **Agent:** `@backend-specialist` or `@test-engineer` | Skills: `react-patterns`, `architecture`
- **Action:** Rewrite `useScrollSpy.ts`. Instead of `threshold: 0.5`, use `threshold: 0` combined with `rootMargin: "-40% 0px -40% 0px"`. This creates a literal tripwire across the middle 20% of the screen. Whichever section crosses this tripwire is the active one, ensuring sections >100vh trigger reliably.
- **DoD:** Sidebar and mobile nav dots instantly update their active state as you scroll through the tall Experience section.

### 3. 🛡️ Robust Scroll Wall Logic
- **Agent:** `@debugger` | Skills: `systematic-debugging`, `react-patterns`
- **Action:** Refactor `useDiscreteScroll.ts`. The exact pixel measurement `viewportBottom >= sectionBottom - 5` is brittle. Implement `Math.ceil()` or use a generous scroll delta buffer of `20px`. Track the scroll attempt consistently regardless of section height mutations.
- **DoD:** The scroll wall activates cleanly at top/bottom of free-scroll zones on both desktop and mobile without false negatives.

### 4. 🖼️ Eliminate Desktop Overlap
- **Agent:** `@frontend-specialist` | Skills: `ui-ux-pro-max`, `tailwind-patterns`
- **Action:** Add `max-width` and tighter horizontal flex bounds in `_experience.scss`. Update `min-width: 0; word-break: break-word` on text containers so long titles like "Senior Software Engineer..." wrap instead of pushing into the center line. Optionally widen the sidebar breakpoint or give terminal blocks `max-width: 100%`.
- **DoD:** At 1024x768 and 1440x900 windows, the experience text and terminal never collide. They wrap gracefully.

---

## 🚦 Next Steps
As per `/plan` workflow, this document serves as the implementation agreement.
Review and confirm to authorize `@orchestrator` to launch the fixing sequence.
