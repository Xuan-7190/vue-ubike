export const svgIcons = {
  live: 'M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z',
  love: 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z',
  delete: 'M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm3.46-7.12l1.41 1.41L12 13.41l1.12 1.12 1.41-1.41L13.41 12l1.12-1.12-1.41-1.41L12 10.59l-1.12-1.12-1.41 1.41L10.59 12l-1.13 1.12z'
} as const

export type SvgIconName = keyof typeof svgIcons

export const getSvgIcon = (name: SvgIconName): string => {
  return svgIcons[name]
}
