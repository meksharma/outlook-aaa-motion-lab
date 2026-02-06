
---

# 📄 `docs/motion-acceptance-checklist.md`

```md
# Motion Acceptance Checklist
Outlook_AAA_Motion_Lab

Use this checklist to validate any motion, transition, or visual effect
before considering it “done”.

This checklist applies to:
- HTML/CSS/JS demos
- SwiftUI simulators
- AI-generated motion experiments

If any item fails, revise the implementation.

---

## 1. Purpose & Meaning

- [ ] Can I clearly explain what this motion communicates?
- [ ] Does it reinforce hierarchy, continuity, or focus?
- [ ] If the motion were removed, would the UI still make sense?

If the motion adds no meaning → remove or simplify.

---

## 2. Duration & Frequency

- [ ] Duration is within 180–320ms
- [ ] High-frequency interactions use the shorter end of the range
- [ ] No long or lingering animations

Rule:
> The more often it happens, the faster and quieter it should be.

---

## 3. Movement Limits

- [ ] Translation ≤ 8–10px
- [ ] Scale ≤ 1.02
- [ ] No dramatic zooms or slides
- [ ] No unnecessary parallax

If movement is noticeable, it is probably too much.

---

## 4. Easing & Spring Behavior

- [ ] Ease-out used for navigation and state changes
- [ ] Springs used only for surfaces (sheets, AI panels)
- [ ] No overshoot on frequent interactions
- [ ] Damping feels calm, not playful

Ask:
> Does this feel confident and composed?

---

## 5. Glass & Material Quality

- [ ] Glass conveys structure, not decoration
- [ ] Blur strength feels restrained
- [ ] Opacity/tint adjusted for readability
- [ ] No stacked or redundant glass layers

If glass draws attention to itself, it’s wrong.

---

## 6. Legibility & Contrast

- [ ] Text is readable over busy content
- [ ] Icons remain clear
- [ ] Increased opacity/tint used when needed
- [ ] No reliance on blur alone for contrast

Legibility always beats aesthetics.

---

## 7. Accessibility

- [ ] Reduced Motion mode is supported
- [ ] Reduced Motion replaces movement with fade or instant change
- [ ] No essential information is conveyed only through motion

Motion must never be required to understand the UI.

---

## 8. Platform Alignment

- [ ] iOS / iPadOS / macOS:
  - Calm, system-like motion
  - Minimal bounce
  - Emphasis on continuity
- [ ] Android:
  - Shared axis / container transform language respected (if applicable)
- [ ] Web:
  - Matches native intent, not flashy web-only effects

Platform feel matters more than visual similarity.

---

## 9. Token Compliance

- [ ] Uses shared motion tokens
- [ ] Uses shared glass/material tokens
- [ ] No hard-coded magic numbers
- [ ] Easy to tune globally

If values are copied inline, refactor.

---

## 10. Final Gut Check

- [ ] Does this feel like it belongs in a system UI?
- [ ] Would this feel distracting after 50 uses?
- [ ] Is this calmer than my first instinct?

If unsure → reduce motion.

---

## Acceptance Rule

A motion is accepted only if:
- All sections above pass
- It feels subtle, calm, and intentional
- It would not annoy a user over time
