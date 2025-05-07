export interface IThemeLanguage {
  theme: string
  language: string
  darkMode: boolean
}
export const defaultThemeLanguage: IThemeLanguage = {
  darkMode: false,
  theme: 'purple',
  language: 'vi',
}
