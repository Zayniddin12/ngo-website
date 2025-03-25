const timeouts: Record<string, any> = {}

const cTimeout = (key = 'key') => {
  if (timeouts[key]) {
    clearTimeout(timeouts[key])
    timeouts[key] = undefined
  }
}

export const moneyMask = {
  mask: [
    '0',
    '##',
    '###',
    '# ###',
    '## ###',
    '### ###',
    '# ### ###',
    '## ### ###',
    '### ### ###',
    '# ### ### ###',
  ],
  tokens: {
    D: {
      pattern: /[1-9]/,
    },
  },
}
export const debounce = (key = 'key', fn = () => {}, timeout = 500) => {
  const sTimeout = (key: string, fn: any, timeout: number) => {
    cTimeout(key)

    timeouts[key] = setTimeout(() => {
      try {
        fn()
      } catch (e) {}

      timeouts[key] = undefined
    }, timeout)
  }

  return sTimeout(key, fn, timeout)
}

export const share = (network: string, title: string, link?: string) => {
  if (process.client) {
    switch (network) {
      case 'telegram':
        window.open(
          `https://t.me/share/url?url=${
            link ? `${window.location.href}${link}` : window.location.href
          }&text=${title}`,
          '_blank'
        )
        break
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?text=${title}\n+${
            link ? `${window.location.href}${link}` : window.location.href
          }`,
          '_blank'
        )
        break
      case 'facebook':
        window.open(
          `https://www.facebook.com/sharer/sharer.php?t=${title}\n${
            link ? `${window.location.href}${link}` : window.location.href
          }`,
          '_blank'
        )
        break
      case 'whatsapp':
        window.open(`https://api.whatsapp.com/send?text=${title}`, '_blank')
        break
      case 'instagram':
        window.open(`https://www.instagram.com/`, '_blank')
        break
    }
  }
}

export function formatCount(value: any) {
  if (typeof value === 'string') {
    value = parseInt(value, 10)
    if (isNaN(value)) {
      return 'Invalid input'
    }
  }

  if (value >= 1000000000) {
    return value % 1000000000 === 0
      ? `${value / 1000000000}mlrd`
      : `${(value / 1000000000).toFixed(1).replace(/\.0$/, '')}mlrd`
  } else if (value >= 1000000) {
    return value % 1000000 === 0
      ? `${value / 1000000}mln`
      : `${(value / 1000000).toFixed(1).replace(/\.0$/, '')}mln`
  } else if (value >= 1000) {
    return value % 1000 === 0
      ? `${value / 1000}k`
      : `${(value / 1000).toFixed(1).replace(/\.0$/, '')}k`
  } else {
    return value.toString()
  }
}

export function formatPhoneNumber(number: string) {
  const format = number
    ?.replace(/\D/g, '')
    .match(/(\d{0,3})(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/)
  return `+${format && format[1] ? format[1] : ''}
          ${format && format[2] ? format[2] : ''}
          ${format && format[3] ? format[3] : ''}
          ${format && format[4] ? format[4] : ''}
          ${format && format[5] ? format[5] : ''}`
}

export function getPercentage(value: number, total: number): string | number {
  const percentage = (value / total) * 100
  return percentage.toFixed(1)
}

export function formatMoneyDecimal(
  number: number,
  fix = 0,
  option = 'decimal'
) {
  let style: string
  if (['USD', 'RUB'].includes(option)) {
    style = 'currency'
  } else if (['kilogram', 'meter', 'percent'].includes(option)) {
    style = 'unit'
  } else {
    style = ''
  }

  const newStyle: string = style
  const option2 = {
    newStyle, //  unit currency percent decimal
    [newStyle]: option,
    maximumFractionDigits: fix,
    minimumFractionDigits: fix,
  }
  return number ? new Intl.NumberFormat('ru-RU', option2).format(number) : '0'
}

export function formatNumberSpace(number: number, fix = 0) {
  return new Intl.NumberFormat('uz-UZ', {
    minimumFractionDigits: fix,
  })
    .format(number)
    .replace(/,/g, ' ')
}

export function formatDateToValid(date: string) {
  const [day, month, year] = date.split('.')
  return new Date(`${month}/${day}/${year}`)
}

export const convertKBtoMB = (size: number): string => {
  if (size > 0) {
    const sizeInMb: number = size / 1024
    if (sizeInMb <= 1024) return sizeInMb.toFixed(1) + 'KB'
    else return (sizeInMb / 1024).toFixed(1) + 'MB'
  } else return ''
}

export function convertToEmbed(url: string) {
  // Match the video ID from the URL using a regular expression
  const regex =
    /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:youtu\.be\/|(?:youtube(?:-nocookie)?\.com\/(?:.*(?:\/|v=))|(?:youtube.googleapis.com\/v\/)))([^&?\s]{11})/i
  let match
  if (url?.length) {
    match = url.match(regex)
  }
  // @ts-ignore
  if (match?.length) {
    return match[1]
  }
}

export function formatPrice(value: number | undefined, locale = 'uz') {
  if (typeof value !== 'number') {
    console.error(value)
    return
  }

  const suffixes = {
    en: {
      thousand: 'thousand',
      million: 'mln',
      billion: 'mlrd',
    },
    ru: {
      thousand: 'тыс',
      million: 'млн',
      billion: 'млрд',
    },
    uz: {
      thousand: 'ming',
      million: 'mln',
      billion: 'mlrd',
    },
  }

  const thresholds = {
    thousand: 1e3,
    million: 1e6,
    billion: 1e9,
  }

  let formattedValue
  let suffix

  // Determine the appropriate suffix and format
  if (value >= thresholds.billion) {
    formattedValue = (value / thresholds.billion).toFixed(1)
    suffix =
      suffixes[locale as keyof typeof suffixes]?.billion || suffixes.en.billion
  } else if (value >= thresholds.million) {
    formattedValue = (value / thresholds.million).toFixed(1)
    suffix =
      suffixes[locale as keyof typeof suffixes]?.million || suffixes.en.million
  } else if (value >= thresholds.thousand) {
    formattedValue = (value / thresholds.thousand).toFixed(0)
    suffix =
      suffixes[locale as keyof typeof suffixes]?.thousand ||
      suffixes.en.thousand
  } else {
    formattedValue = value.toString()
    suffix = ''
  }

  // Format with space as a thousand separator
  formattedValue = formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

  return `${formattedValue} ${suffix}`.trim()
}

export function extractContent(s: string): string {
  return s.replace(/<[^>]+>/g, '')
}

export function downloadFile(
  imageSrc: string,
  name: string,
  loadingCallback: (value: boolean) => void
) {
  loadingCallback(true)
  fetch(imageSrc)
    .then((res) => {
      return res.blob()
    })
    .then((res) => {
      const fileUrl = URL.createObjectURL(res)
      const link = document.createElement('a')
      link.href = fileUrl
      link.download = name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    })
    .finally(() => {
      loadingCallback(false)
    })
}
