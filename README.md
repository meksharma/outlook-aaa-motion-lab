# Outlook Motion Lab

> A motion vocabulary learning tool for Outlook designers — learn professional motion terms, copy AI-ready prompts, and prototype faster.

## Open the Prototype

**[Open Outlook Motion Lab](https://meksharma.github.io/outlook-motion-lab/)**

No installation or Microsoft sign-in is required. Open the link in any modern browser, choose a pattern, and use the demo controls to explore its motion.

## Public Prototype Directory

| Prototype | Open |
| --- | --- |
| Outlook Liquid Glass Simulator | [Launch simulator](https://meksharma.github.io/outlook-liquid-glass-simulator/) |
| Outlook Mobile Prototype | [Launch prototype](https://meksharma.github.io/outlook-mobile/) |
| Outlook Motion Lab | [Explore motion patterns](https://meksharma.github.io/outlook-motion-lab/) |

---

![Outlook Motion Lab](https://img.shields.io/badge/Platform-iOS%20%7C%20iPadOS%20%7C%20Android%20%7C%20macOS%20%7C%20Web-blue)
![License](https://img.shields.io/badge/License-Internal-orange)

---

## What is this?

Outlook Motion Lab is an interactive learning library that helps designers:

1. **Learn motion vocabulary** — Professional terms like "spring damping", "matched geometry", and "container transform" that AI tools understand
2. **Copy AI-ready prompts** — Ready-to-paste prompts for SwiftUI and HTML/CSS/JS that work with Claude Code, VS Code Copilot, and other AI coding assistants
3. **See live demos** — Interactive demonstrations of each motion pattern with tunable parameters

**Built for:** Outlook iOS, iPadOS, Android, and macOS design team

---

## 🎨 Liquid Glass Design System

This project follows **Apple's iOS 26 "Liquid Glass" direction** with strict design tokens and validation rules:

### Design Documentation
- **[`docs/liquid-glass-rules.md`](docs/liquid-glass-rules.md)** — Non-negotiable guardrails for motion, transitions, and glass materials
- **[`docs/motion-acceptance-checklist.md`](docs/motion-acceptance-checklist.md)** — Validation checklist for all motion implementations

### Design Tokens
All animations and materials use shared tokens from `assets/liquid-glass-tokens.js`:

**Primary Glass Material Tokens:**
```css
--glass-blur: 20px;              /* Range: 18–28px */
--glass-opacity: 0.65;           /* Range: 0.55–0.80 */
--glass-saturation: 1.3;         /* Range: 1.2–1.5 */
--glass-radius: 16px;            /* Range: 14–20px */
--glass-shadow: 0 8px 24px rgba(0,0,0,0.12);
--glass-highlight: inset 0 1px 0 rgba(255,255,255,0.35);
```

**Motion Duration Limits:**
- Duration: **180–320ms** (frequent interactions)
- Translation: **≤ 8–10px** maximum
- Scale: **≤ 1.02** maximum

### Key Principles
- **Glass is structural, not decorative** — Only use for hierarchy and context
- **Motion communicates meaning** — Every animation should explain spatial relationships
- **Subtle by default** — iOS-style motion is quiet, confident, and restrained

---

## Quick Start

### Option 1: Open directly in browser

Simply double-click `index.html` to open in your default browser.

> ⚠️ Some browsers may restrict loading JSON files from `file://` protocol. If patterns don't load, use Option 2.

### Option 2: Run a local server (recommended)

**Using Python:**
```bash
# Python 3
python -m http.server 8000

# Then open http://localhost:8000
```

**Using Node.js:**
```bash
npx serve .

# Then open http://localhost:3000
```

**Using VS Code:**
- Install the "Live Server" extension
- Right-click `index.html` → "Open with Live Server"

---

## Project Structure

```
outlook-motion-lab/
├── index.html              # Main entry point
├── README.md               # This file
├── docs/                   # 📄 Design Documentation
│   ├── liquid-glass-rules.md      # Liquid Glass design system rules
│   └── motion-acceptance-checklist.md  # Motion validation checklist
├── assets/
│   ├── styles.css          # All styles
│   ├── app.js              # Main application logic
│   ├── patterns.json       # Pattern data (editable!)
│   ├── liquid-glass-tokens.js     # 🎨 Design system tokens
│   ├── auto-tint.js        # Automatic readability adjustments
│   └── demos/
│       ├── demo-registry.js    # Demo registration system
│       ├── navigation.js       # Navigation demos
│       ├── modals.js           # Modal/sheet demos
│       ├── micro.js            # Micro-interaction demos
│       ├── loading.js          # Loading/feedback demos
│       ├── material.js         # Material/glass demos
│       ├── ai-panel.js         # AI panel demo
│       ├── outlook.js          # Outlook-specific demos
│       └── ios-patterns.js     # iOS-specific patterns
```

---

## How to Use

### 1. Browse Patterns

- Use the **sidebar** to filter by platform (iOS, Android, macOS, Web)
- Click **category buttons** to filter by type (Navigation, Modals, etc.)
- Use the **search bar** to find patterns by name, tags, or motion terms

### 2. Learn Motion Terms

Each pattern includes:
- **"What it feels like"** — A human-readable description
- **"Use when"** — Specific scenarios for this pattern
- **Motion Terms** — Professional vocabulary for AI prompts

### 3. Copy Prompts

Click a pattern card to view details, then:
1. Switch between **SwiftUI** and **Web** tabs
2. Click **Copy** to copy the prompt to clipboard
3. Paste into Claude Code, VS Code Copilot, or any AI tool

### 4. Try Demos

- Click **▶ Play Animation** to see the pattern in action
- Adjust **sliders** to explore variations
- Click **↻ Reset** to return to initial state

---

## ✅ Motion Validation

Before any motion pattern is considered "done", it must pass the **[Motion Acceptance Checklist](docs/motion-acceptance-checklist.md)**:

### 10-Point Validation Process
1. **Purpose & Meaning** — Can you clearly explain what this motion communicates?
2. **Duration & Frequency** — Is duration within 180–320ms?
3. **Movement Limits** — Translation ≤ 8–10px, Scale ≤ 1.02?
4. **Easing & Spring Behavior** — Does it feel confident and composed?
5. **Glass & Material Quality** — Does glass convey structure, not decoration?
6. **Legibility & Contrast** — Is text readable over busy content?
7. **Accessibility** — Does Reduced Motion mode work?
8. **Platform Alignment** — Does it feel system-like?
9. **Token Compliance** — Uses shared tokens, no magic numbers?
10. **Final Gut Check** — Would this feel distracting after 50 uses?

### Acceptance Rule
**A motion is accepted only if:**
- All sections above pass
- It feels subtle, calm, and intentional
- It would not annoy a user over time

---

## Adding a New Motion Pattern

Adding new patterns is easy! Just edit `assets/patterns.json`.

### Step 1: Add pattern data to patterns.json

```json
{
  "patterns": [
    // ... existing patterns ...
    {
      "id": "your-pattern-id",
      "name": "Your Pattern Name",
      "category": "navigation",  // Must match a category id
      "tags": ["tag1", "tag2"],
      "platforms": ["ios", "android"],  // ios, ipados, android, macos, web

      "feelsLike": "One sentence describing the feeling of this motion.",

      "useWhen": [
        "First use case",
        "Second use case"
      ],

      "motionTerms": [
        "spring animation",
        "fade through",
        "other professional terms"
      ],

      "parameters": [
        {
          "name": "duration",
          "label": "Duration",
          "type": "range",
          "min": 0.1,
          "max": 1.0,
          "step": 0.05,
          "default": 0.3,
          "unit": "s"
        }
      ],

      "prompts": {
        "swiftui": "Your SwiftUI prompt here...",
        "web": "Your HTML/CSS/JS prompt here..."
      },

      "demoId": "your-demo-id"
    }
  ]
}
```

### Step 2: Create the demo (optional but recommended)

Create or edit a demo file in `assets/demos/`:

```javascript
// In assets/demos/your-category.js

window.DemoRegistry.register('your-demo-id', {
    // Returns HTML for the demo container
    render: function(reducedMotion) {
        return `
            <div class="your-demo-container" id="your-demo">
                <!-- Your demo HTML here -->
            </div>
        `;
    },

    // Initialize the demo (called when pattern is viewed)
    init: function(params, reducedMotion) {
        // Setup code here
    },

    // Trigger the animation (called when Play button is clicked)
    play: function(params, reducedMotion) {
        // Animation code here
        // params contains current slider values
    },

    // Reset to initial state
    reset: function(reducedMotion) {
        // Reset code here
    }
});
```

### Step 3: Add demo script to index.html (if new file)

```html
<!-- In index.html, add before app.js -->
<script src="assets/demos/your-category.js"></script>
```

---

## Writing Effective Prompts

### 🎨 Token Compliance First
**All prompts should reference the Liquid Glass design system:**
- **Use CSS variables**: `var(--glass-blur)`, `var(--lg-duration-standard)`, etc.
- **Stay within limits**: 180-320ms duration, ≤8-10px translation, ≤1.02 scale
- **Reference documentation**: "Following the liquid-glass-rules.md guidelines..."
- **Validate against checklist**: "Ensure this passes motion-acceptance-checklist.md"

### SwiftUI Prompts

Good SwiftUI prompts include:
- Specific animation types (`spring`, `easeOut`, etc.) **with token values**
- Exact parameter values (`damping: 0.85`, `response: 0.35`)
- View modifier names (`.transition()`, `.animation()`, `.matchedGeometryEffect()`)
- **Liquid Glass compliance**: "Duration should be 240-300ms per design system"
- Gesture support if applicable
- iOS version considerations

**Example:**
```
Create a navigation push transition in SwiftUI following liquid-glass-rules.md:
- Spring animation (damping: 0.85, response: 0.35)
- Duration: 240-300ms (within system limits)
- Translation: max 8px parallax (within token limits)
- The outgoing view translates left by 30% with slight opacity fade
- The incoming view slides from the right edge
- Support interactive swipe-back gesture
- Use matchedGeometryEffect for shared elements
- Ensure it passes the motion acceptance checklist
```

### Web (HTML/CSS/JS) Prompts

Good web prompts include:
- **CSS token references**: `var(--glass-blur)`, `var(--lg-duration-standard)`
- CSS property names (`transform`, `opacity`, `transition`)
- **Compliant values**: Duration 180-320ms, scale ≤ 1.02, translate ≤ 10px
- Easing functions (`cubic-bezier(0.2, 0.8, 0.2, 1)`)
- Performance hints (`will-change`, `transform3d`)
- **Accessibility**: Reduced motion support
- Touch/gesture support if applicable

**Example:**
```
Create a navigation push transition in HTML/CSS/JS following the Liquid Glass design system:
- Use CSS variables: var(--lg-duration-standard) for timing
- Duration: within 180-320ms range per motion acceptance checklist
- Translation: max 8px parallax (var(--lg-translate-large))
- CSS transition using cubic-bezier(0.2, 0.8, 0.2, 1)
- Outgoing view: translateX(-30%) with opacity 0.8
- Incoming view: translateX(100%) → translateX(0)
- Add touch gesture support for swipe-back
- Use transform3d for GPU acceleration
- Support prefers-reduced-motion
- Validate against docs/motion-acceptance-checklist.md
```

---

## Pattern Categories

| Category | ID | Description |
|----------|-----|-------------|
| Navigation | `navigation` | Push, pop, tab switches |
| Modals & Sheets | `modals` | Bottom sheets, dialogs, expansions |
| Micro-interactions | `micro` | Button presses, toggles, menus |
| Loading & Feedback | `loading` | Skeletons, toasts, progress |
| Material & Glass | `material` | Blur, vibrancy, glass effects |
| Content Transitions | `content` | Crossfades, state changes |

---

## Platform Terms Reference

### iOS / iPadOS / macOS
- `spring animation` — Physics-based animation with bounce
- `matched geometry effect` — Shared element transitions
- `interactive gesture` — User-driven animations
- `material / blur` — Background blur effects
- `vibrancy` — Text/content that adapts to blur
- `detents` — Sheet stopping points

### Android
- `shared axis` — Coordinated enter/exit on same axis
- `container transform` — Expanding card transitions
- `fade through` — Sequential fade out then fade in
- `emphasis` — Highlighting important elements

### Web
- `cubic-bezier` — Custom easing curves
- `will-change` — Performance optimization hint
- `transform3d` — GPU-accelerated transforms
- `backdrop-filter` — Background blur in CSS

---

## Included Patterns (12)

1. **Context-Preserving Push** — Navigation push with parallax
2. **Navigation Pop** — Back navigation with gesture support
3. **Bottom Sheet Present** — Modal sheet rising from bottom
4. **Card → Full Screen Expand** — Matched geometry card expansion
5. **Glass Header Collapse** — Scroll-driven material transition
6. **Tab Switch Indicator** — Sliding selection indicator
7. **Button Press Micro-interaction** — Scale and highlight feedback
8. **Context Menu Reveal** — Spring-animated popup menu
9. **Toast / Snackbar Reveal** — Notification slide-in
10. **Skeleton Loading Shimmer** — Animated loading placeholders
11. **AI Panel Reveal** — Calm spring for assistive panels
12. **Crossfade Between Content States** — Smooth state transitions

---

## Accessibility

### Reduced Motion Support

The site includes a "Reduced Motion" toggle that:
- Replaces movement-based animations with fades
- Respects the system `prefers-reduced-motion` preference
- Affects all demo playback

When writing demos, always check the `reducedMotion` parameter:

```javascript
play: function(params, reducedMotion) {
    if (reducedMotion) {
        // Use simple fade
        element.style.opacity = '1';
    } else {
        // Use full animation
        element.style.transform = 'translateX(0)';
    }
}
```

---

## Coding Conventions

### JavaScript
- Use vanilla JS only (no frameworks)
- Wrap code in IIFEs to avoid global pollution
- Use `'use strict'` directive
- Comment complex logic
- Handle missing DOM elements gracefully

### CSS
- Use CSS custom properties for theming
- Follow the established naming convention
- Keep specificity low
- Use `var(--token)` for design tokens

### JSON
- Use 2-space indentation
- Keep pattern IDs kebab-case
- Keep prompts readable (use `\n` for line breaks)

---

## Contributing

1. **Adding patterns:** Edit `patterns.json`, optionally add demo
2. **Fixing bugs:** Submit a PR with description
3. **New features:** Discuss with team first
4. **Styling changes:** Follow existing conventions

### Testing Checklist

Before submitting changes:
- [ ] Site loads without errors in console
- [ ] All patterns display correctly
- [ ] Demos play and reset properly
- [ ] Reduced motion mode works
- [ ] Search and filters work
- [ ] Copy buttons work
- [ ] Mobile responsive (if applicable)

---

## Troubleshooting

### Patterns don't load
- Check browser console for errors
- Verify `patterns.json` is valid JSON (use a validator)
- Try running a local server instead of file://

### Demo doesn't appear
- Check that `demoId` in patterns.json matches registered demo
- Verify demo JS file is loaded in index.html
- Check console for registration errors

### Animations look janky
- Ensure `will-change` is set for animated properties
- Use `transform` instead of `left/top` for position
- Check if reduced motion is accidentally enabled

---

## License

Internal use only — Outlook Design Team.

---

## Credits

Built for the Outlook AAA Design Team to bridge the vocabulary gap between designers and AI coding tools.

**Supported platforms:**
- iOS / iPadOS
- Android
- macOS
- Web
