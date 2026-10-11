# AGENTS.md — Frontend Development Instructions

## 1. Project Overview

This project follows a frontend-first development workflow focused on high-quality UI implementation, clean code, maintainability, and visual consistency.

The default goal is to create and refine the user interface. Do not implement backend services, APIs, databases, authentication systems, or real business logic unless explicitly requested.

All changes must respect the existing project structure and the documented design system.

## 2. Mandatory Documentation

Before implementing or modifying frontend UI, inspect and follow these files:

- `docs/UI_DESIGN_SPEC.md`
  - Defines the visual design system, layout principles, typography, colors, spacing, and UI composition rules.
- `docs/FRONTEND_CODING_STANDARDS.md`
  - Defines HTML, Tailwind CSS, JavaScript, modularity, accessibility, and code-quality standards.
- `references/reference.html`
  - Provides an existing HTML design reference. Inspect its structure, components, styling, and visual patterns before building related UI.

These documents are part of the project's requirements, not optional suggestions.

If a referenced file is missing, search the project for the correct file before proceeding. If multiple possible references exist and the correct one is unclear, ask for clarification rather than guessing.

Do not replace or rewrite the design documentation unless explicitly requested.

## 3. Default Operating Mode: UI First

Unless the user explicitly requests functional behavior, work on the presentation layer only.

Allowed by default:

- Creating and refining page layouts.
- Implementing responsive UI.
- Creating HTML structures and Tailwind CSS styling.
- Adding icons, images, typography, spacing, hover states, and visual transitions.
- Creating representative sample content for previews.
- Improving accessibility and semantic HTML.
- Creating reusable visual components when appropriate.

Not allowed by default:

- Connecting to APIs or external services.
- Implementing backend functionality.
- Adding database operations.
- Implementing authentication or authorization.
- Adding real payment processing.
- Implementing actual search, filtering, sorting, pagination, or data mutations.
- Introducing complex business logic.

UI controls may be displayed as part of the design, but they must remain nonfunctional unless the user explicitly requests their behavior.

Do not interpret the presence of a button, input, search field, tab, dropdown, filter, or form as permission to implement its functionality.

When functionality is requested, implement only the specified behavior and avoid unrelated changes.

## 4. HTML, Tailwind CSS, and JavaScript

### HTML

- Use semantic, accessible HTML.
- Keep markup readable and logically structured.
- Reuse the project's existing HTML structure where practical.
- Avoid unnecessary wrapper elements.
- Do not convert the project to a different framework without explicit approval.

### Tailwind CSS

- Use Tailwind CSS for styling, following the project's installed version and existing configuration.
- Inspect the current setup before changing build commands, configuration, dependencies, or CSS entry points.
- Prefer readable utility combinations and consistent design tokens.
- Avoid introducing a second styling system without a clear need.
- Do not replace existing project configuration merely to simplify implementation.

### JavaScript

- Keep JavaScript modular and separate from HTML whenever practical.
- Use ES modules when supported by the project's current setup.
- Separate responsibilities into appropriately named modules.
- Avoid monolithic JavaScript files.
- Do not add JavaScript for controls that only need to appear visually.
- Add event handlers only when the requested behavior requires them.
- Avoid unnecessary dependencies and global variables.
- Do not introduce a framework or bundler without explicit approval.

Follow the existing project architecture rather than forcing a new architecture onto it.

## 5. Mandatory Design Principle: Avoid Repetitive Card-Based UI

Do not default to card-based layouts for every section.

Excessive, repetitive, or unnecessary cards are considered a design quality problem.

Avoid:

- Placing every section inside a separate card.
- Repeating identical card grids throughout a page.
- Using cards for all headings, descriptions, statistics, features, and content blocks.
- Nesting cards inside other cards without a clear reason.
- Adding unnecessary borders, shadows, backgrounds, and rounded containers.
- Using the same visual composition for sections with different purposes.

Instead, select the layout according to the content and its purpose. Consider:

- Open and full-width layouts.
- Typography-led sections.
- Editorial and asymmetric compositions.
- Split layouts combining text and imagery.
- Structured lists and comparison layouts.
- Subtle dividers and background transitions.
- Generous whitespace and clear visual hierarchy.
- Purposeful grids and overlapping elements where appropriate.

Cards are allowed when they provide a clear benefit, such as grouping related information, displaying individual projects or products, or presenting independent items that users need to compare.

