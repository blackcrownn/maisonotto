# MAISON OTTO Project Rules

## Tech Stack

* Next.js 14+ App Router
* TypeScript (strict mode)
* Tailwind CSS
* shadcn/ui
* Framer Motion
* Zustand for state management
* React Hook Form + Zod
* Lucide React Icons

## Architecture

* Prefer Server Components by default.
* Use Client Components only when interactivity is required.
* Keep components small and reusable.
* Avoid duplicated code.
* Extract reusable logic into hooks, lib, and utility functions.

## Code Quality

* Do not use `any`.
* Use proper TypeScript types and interfaces.
* No TODO placeholders.
* No dead code.
* Keep files focused on a single responsibility.

## UI & Design

* Follow a luxury fashion brand aesthetic.
* Minimal black and white design language.
* Large spacing and clean layouts.
* Avoid excessive shadows and colors.
* Premium and editorial feeling.
* Animations must be subtle and purposeful.

## Performance

* Use next/image for all images.
* Lazy load where appropriate.
* Avoid unnecessary client-side rendering.
* Prevent layout shifts (CLS).
* Optimize mobile performance.

## SEO

* Metadata required for every page.
* Use semantic HTML.
* Add Open Graph metadata.
* Use meaningful alt text.
* Implement JSON-LD on product pages.

## Accessibility

* Use aria-label when necessary.
* Support keyboard navigation.
* Use correct button and link semantics.

## Development Workflow

Before implementing large features:

1. Analyze the task.
2. Show implementation plan.
3. List files to create or modify.

After implementation:

1. Check imports.
2. Check TypeScript errors.
3. Check responsiveness.
4. Check accessibility.
5. Check build success.

Never leave unfinished functionality.
Always deliver working code.
