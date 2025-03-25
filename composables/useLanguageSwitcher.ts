import { useI18n } from 'vue-i18n'

export const useLanguageSwitcher = () => {
  const { locale } = useI18n()

  const languagesList = [
    {
      name: "O'zbekcha",
      code: 'uz',
      flag: '/svg/uz-flag.svg',
    },
    {
      name: 'English',
      code: 'en',
      flag: '/svg/en-flag.svg',
    },
    {
      name: 'Русский',
      code: 'ru',
      flag: '/svg/ru-flag.svg',
    },
  ]

  const currentLanguage = computed(() =>
    languagesList.find((lang) => lang.code === locale.value)
  )

  function changeLocale(_locale: string) {
    useCookie('locale').value = _locale
    locale.value = _locale
  }

  return { currentLanguage, languagesList, changeLocale }
}
