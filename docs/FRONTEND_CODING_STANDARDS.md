## UI Design Principles — Avoid Repetitive Card-Based Layouts

### 1. Avoid Excessive Card Usage

- Do not place every section, content block, or element inside a separate card.
- Avoid repetitive layouts where the entire page consists of identical cards arranged in grids.
- Do not use cards as the default container for every component.
- Avoid unnecessary nested cards, bordered boxes, and excessive rounded containers.
- Do not repeat the same visual structure across sections when the content and purpose are different.
- Use card components only when they serve a clear functional or visual purpose.

### 2. Create Visual Variety

Use a balanced combination of layout patterns appropriate to the content, such as:

- Full-width content sections
- Open layouts without enclosing borders
- Strong typographic hierarchy
- Asymmetric and balanced grid layouts
- Split-screen and side-by-side compositions
- Editorial-style content arrangements
- Dividers and subtle background transitions
- Integrated image-and-text layouts
- Carefully spaced lists and grouped content
- Floating or overlapping elements when consistent with the established design

These patterns are examples, not mandatory components. Select the most suitable layout for each section instead of forcing every pattern into the page.

### 3. Give Each Section a Distinct Identity

- Design each section according to its purpose and content.
- Vary section composition where appropriate while maintaining a consistent design language.
- Use spacing, typography, alignment, backgrounds, and visual hierarchy to distinguish content groups.
- Avoid repeating identical section headers, grids, containers, and decorative elements throughout the page.
- Do not sacrifice consistency in an attempt to create variety; all sections must still feel like parts of the same product.

### 4. Preserve the Existing UI Design System

- Follow the project's existing UI design specification and designated HTML reference files.
- Reuse established colors, typography, spacing, and component styles.
- Extend existing patterns intelligently rather than copying the same layout everywhere.
- If the reference design uses cards for specific components, preserve those cards where appropriate.
- Do not redesign existing reference components without explicit permission.

### 5. Design Before Implementing

Before building a page or section:

1. Understand the purpose and hierarchy of its content.
2. Review the existing UI design specification and reference components.
3. Choose a layout that fits the content instead of defaulting to a card grid.
4. Identify opportunities for visual variety without introducing unnecessary decoration.
5. Implement the layout using the project's existing HTML and Tailwind CSS setup.

### 6. Final Visual Review

Before completing the implementation, review the entire page and ask:

- Does every section rely on the same card-based layout?
- Are there unnecessary containers, borders, shadows, or rounded boxes?
- Do different content types have appropriate and distinct layouts?
- Is whitespace used effectively to establish hierarchy?
- Does the page feel cohesive without looking repetitive?
- Does the result follow the existing UI specification and reference design?

If the page feels like a collection of repetitive cards, revise the layout before finishing.

**Core principle: Use cards intentionally, not universally. Create visual variety through layout, typography, spacing, and composition while preserving the established design system.**