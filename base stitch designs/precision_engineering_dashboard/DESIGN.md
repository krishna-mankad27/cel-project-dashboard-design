---
name: Precision Engineering Dashboard
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#464555'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#005338'
  on-tertiary: '#ffffff'
  tertiary-container: '#006e4b'
  on-tertiary-container: '#67f4b7'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.03em
  code-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 18px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-mobile: 0.75rem
  margin: 1.5rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1.25rem
  space-xl: 2rem
---

## Brand & Style

This design system is engineered for modern technical leads, engineering managers, and software developers who require low cognitive friction and rapid operational comprehension. The brand personality balances quiet technical authority with energetic clarity—providing a calm, reliable bedrock punctuated by vivid, purposeful accents that highlight mission-critical status changes.

The aesthetic fuses **Corporate / Modern** precision with functional **Minimalism**:
- **Clarity over ornament:** Decoration is removed unless it actively communicates state, density, or grouping.
- **Controlled vibrancy:** High-intensity indigos and high-contrast status tokens cut through neutral slate and cool gray canvases, anchoring immediate focus without visual exhaustion.
- **Data density & scannability:** Compact margins, precise component footprints, and explicit visual boundaries enable information-dense dashboards to remain legible across lengthy operational reviews.

## Colors

The palette employs a multi-tiered cool surface foundation to construct clear layer separation without visual heaviness.

### Color Roles & Semantics
- **Brand & Primary Focus:**
  - Base Primary: `#4F46E5` (Active states, brand anchors, primary action triggers)
  - Dark Primary / Headers: `#4338CA` (High-contrast structural headers, key active tabs)
  - Light Accent / Interactive Focus: `#6366F1` (Hover rings, focus borders, active badges)
- **Surfaces & Canvas:**
  - Canvas: `#FFFFFF` (Base layer for card backgrounds and elevated inputs)
  - Sub-surface 1: `#F8FAFC` (Global page canvas, subtle background groupings)
  - Sub-surface 2: `#F1F5F9` (Nested tables, track beds, code blocks, sidebar panels)
- **Borders & Dividers:**
  - Hairline Rule: `#E2E8F0` (Card outlines, table gridlines, cell separators)
  - Active Border: `#CBD5E1` (Input inactive state, hover borders)
- **Status Indicators (High-Contrast Pairs):**
  - **Slipping / Alert:** Text/Icon `#EF4444`, Fill Surface `#FEE2E2`, Border `#FCA5A5`
  - **Approaching Deadline / Caution:** Text/Icon `#F59E0B`, Fill Surface `#FEF3C7`, Border `#FCD34D`
  - **On-track / Healthy:** Text/Icon `#10B981`, Fill Surface `#D1FAE5`, Border `#6EE7B7`
- **Text & Content Hierarchy:**
  - Primary Text: `#0F172A` (Headings, primary metrics, high-emphasis text)
  - Secondary Text: `#475569` (Body labels, table contents)
  - Muted Text: `#64748B` (Metadata, breadcrumbs, placeholder text)

## Typography

Typography establishes an unambiguous distinction between macro context and granular telemetry.
- **Headings (Plus Jakarta Sans):** Applied to dashboards, page headers, metric aggregates, and card titles. Its contemporary geometric geometry balances technical precision with high character distinction.
- **Body & Data Labels (Inter):** Applied across analytical tables, logs, input structures, and UI controls. Inter provides neutral rendering, distinct numeric glyphs, and high legibility at dense standard sizes (`12px` and `14px`).
- **Data Rendering Rules:** Tabular figures (`font-variant-numeric: tabular-nums`) must be enforced for all table cells, timers, latency displays, and commit hashes to prevent horizontal jitter during real-time data streaming.

## Layout & Spacing

The layout uses a **fluid-grid layout** anchored by strict modular boundaries. 

### Breakpoints & Column Architectures
- **Desktop (1280px+):** 12-column fluid grid, `1.5rem` (`24px`) outer margin, `1rem` (`16px`) gutters. Sidebars maintain a fixed width of `260px` or `72px` collapsed.
- **Tablet (768px – 1279px):** 8-column grid, `1.25rem` (`20px`) margins, `1rem` (`16px`) gutters. Dashboard cards reflow from 4-column widgets into 2-column or full-width groups.
- **Mobile (< 768px):** 4-column grid, `1rem` (`16px`) outer margins, `0.75rem` (`12px`) gutters. Multi-metric tables transform into card stacks with horizontal edge-scrolling for telemetry graphs.

### Spacing Principles
- **Base Grid Unit:** 4px standard grid.
- **Compact Padding:** Card interior padding defaults strictly to `space-lg` (`1.25rem`) for standard operational cards and `space-md` (`0.75rem`) for compact telemetry panels.
- **Group Separation:** Micro elements (icon-to-text) use `space-xs` (`4px`) or `space-sm` (`8px`), preventing layout bloat in engineering matrices.

## Elevation & Depth

