# Design Brief: Mummies One — Homemade Bakery

**Tone:** Warm, organic, artisanal. Cozy neighborhood bakery with natural materials and human touch.

**Palette:**
| Name | OKLCH | Usage |
|------|-------|-------|
| Primary (Green) | `0.45 0.15 164` | Header, navigation, hero accent, primary CTAs |
| Accent (Gold) | `0.58 0.16 72` | Order buttons, highlights, interactive states |
| Foreground | `0.15 0.02 164` | Body text, UI foreground |
| Background | `0.98 0.01 160` | Page background, neutral surface |
| Card | `0.995 0.01 160` | Product cards, elevated sections |
| Muted | `0.88 0.02 160` | Subtle backgrounds, borders |
| Destructive | `0.55 0.22 25` | Errors, cancel actions |

**Typography:**
| Layer | Font | Usage |
|-------|------|-------|
| Display | Fraunces (elegant serif) | Hero titles, product names, headings |
| Body | DM Sans (modern sans-serif) | Body copy, form labels, UI text |
| Mono | System monospace | Prices, technical info |

**Elevation & Depth:**
- Cards: `shadow-warm` (4px 12px soft shadow)
- Elevated sections: `shadow-elevated` (8px 24px deeper shadow)
- Border: `0.92 0.01 160` subtle muted line
- Radius: 12px for cards, 8px for buttons, 0 for structured forms

**Structural Zones:**
| Zone | Background | Details |
|------|------------|---------|
| Header | Green primary gradient | Logo, navigation, white text |
| Hero | Green gradient (`var(--gradient-primary)`) | Full width, centered content, gold CTA |
| Content cards | Card bg + `shadow-warm` | Product grid, order details |
| Footer | Muted background | Contact info, social links, neutral text |
| Sections | Alternating card / background | Breathing space, visual rhythm |

**Component Patterns:**
- Product cards: grid-based, image-first, name + price + gold "Order" button
- Buttons: gold gradient for primary (`.gradient-accent`), green for secondary
- Forms: white inputs with subtle borders, green focus ring
- Tags/badges: muted background with green text
- Order status: color-coded (pending yellow, accepted green, completed blue)

**Motion:**
- Smooth transitions: `transition-smooth` (0.3s cubic-bezier)
- Button hover: slight lift via shadow change + color saturation increase
- No bouncy/celebratory animations — restrained, professional

**Signature Detail:**
Bakery logo in header with site title "Mummies One" in Fraunces display font. Green gradient underline accent beneath navbar. Product cards use warm shadow to create inviting, lifted appearance. Gold accents on CTAs create warmth against green.

**Constraints:**
- No full-page gradients (card-level only)
- No rainbows or clashing hues
- Mobile-first, simple grid layout
- High contrast text (AA+ compliance)
- Green and gold must feel natural, not artificial
