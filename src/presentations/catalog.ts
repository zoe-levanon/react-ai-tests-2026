import type { ComponentType } from 'react'

export type PresentationMeta = {
  title: string
  description: string
  accent: string
  updatedAt: string
  tags: string[]
}

export type PresentationSlide = {
  id: string
  eyebrow?: string
  title: string
}

export type PresentationComponentProps = {
  slide: PresentationSlide
  slideIndex: number
  slideCount: number
}

type PresentationComponentModule = {
  default: ComponentType<PresentationComponentProps>
}

type PresentationMetaModule = {
  presentationMeta: PresentationMeta
}

type PresentationSlidesModule = {
  presentationSlides: PresentationSlide[]
}

export type PresentationEntry = PresentationMeta & {
  slug: string
  folder: string
  path: string
  slides: PresentationSlide[]
  Component: ComponentType<PresentationComponentProps>
}

const presentationComponentModules = import.meta.glob<PresentationComponentModule>('./*/index.tsx', {
  eager: true,
})
const presentationMetaModules = import.meta.glob<PresentationMetaModule>('./*/meta.ts', { eager: true })
const presentationSlidesModules = import.meta.glob<PresentationSlidesModule>('./*/slides.ts', { eager: true })

function getSlugFromPath(path: string) {
  const match = path.match(/^\.\/([^/]+)\/index\.tsx$/)

  if (!match) {
    throw new Error(`Invalid presentation module path: ${path}`)
  }

  return match[1]
}

export const presentations = Object.entries(presentationComponentModules)
  .map(([path, componentModule]) => {
    const slug = getSlugFromPath(path)
    const metaModule = presentationMetaModules[`./${slug}/meta.ts`]
    const slidesModule = presentationSlidesModules[`./${slug}/slides.ts`]

    if (!metaModule) {
      throw new Error(`Missing presentation meta file for: ${slug}`)
    }

    if (!slidesModule) {
      throw new Error(`Missing presentation slides file for: ${slug}`)
    }

    return {
      ...metaModule.presentationMeta,
      slug,
      folder: `src/presentations/${slug}`,
      path: `/presentations/${slug}`,
      slides: slidesModule.presentationSlides,
      Component: componentModule.default,
    }
  })
  .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt))

export function getPresentationBySlug(slug: string) {
  return presentations.find((presentation) => presentation.slug === slug)
}
