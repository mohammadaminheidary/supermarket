# Responsive layout review

Reference: [Digikala homepage](https://www.digikala.com/), inspected on 2026-10-12 at 1440 × 1000, 1024 × 900, and 390 × 844 CSS pixels. Measurements describe that day's homepage; campaign content changes over time. The mobile promotion overlay was dismissed before assessing the layout.

## Observed proportions

| Element | Desktop reference | Mobile reference | Applied to this project |
| --- | --- | --- | --- |
| Main header | 68px search/brand row; 40px navigation row | 44px search surface; address below | Content-sized brand/search bar: 92px desktop / 80px mobile before scrolling, approximately 66px / 64px afterward; 44px search controls |
| Header persistence | Fixed desktop header | Compact phone header | Contact topbar scrolls away; centered search/store bar contracts at the top; separate five-item navigation floats near the bottom on every screen size |
| Hero banner | 400px tall at both inspected desktop widths | 180px tall | 400px desktop, constrained to the same 1296px content column as the other sections; 180px below 1024px; existing imagery and copy retained |
| Main content | Approximately 1296px maximum width | Approximately 16px side gutters | Shared 1296px content token; 16px gutters, 12px on phones at or below 370px |
| Category shortcuts | 52px images, labels below | 52px images, horizontal row | Existing SVG icons inside 52px circles; categories follow the hero |
| Offer product tracks | 164px wide, 4px gaps | 130px wide, 4px gaps | 180px desktop / 156px mobile tracks, widened to fit purchase labels on one line; 4px gaps shared by offers, bundles, bestsellers, and catalog |
| Reference offer card | 280px high, 164px image | 228px high, 114px image | Automatic card height; 148px desktop photo region and 108px mobile photo region |
| Product title | 14px with approximately 25px line height | 12px with approximately 22px line height | 14px / 12px titles using the existing Vazir family and 1.8 line-height |
| Shopping-section spacing | Compact, approximately 16px between major sections | Compact vertical rhythm | Shared 16px section spacing |
| Secondary banners | Shallow landscape compositions | Compact mobile artwork | Two desktop banners at 4:1.5 proportions; existing mobile carousel retained |

The desktop/mobile transition is 1024px. Carousel activation and footer accordion behavior use the same breakpoint as their CSS.

## Adaptations to preserve the existing site

Brand colors, section backgrounds, glass effects, fonts, product photographs, visible copy, image alternative text, and controls remain local. No reference assets, products, branding, or commerce services were added.

Product cards retain additional descriptions, stock labels, quality notes, and purchase controls. Their height grows with that content rather than being forced into the reference's shorter 280px/228px cards. At 1440px, the offer row measures approximately 426px per card; at 390px, approximately 285px. Mobile cards are approximately 18% shorter than the previous 348px version through reduced padding, text-slot minimum heights, and spacing; text size and 44px purchase hit areas remain readable and usable. The desktop photo region keeps an inset instead of using edge-to-edge photography.

The wider mobile cards accommodate quantity labels in two readable lines between the two 44 × 44px buttons. The quantity group is 46px tall, so selecting a product no longer adds a separate label row. Existing mobile-hidden campaign descriptions and product metadata remain hidden at the mobile breakpoint; their content remains in the document.

The existing main page heading, carousel navigation, countdown, and section notes remain present (the hero pause control is desktop-only), so section heights and the first product row's vertical position differ from the reference. Their space was reduced where practical without removing content or controls. The short-landscape rule that previously reduced product images to 40px was removed.

The final request separates the two navigation areas. The contact topbar stays in normal document flow. The sticky brand/search bar uses `width: fit-content`, content-sized brand columns, and a bounded search column instead of stretching across the main content container. It is centered at every width. Desktop width is approximately 670px initially and 590px after scrolling; tablet widths are approximately 460px and 420px. Phones use the available width inside the existing gutters. The search column changes from a maximum of 480px to 400px on desktop and 360px to 320px on compact layouts. Store name and search remain vertically aligned.

The top shell reserves 92px on desktop or 80px below 1024px, so its contraction to approximately 66px / 64px does not move content. Safe-area-aware top spacing and document scroll padding keep anchor targets clear. Glass backgrounds, desktop-only Supermarket labels, and reduced-motion behavior remain.

The five-item navigation is outside the sticky header and fixed near the viewport bottom. It is at most 640px wide on desktop or 560px on mobile/tablet, with a 20px / 12px bottom margin plus the safe area. Its 58px height, rounded glass surface, readable ink, active lens, and existing selection feedback remain. The body and scroll padding reserve 100px / 88px plus the safe area, keeping the final footer text and focused controls clear of the navigation.

Best-Selling now contains 8 unique products, with the existing local quantity and favorite hooks. All Products contains 16 products across 7 categories, using existing assets and family variants. Both rails overflow horizontally even at the 1296px maximum content width. The shared 180px / 156px tracks, 4px gaps, smooth scrolling, keyboard controls, native touch scrolling, and mouse-drag module are reused. All original product-card markup is preserved; the new entries use the same recipe. Section counts were updated to match the displayed content.

The “Supermarket” category label and brand prefix are desktop-only; the category keeps its accessible name on mobile. The catalog ends with a brand-red button spanning grid rows `1 / span 2`. It exactly matches the top and bottom of the two product rows, including their gap, without hardcoding its height. Its label is centered in both axes. Per the user's clarification, it has hover, focus, and pressed feedback but no navigation or application action.

The hero's pause control and adjacent divider are hidden below 1024px. Autoplay continues; a desktop pause is reset when entering mobile, while reduced-motion and existing temporary focus/visibility pauses remain respected. Desktop pause/play and other carousels remain available.

## Verification

- Built the generated Tailwind stylesheet with the existing build script.
- Checked 320 × 720, 360 × 800, 390 × 844, 680 × 900, 768 × 1024, 900 × 900, 1023 × 900, 1024 × 900, 1280 × 900, 1440 × 1000, 1920 × 1080, and 844 × 390 layouts.
- No page-level horizontal overflow or product information overflow was observed in that viewport matrix.
- Checked mobile and desktop screenshots, banner composition, product imagery, and lower shopping sections.
- Verified that product images load.
- Exercised hero next/previous controls, product-row navigation, return-to-top links, navigation selection, bestseller add/increase/decrease controls, and mobile footer expansion.
- Verified every product purchase label fits on one line, without overflow, at all twelve viewport sizes.
- Verified the first banner matches both edges of other sections at every width and stops at 1296px on large desktops.
- Verified expanded and scrolled header states at all twelve sizes; the document position of the hero stays identical during contraction.
- Verified centered content-sized header bounds, vertical search/name alignment, no header overflow, navigation targets of at least 44px, and the topbar scrolling out of view.
- Verified that the bottom navigation stays fixed with the correct margin and sufficient reserved document space at all twelve sizes.
- Verified both expanded product rails overflow horizontally at all twelve sizes, retain their existing track widths, and reach their ends with keyboard navigation.
- Verified the view-all button remains the final column and matches both product rows exactly at all twelve sizes.
- Verified mouse click and Enter activation leave the URL unchanged; horizontal End navigation reaches the final column.
- Verified keyboard focus and the view-all label remain between the floating bars.
- Verified the final footer note ends above the bottom navigation on mobile and desktop.
- Verified mobile footer expansion and that the products anchor heading appears below the compact header.
- Observed mobile hero autoplay advancing after 6.8 seconds; exercised next/previous buttons and desktop pause/resume toggles.
- Verified the hero pause control and Supermarket labels appear only at desktop widths.
- Verified navigation selection and active-lens alignment, quantities and favorites on existing and added bestseller cards, and no browser warnings/errors.
- Verified mobile quantity button sizes, readable two-line quantity labels, and the compact 46px quantity group.
- Checked JavaScript syntax and Git whitespace errors.
- Compared page text, image sources/alt text, and controls against the previous version; original cards, banners, bundles, and footer markup were preserved; only new product entries, related counts, and navigation placement/sizing changed in the final pass. IDs and heading references remain unique and valid.

Changes are presentation-focused. Existing behaviors remain; no new search, filtering, backend, authentication, or checkout behavior was implemented.
