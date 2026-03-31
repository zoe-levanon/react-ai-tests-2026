# Presentation Library

This app is now a folder-based presentation library built with React, Vite, and Material UI.

## Structure

- The home page lists every presentation inside `src/presentations`.
- Each presentation lives in its own folder.
- Every folder needs an `index.tsx` component file, a `meta.ts` metadata file, and a `slides.ts` file.

## Add A Presentation

1. Create a new folder under `src/presentations`.
2. Add `index.tsx`, `meta.ts`, and `slides.ts` files in that folder.
3. Export `presentationMeta` from `meta.ts`.
4. Export `presentationSlides` from `slides.ts`.
5. Export the presentation component from `index.tsx`.
6. Run `npm run dev`.

Example:

```tsx
// meta.ts
import type { PresentationMeta } from '../catalog'

export const presentationMeta: PresentationMeta = {
  title: 'Q2 Roadmap',
  description: 'Company priorities and release plan.',
  accent: '#a44d35',
  updatedAt: '2026-03-28',
  tags: ['Roadmap', 'Planning'],
}
```

```tsx
// slides.ts
import type { PresentationSlide } from '../catalog'

export const presentationSlides: PresentationSlide[] = [
  { id: 'intro', eyebrow: 'Slide 01', title: 'Q2 Roadmap' },
]
```

```tsx
// index.tsx
import type { PresentationComponentProps } from '../catalog'

export default function Q2RoadmapPresentation({ slide }: PresentationComponentProps) {
  return <div>{slide.title}</div>
}
```
