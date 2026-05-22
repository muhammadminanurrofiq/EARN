---
name: Verdant Growth
colors:
  surface: '#0e1512'
  surface-dim: '#0e1512'
  surface-bright: '#333b37'
  surface-container-lowest: '#09100d'
  surface-container-low: '#161d1a'
  surface-container: '#1a211e'
  surface-container-high: '#242c28'
  surface-container-highest: '#2f3633'
  on-surface: '#dde4df'
  on-surface-variant: '#bbcabf'
  inverse-surface: '#dde4df'
  inverse-on-surface: '#2b322e'
  outline: '#86948a'
  outline-variant: '#3c4a42'
  surface-tint: '#4edea3'
  primary: '#4edea3'
  on-primary: '#003824'
  primary-container: '#10b981'
  on-primary-container: '#00422b'
  inverse-primary: '#006c49'
  secondary: '#95d3ba'
  on-secondary: '#003829'
  secondary-container: '#0b513d'
  on-secondary-container: '#83c2a9'
  tertiary: '#a8cfbc'
  on-tertiary: '#113729'
  tertiary-container: '#84ab98'
  on-tertiary-container: '#1b3f31'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#6ffbbe'
  primary-fixed-dim: '#4edea3'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005236'
  secondary-fixed: '#b0f0d6'
  secondary-fixed-dim: '#95d3ba'
  on-secondary-fixed: '#002117'
  on-secondary-fixed-variant: '#0b513d'
  tertiary-fixed: '#c3ecd7'
  tertiary-fixed-dim: '#a8cfbc'
  on-tertiary-fixed: '#002115'
  on-tertiary-fixed-variant: '#294e3f'
  background: '#0e1512'
  on-background: '#dde4df'
  surface-variant: '#2f3633'
typography:
  headline-xl:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style
The brand personality centers on the intersection of organic vitality and high-precision technology. It evokes the feeling of a high-tech laboratory hidden within a rainforest—where innovation is fueled by natural intelligence. The target audience includes eco-conscious tech enthusiasts, bio-engineers, and sustainability-focused enterprises.

The design style is a sophisticated blend of **Glassmorphism** and **Minimalism**. It utilizes translucent layers to mimic the dappled light of a forest canopy, paired with crisp, systematic typography to maintain a sense of technical rigor. The interface should feel breathable, deep, and alive, using "organic glows" to highlight active states and progress, suggesting natural energy flows.

## Colors
This design system utilizes a palette rooted in the deep spectrum of botanical life. 

*   **Primary (Emerald):** A vibrant, high-energy green used for primary actions, success states, and critical data points.
*   **Secondary (Forest Green):** A deep, rich green used for subtle UI accents, secondary buttons, and structural depth.
*   **Tertiary (Soft Mint):** A low-saturation, light green used for readability on dark backgrounds and delicate highlights.
*   **Neutral (Deep Moss/Charcoal):** The primary background color, providing a warm, organic dark mode that reduces eye strain and enhances the glow of green accents.

Color application should favor gradients between Forest and Emerald to simulate natural depth.

## Typography
The typography strategy balances the sharp precision of technology with the approachable flow of nature. **Hanken Grotesk** provides a contemporary, sharp look for headlines, suggesting high-end engineering. **Inter** is used for body copy to ensure maximum legibility and a systematic feel. **JetBrains Mono** is introduced for labels and technical data, reinforcing the "high-tech" narrative.

Hierarchy is established through weight and color; use Emerald for key headlines to draw the eye, while keeping body text in high-contrast mint-white for clarity against the dark moss backgrounds.

## Layout & Spacing
The layout follows a **Fluid Grid** model to mirror the adaptable growth patterns of plants. It uses an 8px base unit to maintain a rigorous mathematical rhythm. 

- **Desktop:** 12-column grid with a 24px gutter and 64px side margins. Large containers should use `xl` spacing to create "clearings" of whitespace.
- **Tablet:** 8-column grid with 24px gutters and 32px margins.
- **Mobile:** 4-column grid with 16px gutters and 16px margins. 

Spacing should feel generous to evoke the openness of natural environments. Avoid crowded clusters of information; use `lg` and `xl` vertical padding to separate distinct content sections.

## Elevation & Depth
Depth is created through **Tonal Layering** and **Glassmorphism**. Rather than traditional black shadows, this design system uses "Organic Glows"—soft, diffused outer glows in primary Emerald or Secondary Forest Green colors to indicate elevation.

- **Level 0 (Surface):** Deep Moss (#0B120F).
- **Level 1 (Cards/Panels):** Semi-transparent Forest Green with a 12px backdrop blur and a 1px inner border of Emerald at 10% opacity.
- **Level 2 (Modals/Popovers):** Higher transparency with a more intense backdrop blur (24px) and a soft, green-tinted ambient shadow to suggest it is floating above the surface.
- **Interactive States:** Elements should "bloom" when hovered, increasing the intensity of the inner glow and the saturation of the emerald borders.

## Shapes
The shape language is **Rounded**, reflecting the soft edges of leaves and organic structures. Square corners are avoided to keep the UI feeling approachable and natural.

- **Standard Elements:** Buttons and input fields use a 0.5rem radius.
- **Containers:** Large cards and section panels use `rounded-lg` (1rem).
- **Floating Elements:** Tooltips and floating action buttons (FABs) use `rounded-xl` (1.5rem) or full pill shapes to emphasize their detached, airy nature.

## Components
- **Buttons:** Primary buttons feature a subtle Emerald-to-Forest gradient with white text. Hover states trigger a pulse-like emerald glow. Secondary buttons use an "Outlined" style with a 1px Forest Green border.
- **Chips/Tags:** Used for categorization, these should be pill-shaped with a low-opacity Emerald background and Emerald text, mimicking small leaf-like accents.
- **Input Fields:** Dark backgrounds with a 1px "Deep Moss" border. Upon focus, the border transitions to Emerald, accompanied by a soft inner glow.
- **Cards:** Glassmorphic containers with backdrop blurs. Content inside should be padded with `md` spacing to allow the background texture to peek through.
- **Lists:** Separated by low-opacity Forest Green dividers. Active list items use a vertical "stem" (a 4px Emerald bar) on the left edge.
- **Progress Bars:** Designed as "vines," these use a smooth Forest Green track with a glowing Emerald fill that has a slight trailing gradient.
- **Checkboxes/Radios:** When active, these should fill with a solid Emerald color and a tiny center-dot highlight, resembling a seed or a dewdrop.