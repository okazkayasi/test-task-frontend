import { Country } from 'utils/types'

export const BASE_URL = 'http://localhost:8000'
export const FRONTEND_BASE_URL = 'http://localhost:3000'
export const BAR_WIDTH = 70
export const SPACE_BETWEEN_BARS = 30
export const COLORS = {
  hotdog: '#4682b4',
  burger: '#697fc4',
  sandwich: '#9876c6',
  kebab: '#c667b8',
  fries: '#ea589a',
  donut: '#ff5370',
}
export const BAR_CHART_HEIGHT = 400
export const BAR_CHART_WIDTH = 600
export const PADDING_BELOW = 50
export const PADDING_LEFT = 50
export const TOTAL_SVG_HEIGHT = BAR_CHART_HEIGHT + PADDING_BELOW
export const TOTAL_SVG_WIDTH = BAR_CHART_WIDTH + PADDING_LEFT
export const FOODS = ['hotdog', 'burger', 'sandwich', 'kebab', 'fries', 'donut'] as const
export const COUNTRIES = ['FR', 'GB', 'BE', 'DE', 'ES', 'IT'] as const
export const COUNTRIES_RECORD: Record<Country, string> = {
  FR: 'France',
  GB: 'Great Britain',
  BE: 'Belgium',
  DE: 'Germany',
  ES: 'Spain',
  IT: 'Italy',
}