Visual depth avoids heavy, saturated dropshadows in favor of **structural boundaries with ambient elevation**:

- **Tier 0 (Background Canvas):** `#F8FAFC`. Completely flat; structural foundation.
- **Tier 1 (Resting Dashboard Panels & Cards):** `#FFFFFF` surface enclosed by a fine 1px border (`#E2E8F0`), supported by an ultra-subtle ambient shadow: `0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.05)`.
- **Tier 2 (Hovered Cards & Interactive Controls):** `#FFFFFF` surface, border transitions to `#CBD5E1`, with elevation `0 4px 6px -1px rgba(15, 23, 42, 0.07), 0 2px 4px -2px rgba(15, 23, 42, 0.05)`.
- **Tier 3 (Dropdowns, Command Palettes, Popovers):** `#FFFFFF` surface with crisp border `#E2E8F0` and floating shadow `0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.03)`.
- **Tier 4 (Critical Modal Dialogs):** Centered `#FFFFFF` modal framed with `#E2E8F0` over a soft backdrop scrim (`rgba(15, 23, 42, 0.45)` with a 2px backdrop blur), shadowed by `0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.05)`.

## Shapes

The design system implements a **Soft** shape language (`roundedness: 1`), keeping structural interfaces sharp, professional, and disciplined.

- **Base Radius (0.25rem / 4px):** Applied to badges, table tags, small status chips, progress fill bars, and nested metadata icons.
- **Medium Radius (0.375rem / 6px):** Applied to buttons, inputs, segmented controls, dropdown triggers, and tooltip bodies.
- **Large Radius (0.5rem / 8px):** Applied to parent dashboard cards, metric tiles, code blocks, and slide-over side panels.
- **Modal Radius (0.75rem / 12px):** Applied exclusively to central dialog modals and command palettes (`CMD+K`).
- Pill shapes are rejected for structural containers to conserve usable spatial volume; pills are reserved solely for live status indicator dots.

## Components

### Buttons
- **Primary:** Background `#4F46E5`, text `#FFFFFF`, border none. Hover state `#4338CA`. Active state `#3730A3`. Focus state `2px` offset ring in `#6366F1`.
- **Secondary / Outline:** Background `#FFFFFF`, text `#0F172A`, border `1px solid #E2E8F0`. Hover state background `#F8FAFC`, border `#CBD5E1`.
- **Ghost:** Background transparent, text `#475569`. Hover background `#F1F5F9`, text `#0F172A`.
- **Destructive:** Background `#EF4444`, text `#FFFFFF`. Hover `#DC2626`.
- **Dimensions:** Dense sizing—Small (`28px` height, `12px` font), Medium (`36px` height, `14px` font).

### Status Chips & Badges
- Compact capsules (`20px` height) built using a 3-part token scheme:
  - **Slipping:** Background `#FEE2E2`, border `1px solid #FCA5A5`, text `#B91C1C`.
  - **Approaching Deadline:** Background `#FEF3C7`, border `1px solid #FCD34D`, text `#B45309`.
  - **On-track:** Background `#D1FAE5`, border `1px solid #6EE7B7`, text `#047857`.
- Each status chip includes a `6px` solid circle prefix in the matching text tone to maintain accessibility for color-blind users.

### Cards & Metric Tiles
- Background `#FFFFFF`, border `1px solid #E2E8F0`, corner radius `8px`.
- **Header Structure:** Explicit separation using bottom divider `1px solid #F1F5F9`, height `48px`, featuring card title on the left (`headline-sm`) and metadata/actions on the right.
- **Dense Data Cards:** Embedded micro sparklines or progress bars sit directly above card footer containers without extraneous margin.

### Input Fields & Controls
- **Inputs:** Height `36px`, background `#FFFFFF`, border `1px solid #E2E8F0`, radius `6px`, text `#0F172A`, placeholder `#94A3B8`. Focus state shifts border to `#4F46E5` with `0 0 0 3px rgba(79, 70, 229, 0.15)`.
- **Checkboxes & Radios:** `16px × 16px`, border `1px solid #CBD5E1`, radius `4px` (checkbox) or `50%` (radio). Checked state background `#4F46E5`, border `#4F46E5`.

### Data Tables & Lists
- **Header:** Height `36px`, background `#F8FAFC`, text `#64748B`, font size `11px`, weight `600`, uppercase letter spacing `0.05em`.
- **Row:** Height `44px` (standard) or `36px` (compact density mode). Border bottom `1px solid #F1F5F9`. Hover state `#F8FAFC`.
- **Numeric Alignment:** Right-aligned headers and cell contents with tabular numerals.

### Engineering-Specific Components
- **Deployment Status Track:** Multi-stage linear progress bar (`6px` height) with color tokens mapping to operational build phases (Green for passed, Red for failed, Indigo pulsing for active deploy).
- **Code/Commit Snippets:** Inline chips with background `#F1F5F9`, border `1px solid #E2E8F0`, font `code-md`, text `#0F172A`, copy-to-clipboard on hover.