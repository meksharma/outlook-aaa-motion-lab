# Liquid Glass Motion & Material Rules
Outlook Liquid Glass Simulator

This document defines the **non-negotiable guardrails** for building motion, transitions,
and visual effects that align with Apple’s iOS 26 “Liquid Glass” direction.

These rules exist to:
- Keep motion subtle, calm, and purposeful
- Preserve hierarchy, continuity, and legibility
- Avoid flashy, decorative, or non-system-feeling effects
- Ensure consistency across iOS, iPadOS, macOS, Web simulators

This file should be treated as a **source of truth** for humans and AI tools.

---

## 1. Core Principles (Read This First)

### 1.1 Glass is structural, not decorative
Liquid Glass is used to:
- Separate layers
- Indicate elevation
- Preserve spatial continuity

It is NOT used to:
- Show off blur
- Add gloss or “frosted” decoration
- Stack multiple translucent layers unnecessarily

> If glass does not help hierarchy or context, remove it.

---

### 1.2 Motion communicates meaning
Motion should always explain:
- Where something came from
- Where it is going
- What layer it belongs to

Motion should NOT exist just to look “cool”.

---

### 1.3 Subtle by default
If unsure, choose:
- Smaller movement
- Shorter duration
- Less blur
- Less bounce

iOS-style motion is quiet, confident, and restrained.

---

## 2. Liquid Glass Tokens (Required)

All components and animations MUST use shared tokens.
No one-off values.

### 2.1 Material Tokens

#### Web / HTML simulators (CSS variables)
```css
:root {
  /* Glass material */
  --glass-blur: 20px;              /* Range: 18–28px */
  --glass-opacity: 0.65;           /* Range: 0.55–0.80 */
  --glass-saturation: 1.3;         /* Range: 1.2–1.5 */

  /* Structure */
  --glass-radius: 16px;            /* Range: 14–20px */

  /* Subtle depth */
  --glass-shadow: 0 8px 24px rgba(0,0,0,0.12);
  --glass-highlight: inset 0 1px 0 rgba(255,255,255,0.35);
}