The objective is not to eliminate cards. The objective is to avoid monotonous, repetitive layouts and make each section visually appropriate.

Maintain consistency across the site while giving different sections distinct visual compositions.

## 6. Existing HTML Reference

Before creating new components related to an existing design, inspect `references/reference.html`.

Use it to understand:

- Existing component structure.
- Spacing and proportions.
- Typography and visual hierarchy.
- Color usage.
- Borders, shadows, and radii.
- Image placement and cropping.
- Responsive behavior.
- Component states and visual details.

Preserve the established design language when creating related components.

Do not blindly copy every section's layout. Use the reference as a visual foundation while adapting the composition to the content and avoiding repetitive card-based design.

Do not remove, replace, or substantially redesign existing reference components unless explicitly requested.

## 7. Project Structure and File Safety

- Inspect the existing folder and file structure before making changes.
- Preserve existing files and their responsibilities.
- Do not delete, rename, move, or overwrite unrelated files.
- Do not reorganize the entire project for a small UI task.
- Do not replace working implementations without a clear reason.
- Make the smallest set of changes that fully satisfies the request.
- Reuse existing assets, utilities, components, and dependencies where appropriate.
- Do not create duplicate components or duplicate styles unnecessarily.
- Do not modify unrelated pages or modules.

If a structural change is necessary, explain why and keep its scope minimal.

## 8. Responsive Design

All new UI should be responsive unless the user explicitly requests a fixed viewport or a different constraint.

Consider:

- Desktop layouts.
- Tablet layouts.
- Mobile layouts.
- Text wrapping and content overflow.
- Image scaling and cropping.
- Navigation behavior.
- Grid and column transitions.
- Touch-friendly interaction areas.

Do not merely shrink desktop layouts. Adapt spacing, hierarchy, and composition to the available viewport.

Follow the project's existing breakpoints and responsive conventions whenever possible.

## 9. Interaction and Animation

By default, implement visual states only.

Examples include:

- Hover styling.
- Focus styling.
- Active and disabled appearance.
- Loading-state previews.
- Transitions and subtle animations.

Do not connect these states to real data or implement actual application behavior unless requested.

Animations should support hierarchy and usability rather than distract from content.

Respect reduced-motion preferences where relevant.

## 10. Accessibility and Quality

- Use semantic HTML elements.
- Maintain readable contrast.
- Provide accessible names for interactive controls.
- Use appropriate image alternative text.
- Ensure keyboard focus remains visible.
- Avoid relying on color alone to communicate meaning.
- Maintain a logical heading hierarchy.
- Avoid unnecessary motion and visual clutter.

Do not sacrifice accessibility for visual appearance.

## 11. Implementation Workflow

For each task:

1. Read the user's request carefully.
2. Inspect the relevant files and existing project structure.
3. Read the mandatory documentation relevant to the task.
4. Identify the specific files that need changes.
5. Determine the intended layout and visual hierarchy before coding.
6. Implement the smallest appropriate change.
7. Follow the design specification and coding standards.
8. Check for repetitive cards, unnecessary containers, and inconsistent styling.
9. Review responsive behavior and accessibility.
10. Inspect the final diff and verify that unrelated files remain unchanged.
11. Run appropriate checks when available and relevant.
12. Report what changed, what was verified, and any remaining limitations.

Do not claim that a test, build, or visual inspection was completed unless it was actually performed.

## 12. Scope and Clarification

- Follow the user's latest explicit instructions when they refine the task.
- Do not invent additional requirements.
- Do not implement unspecified features merely because they seem useful.
- Ask a concise clarification question when an essential requirement is ambiguous.
- If the task is sufficiently clear, proceed without unnecessary questions.
- Do not make broad architectural decisions without a clear need.

## 13. Final Response

After completing a task, briefly report:

- What was implemented.
- Which files were changed.
- Whether functionality was intentionally left visual-only.
- Which checks were actually performed.
- Any important issues or follow-up work.

Keep the report concise, accurate, and specific.

## 14. Core Principles

1. Read the documentation before coding.
2. UI first; functionality only when explicitly requested.
3. HTML and Tailwind CSS follow the existing project setup.
4. JavaScript remains modular.
5. Avoid repetitive card-based layouts.
6. Treat the HTML reference as a source of visual guidance.
7. Preserve the existing project structure and files.
8. Make focused, maintainable changes.
9. Verify the work instead of assuming it is correct.
