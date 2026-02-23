## 🔍 Debug: Layout, Mobile Spacing, and Scrolling

### 1. Symptom
1. **Desktop Overlap**: Elements still overlap slightly on desktop views.
2. **Mobile Spacing**: There is ZERO space between experience items on mobile, causing them to look "appiccicati" (jammed).
3. **Scroll Wall & Nav State**: The scroll wall doesn't work, and the section navigation doesn't highlight the active section while scrolling through the Experience zone.

### 2. Information Gathered
- Mobile Gap: SCSS relies on `gap: space(5xl)`.
- Scroll Wall: `viewportBottom >= sectionBottom - 5` in `useDiscreteScroll`.
- Nav Active State: `useScrollSpy` uses an `IntersectionObserver` with `threshold: 0.5`.

### 3. Hypotheses
1. ❓ **Mobile Gap (Most likely)**: The token label `5xl` starts with a number. In SCSS, a bare identifier starting with a number is invalid unless quoted. `space(5xl)` fails to evaluate or resolves to `null`, effectively removing the gap entirely. It MUST be `space('5xl')`.
2. ❓ **Nav Active State**: An `IntersectionObserver` with `threshold: 0.5` requires 50% of the *element's total height* to be visible. For the Experience section (which is much taller than the viewport), it will *never* reach 50% visibility, so it never triggers as "active".
3. ❓ **Scroll Wall**: The condition `>= sectionBottom - 5` might never be satisfied if heights involve fractional pixels, or if padding inside the scroll container makes the section's `scrollHeight` slightly out of sync with offsets. 
4. ❓ **Desktop Overlap**: Text strings or terminal components might overflow their `calc(50% - 40px)` boundaries at specific intermediate breakpoints (e.g., between 1024px and 1440px), causing them to clash. Max-widths or word-wrap might be missing, or the terminal min-width overlaps text.

### 4. Investigation

**Testing Hypothesis 1 (`space(5xl)`):**
Confirmed by checking `_tokens.scss`. The `$ux-spacing` map keys are indeed quoted for numbers: `'2xl'`, `'3xl'`, `'4xl'`, `'5xl'`. My recent change introduced `gap: space(5xl);` without quotes. Result -> SCSS parsing fails silently or returns null.

**Testing Hypothesis 2 (IntersectionObserver threshold):**
Confirmed by checking `useScrollSpy.ts`. The threshold is exactly `0.5`. If section is 200vh tall, viewport can only cover 50% at best. If it's 300vh, max visibility is 33%, so it will never fire.

**Testing Hypothesis 3 (Scroll Wall):**
The `wallHitTime` logic in `useDiscreteScroll.ts` triggers when scrolling down and hitting the bottom. But the `viewportBottom` vs `sectionBottom` math relies on `scrollTop`. Next.js hydration or dynamic content loading might cause discrepancies in `offsetTop`.

### 5. Root Cause
🎯 **Mobile Spacing**: Missing quotes around SCSS map keys for numbers (`'5xl'`).
🎯 **Nav Observer**: `threshold: 0.5` makes it impossible for tall sections to be considered "active".
🎯 **Desktop Overlap**: The terminal module (with min-width) and text content don't have enough space at 1024px-1300px resolutions, pushing into each other.
🎯 **Scroll Wall**: The scroll lock logic requires precise pixel matching which fails dynamically.

### 6. Fix Strategy (Execution in next phase)
- Use `rootMargin: "-40% 0px -40% 0px"` and `threshold: 0` for `useScrollSpy`.
- Fix `space('5xl')` in SCSS.
- Refactor the wall logic in `useDiscreteScroll` to calculate boundaries reliably with `Math.ceil()`.
- Implement responsive scaling for the terminal block on intermediate desktop sizes.

### 7. Prevention
🛡️ Always quote SCSS map keys starting with numbers. Test intersection observers with exceptionally tall elements mimicking real-world free-scroll areas.
