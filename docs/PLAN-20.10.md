# PLAN 20.10: UI/UX Pro Max Bug Fixes

## 🧠 Brainstorm: Agent & Strategy Assignment for UI/UX Fixes

### Context
Phase 20.9 audit uncovered 5 critical UI/UX bugs affecting mobile responsiveness, accessibility, and visual polish. We need to assign each bug to the correct specialized agent and determine the best approach before execution.

---

### Bug 1: "Download Resume" Button Contrast (Invisible on light background)

**Option A: Dark Text Change**
Change text color to slate-900.
✅ **Pros:** High contrast against the `f0f0f0` background.
❌ **Cons:** May feel inconsistent with other CTA buttons.
📊 **Effort:** Low

**Option B: Accent Background**
Change button background to primary brand color (e.g., `blue-600`) and keep white text.
✅ **Pros:** Meets accessibility standards, draws attention to the CTA, matches "Pro Max" guidelines for primary actions.
❌ **Cons:** None.
📊 **Effort:** Low

💡 **Recommendation: Option B**.
- **Agent Assigned:** `@frontend-specialist`
- **Required Skills:** `ui-ux-pro-max`, `frontend-design`

---

### Bug 2: Mobile Layout Overlaps (IdentityBar & MobileNav cutting content)

**Option A: Fixed Padding Override**
Add `padding-top: 80px` to `pf-scroll-section` and generic `padding-bottom: 80px`.
✅ **Pros:** Fast implementation.
❌ **Cons:** Rigid and might ruin desktop spacing if not scoped properly via media queries.
📊 **Effort:** Low

**Option B: CSS Variables & Safe Area Adjustments**
Bind navbar heights to CSS variables (`--mobile-nav-height`) and inject them into a smart `calc()` for padding.
✅ **Pros:** Scales perfectly across devices, robust against height changes.
❌ **Cons:** Slightly more setup in SCSS.
📊 **Effort:** Medium

💡 **Recommendation: Option B**.
- **Agent Assigned:** `@frontend-specialist`
- **Required Skills:** `mobile-design`, `ui-ux-pro-max`

---

### Bug 3: Broken Avatar API (`avatar.iran.liara.run`)

**Option A: Local Static Asset**
Replace remote URL with a local `/assets/avatar.jpg`.
✅ **Pros:** 100% reliable, zero external dependencies, fastest load time.
❌ **Cons:** Static, harder to change globally without re-deployment.
📊 **Effort:** Low

**Option B: Reliable SVG Generation API (Dicebear)**
Switch to `api.dicebear.com/7.x/`.
✅ **Pros:** Playful, dynamic, matches "Dev" theme.
❌ **Cons:** Still relying on an external service.
📊 **Effort:** Low

💡 **Recommendation: Option A**. Since this is a professional portfolio, relying on external APIs for a crucial profile image is an anti-pattern.
- **Agent Assigned:** `@backend-specialist` (Data integration)
- **Required Skills:** `api-patterns`

---

### Bug 4: Terminal Component Syntax Highlighting

**Option A: Heavy Library (Prism.js / Highlight.js)**
✅ **Pros:** Perfect parsing for any code.
❌ **Cons:** Huge bundle size impact for a purely cosmetic UI element.
📊 **Effort:** High

**Option B: Micro-Syntax Tokenizer (Hand-rolled CSS)**
Since the code snippets are static mock strings, build a tiny regex-based parser or just hand-wrap `<span class="token-string">` in the data object.
✅ **Pros:** Zero bundle size cost, exact visual control, perfectly tailored to our SCSS theme.
❌ **Cons:** Not scalable for dynamic user-input code.
📊 **Effort:** Medium

💡 **Recommendation: Option B**. Performance is key. We shouldn't ship Prism.js for 3 lines of mock code.
- **Agent Assigned:** `@frontend-specialist`
- **Required Skills:** `react-patterns`, `performance-profiling`

---

### Bug 5: Navigation Hover Interaction

**Option A: Glow & Text Shift**
Add `opacity: 1`, a subtle right-shift (`translateX(4px)`), and text brightening on hover.
✅ **Pros:** Feels incredibly satisfying, provides clear feedback.
❌ **Cons:** None.
📊 **Effort:** Low

💡 **Recommendation: Option A**.
- **Agent Assigned:** `@frontend-specialist`
- **Required Skills:** `ui-ux-pro-max`, `frontend-design`

---

## Orchestration Phase 2 Readiness
Minimum 3 distinct agents/skills will be utilized during implementation:
1. `@frontend-specialist` + `ui-ux-pro-max` / `mobile-design` (UI layout & UX feel)
2. `@backend-specialist` + `api-patterns` (Data/Asset stability)
3. `@test-engineer` / `@performance-optimizer` + `performance-profiling` (Validating the syntax tokenizer & layout shifts)
