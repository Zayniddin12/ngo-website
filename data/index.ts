import type { ICompany, IOrganization, IProjectNumbers } from '~/types'

export const breadcrumbs = [
  {
    title: 'Playground',
    link: '/playground',
  },
]

export const breadcrumbsForSupportWomen = [
  {
    title: 'Поддержка женщин',
    link: '/support-women',
  },
]

export const breadcrumbsForStatistics = [
  {
    title: 'Статистика',
    link: '/statistics',
  },
]

export const breadcrumbsForProjects = (
  title?: string | undefined,
  link?: string | undefined
) => {
  return [
    {
      title,
      link,
    },
  ]
}

export const routerBtnData = [
  {
    title: 'projects',
    link: '/projects',
    icon: 'bulb',
  },
  {
    title: 'residents',
    link: '/residents',
    icon: 'teamwork',
  },
  {
    title: 'support_women',
    link: '/support-women',
    icon: 'heart',
  },
]

export const tabList = [
  {
    label: 'Tab 1',
    value: 'tab1',
  },
  {
    label: 'Tab 2',
    value: '/tab2',
  },
]

export const logos = [
  '/logos/uic.svg',
  '/logos/ezgu.svg',
  '/logos/imkon.svg',
  '/logos/mahalla.svg',
  '/logos/mehrli.svg',
  '/logos/ona.svg',
  '/logos/saxovat.svg',
  '/logos/uic.svg',
  '/logos/ezgu.svg',
  '/logos/imkon.svg',
  '/logos/mahalla.svg',
  '/logos/mehrli.svg',
  '/logos/ona.svg',
  '/logos/saxovat.svg',
  '/logos/uic.svg',
  '/logos/ezgu.svg',
  '/logos/imkon.svg',
  '/logos/mahalla.svg',
  '/logos/mehrli.svg',
  '/logos/ona.svg',
  '/logos/saxovat.svg',
]
export const partnersLogos = [
  '/svg/yoshlarLogo.svg',
  '/svg/sharhLogo.svg',
  '/svg/yoshlarLogo.svg',
  '/svg/sharhLogo.svg',
  '/svg/yoshlarLogo.svg',
  '/svg/sharhLogo.svg',
  '/svg/yoshlarLogo.svg',
  '/svg/yoshlarLogo.svg',
  '/svg/sharhLogo.svg',
  '/svg/yoshlarLogo.svg',
  '/svg/sharhLogo.svg',
  '/svg/yoshlarLogo.svg',
  '/svg/yoshlarLogo.svg',
  '/svg/sharhLogo.svg',
  '/svg/yoshlarLogo.svg',
  '/svg/sharhLogo.svg',
  '/svg/yoshlarLogo.svg',
  '/svg/yoshlarLogo.svg',
  '/svg/sharhLogo.svg',
  '/svg/yoshlarLogo.svg',
  '/svg/sharhLogo.svg',
  '/svg/yoshlarLogo.svg',
  '/svg/sharhLogo.svg',
  '/svg/yoshlarLogo.svg',
]

export const searchItems = [
  {
    title: 'Playground',
    description: 'Playground three description description description',
    image: 'https://picsum.photos/200/300',
  },
  {
    title: 'Playground two',
    description: 'Playground three description description description',
    image: 'https://picsum.photos/200/301',
  },
  {
    title: 'Playground three',
    description: 'Playground three description description description',
    image: 'https://picsum.photos/200/302',
  },
]

export const orgs: IOrganization[] = [
  {
    name: 'Organization 1',
    image: 'https://picsum.photos/200',
    address: 'New York, 34 Avenue',
    projectCount: 23,
    id: 1,
  },
  {
    name: 'Organization 2',
    image: 'https://picsum.photos/201',
    address: 'New York, 34 Avenue',
    projectCount: 13,
    id: 2,
  },
  {
    name: 'Organization 3',
    image: 'https://picsum.photos/202',
    address: 'New York, 34 Avenue',
    projectCount: 345,
    id: 3,
  },
  {
    name: 'Organization 4',
    image: 'https://picsum.photos/205',
    address: 'New York, 34 Avenue',
    projectCount: 341,
    id: 4,
  },
]

export const servicesCards = [
  {
    title: 'Поддержка социальных проектов',
    short_description:
      'Мы окажем вам квалифицированную поддержку и консультации, помогая вам воплотить Вашу идею в жизнь.',
    id: 2,
    sum: 1000,
  },
  {
    title: 'Поддержка социальных проектов',
    short_description:
      'Мы окажем вам квалифицированную поддержку и консультации, помогая вам воплотить Вашу идею в жизнь.',
    id: 2,
    sum: 1000,
  },
  {
    title: 'Поддержка социальных проектов',
    short_description:
      'Мы окажем вам квалифицированную поддержку и консультации, помогая вам воплотить Вашу идею в жизнь.',
    id: 2,
    sum: 1000,
  },
  {
    title: 'Поддержка социальных проектов',
    short_description:
      'Мы окажем вам квалифицированную поддержку и консультации, помогая вам воплотить Вашу идею в жизнь.',
    id: 2,
    sum: 1000,
  },
  {
    title: 'Поддержка социальных проектов',
    short_description:
      'Мы окажем вам квалифицированную поддержку и консультации, помогая вам воплотить Вашу идею в жизнь.',
    id: 2,
    sum: 1000,
  },
  {
    title: 'Поддержка социальных проектов',
    short_description:
      'Мы окажем вам квалифицированную поддержку и консультации, помогая вам воплотить Вашу идею в жизнь.',
    id: 2,
    sum: 1000,
  },
  {
    title: 'Поддержка социальных проектов',
    short_description:
      'Мы окажем вам квалифицированную поддержку и консультации, помогая вам воплотить Вашу идею в жизнь.',
    id: 2,
    sum: 1000,
  },
  {
    title: 'Поддержка социальных проектов',
    short_description:
      'Мы окажем вам квалифицированную поддержку и консультации, помогая вам воплотить Вашу идею в жизнь.',
    id: 2,
    sum: 1000,
  },
  {
    title: 'Поддержка социальных проектов',
    short_description:
      'Мы окажем вам квалифицированную поддержку и консультации, помогая вам воплотить Вашу идею в жизнь.',
    id: 2,
    sum: 1000,
  },
  {
    title: 'Поддержка социальных проектов',
    short_description:
      'Мы окажем вам квалифицированную поддержку и консультации, помогая вам воплотить Вашу идею в жизнь.',
    id: 6,
    sum: 1000,
  },
  {
    title: 'Поддержка социальных проектов',
    short_description:
      'Мы окажем вам квалифицированную поддержку и консультации, помогая вам воплотить Вашу идею в жизнь.',
    id: 7,
    sum: 1000,
  },
  {
    title: 'Поддержка социальных проектов',
    short_description:
      'Мы окажем вам квалифицированную поддержку и консультации, помогая вам воплотить Вашу идею в жизнь.',
    id: 8,
    sum: 1000,
  },
]
export const SubsideCards = [
  {
    title: 'Поддержка социальных проектов',
    short_description:
      'Мы окажем вам квалифицированную поддержку и консультации, помогая вам воплотить Вашу идею в жизнь.',
    id: 2,
    sum: 1000,
  },
  {
    title: 'Поддержка социальных проектов Subside',
    short_description:
      'Мы окажем вам квалифицированную поддержку и консультации, помогая вам воплотить Вашу идею в жизнь.',
    id: 2,
    sum: 1000,
  },
  {
    title: 'Поддержка социальных проектов',
    short_description:
      'Мы окажем вам квалифицированную поддержку и консультации, помогая вам воплотить Вашу идею в жизнь.',
    id: 2,
    sum: 1000,
  },
  {
    title: 'Поддержка социальных проектов',
    short_description:
      'Мы окажем вам квалифицированную поддержку и консультации, помогая вам воплотить Вашу идею в жизнь.',
    id: 2,
    sum: 1000,
  },
  {
    title: 'Поддержка социальных проектов',
    short_description:
      'Мы окажем вам квалифицированную поддержку и консультации, помогая вам воплотить Вашу идею в жизнь.',
    id: 2,
    sum: 1000,
  },
  {
    title: 'Поддержка социальных проектов Subside',
    short_description:
      'Мы окажем вам квалифицированную поддержку и консультации, помогая вам воплотить Вашу идею в жизнь.',
    id: 6,
    sum: 1000,
  },
  {
    title: 'Поддержка социальных проектов Subside',
    short_description:
      'Мы окажем вам квалифицированную поддержку и консультации, помогая вам воплотить Вашу идею в жизнь.',
    id: 7,
    sum: 1000,
  },
  {
    title: 'Поддержка социальных проектов Subside',
    short_description:
      'Мы окажем вам квалифицированную поддержку и консультации, помогая вам воплотить Вашу идею в жизнь.',
    id: 8,
    sum: 1000,
  },
]
export const GrandsDescription = {
  title: 'Гранты',
  short_description:
    'Добро пожаловать на гранты и субсидии, объявленные фондом при Олий Мажлисе. Получите шанс получить грант или субсидию, подав заявку',
}
export const SubsideDescription = {
  title: 'Subside',
  short_description:
    'Добро Subside на гранты и субсидии, объявленные фондом при Олий Мажлисе. Получите шанс получить грант или субсидию, подав заявку',
}
export const users: any[] = [
  {
    created_at: new Date(),
    user: {
      id: 1,
      full_name: 'UIC Group',
      avatar: 'https://picsum.photos/201',
    },
  },
  {
    created_at: new Date(),
    user: {
      id: 2,
      full_name: 'UIC Group',
      avatar: 'https://picsum.photos/200',
    },
  },
  {
    created_at: new Date(),
    user: {
      id: 3,
      full_name: 'UIC Group',
      avatar: 'https://picsum.photos/202',
    },
  },
  {
    created_at: new Date(),
    user: {
      id: 1,
      full_name: 'UIC Group',
      avatar: 'https://picsum.photos/204',
    },
  },
  {
    created_at: new Date(),
    user: {
      id: 2,
      full_name: 'UIC Group',
      avatar: 'https://picsum.photos/204',
    },
  },
  {
    created_at: new Date(),
    user: {
      id: 3,
      full_name: 'UIC Group',
      avatar: 'https://picsum.photos/205',
    },
  },
  {
    created_at: new Date(),
    user: {
      id: 1,
      full_name: 'UIC Group',
      avatar: 'https://picsum.photos/201',
    },
  },
  {
    created_at: new Date(),
    user: {
      id: 2,
      full_name: 'UIC Group',
      avatar: 'https://picsum.photos/200',
    },
  },
  {
    created_at: new Date(),
    user: {
      id: 3,
      full_name: 'UIC Group',
      avatar: 'https://picsum.photos/202',
    },
  },
  {
    created_at: new Date(),
    user: {
      id: 1,
      full_name: 'UIC Group',
      avatar: 'https://picsum.photos/201',
    },
  },
  {
    created_at: new Date(),
    user: {
      id: 2,
      full_name: 'UIC Group',
      avatar: 'https://picsum.photos/200',
    },
  },
  {
    created_at: new Date(),
    user: {
      id: 3,
      full_name: 'UIC Group',
      avatar: 'https://picsum.photos/202',
    },
  },
  {
    created_at: new Date(),
    user: {
      id: 1,
      full_name: 'UIC Group',
      avatar: 'https://picsum.photos/201',
    },
  },
  {
    created_at: new Date(),
    user: {
      id: 2,
      full_name: 'UIC Group',
      avatar: 'https://picsum.photos/200',
    },
  },
  {
    created_at: new Date(),
    user: {
      id: 3,
      full_name: 'UIC Group',
      avatar: 'https://picsum.photos/202',
    },
  },
]

export const events = [
  {
    title: 'Национальный фестиваль кукол',
    subtitle:
      'Добро пожаловать на гранты и субсидии, объявленные фондом при Олий Мажлисе. Получите шанс получить грант или субсидию, подав заявку',
    date: new Date(),
    address: 'Улица Адхама Рахмата 15, г. Ташкент, Узбекистан',
    image: 'https://picsum.photos/1181/500',
    link: '/',
    users,
  },
  {
    title: 'Национальный фестиваль кукол',
    subtitle:
      'Добро пожаловать на гранты и субсидии, объявленные фондом при Олий Мажлисе. Получите шанс получить грант или субсидию, подав заявку',
    date: new Date(),
    address: 'Улица Адхама Рахмата 15, г. Ташкент, Узбекистан',
    image: 'https://picsum.photos/1182/500',
    link: '/',
    users,
  },
  {
    title: 'Национальный фестиваль кукол',
    subtitle:
      'Добро пожаловать на гранты и субсидии, объявленные фондом при Олий Мажлисе. Получите шанс получить грант или субсидию, подав заявку',
    date: new Date(),
    address: 'Улица Адхама Рахмата 15, г. Ташкент, Узбекистан',
    image: 'https://picsum.photos/1184/500',
    link: '/',
    users,
  },
  {
    title: 'Национальный фестиваль кукол',
    subtitle:
      'Добро пожаловать на гранты и субсидии, объявленные фондом при Олий Мажлисе. Получите шанс получить грант или субсидию, подав заявку',
    date: new Date(),
    address: 'Улица Адхама Рахмата 15, г. Ташкент, Узбекистан',
    image: 'https://picsum.photos/1183/500',
    link: '/',
    users,
  },
]

export const projects: IProjectNumbers[] = [
  {
    title: 'support.women',
    quantity: 64,
  },
  {
    title: 'support.contract',
    quantity: 322,
  },
  {
    title: 'support.starter',
    quantity: 100,
  },
  {
    title: 'support.psychological',
    quantity: 234,
  },
  {
    title: 'support.credit',
    quantity: 230,
  },
]

export const projectCards = [
  {
    title: 'Развитие детских игровых площадок в городских парках',
    description:
      'Постановление Кабинета Министров Республики Узбекистан от 5 сентября 2023 года «Поддержка некоторых социально нуждающихся категорий населения»',
    status: 'accepted',
    price: 7000000,
    from: new Date(),
    to: new Date(),
    image: 'https://picsum.photos/200',
    id: 1,
  },
  {
    title: 'Развитие детских игровых площадок в городских парках',
    description:
      'Постановление Кабинета Министров Республики Узбекистан от 5 сентября 2023 года «Поддержка некоторых социально нуждающихся категорий населения»',
    status: 'in_progress',
    price: 7000001,
    from: new Date(),
    to: new Date(),
    image: 'https://picsum.photos/201',
    id: 2,
  },
  {
    title: 'Развитие детских игровых площадок в городских парках',
    description:
      'Постановление Кабинета Министров Республики Узбекистан от 5 сентября 2023 года «Поддержка некоторых социально нуждающихся категорий населения»',
    status: 'cancelled',
    price: 7000002,
    from: new Date(),
    to: new Date(),
    image: 'https://picsum.photos/202',
    id: 3,
  },
  {
    title: 'Развитие детских игровых площадок в городских парках',
    description:
      'Постановление Кабинета Министров Республики Узбекистан от 5 сентября 2023 года «Поддержка некоторых социально нуждающихся категорий населения»',
    status: 'completed',
    price: 7000003,
    from: new Date(),
    to: new Date(),
    image: 'https://picsum.photos/203',
    id: 4,
  },
  {
    title: 'Развитие детских игровых площадок в городских парках',
    description:
      'Постановление Кабинета Министров Республики Узбекистан от 5 сентября 2023 года «Поддержка некоторых социально нуждающихся категорий населения»',
    status: 'unknown',
    price: 7000004,
    from: new Date(),
    to: new Date(),
    image: 'https://picsum.photos/204',
    id: 5,
  },
]

export const statistics = [
  {
    icon: 'files',
    title: 'Документы',
    count: 123,
    percentage: '+12%',
  },
  {
    icon: 'files',
    title: 'Документы',
    count: 1234567,
    percentage: '-16%',
  },
  {
    icon: 'files',
    title: 'Документы',
    count: 123654789,
    percentage: '+12%',
  },
  {
    icon: 'files',
    title: 'Документы',
    count: 123546,
    percentage: '-12%',
  },
  {
    icon: 'files',
    title: 'Документы',
    count: 1235467543,
    percentage: '+12%',
  },
  {
    icon: 'files',
    title: 'Документы',
    count: 1235647,
    percentage: '+1%',
  },
  {
    icon: 'files',
    title: 'Документы',
    count: 5235647,
    percentage: '+1%',
  },
  {
    icon: 'files',
    title: 'Документы',
    count: 7235647,
    percentage: '+1%',
  },
]

export const category = ref([
  { title: 'Категория', category: 'IT-сфера', id: 1 },
  { title: 'Дата окончания срока', category: '07.05.2024', id: 2 },
])

export const ourTeam = [
  {
    image: 'https://picsum.photos/1184/500',
    role: 'Глава отдела разработки',
    name: 'Пулатов Жасурбек Мухсинович',
    id: 1,
    socials: [
      {
        icon: 'telegram',
        link: 'https://t.me/zhassurbek',
      },
      {
        icon: 'instagram',
        link: 'https://instagram.com/zhassurbek',
      },
      {
        icon: 'facebook',
        link: 'https://facebook.com/zhassurbek',
      },
    ],
  },
  {
    image: 'https://picsum.photos/1184/500',
    role: 'Глава отдела разработки',
    name: 'Пулатов Жасурбек Мухсинович',
    id: 1,
    socials: [
      {
        icon: 'telegram',
        link: 'https://t.me/zhassurbek',
      },
      {
        icon: 'instagram',
        link: 'https://instagram.com/zhassurbek',
      },
      {
        icon: 'facebook',
        link: 'https://facebook.com/zhassurbek',
      },
    ],
  },
  {
    image: 'https://picsum.photos/1184/500',
    role: 'Глава отдела разработки',
    name: 'Пулатов Жасурбек Мухсинович',
    id: 1,
    socials: [
      {
        icon: 'Telegram',
        link: 'https://t.me/zhassurbek',
      },
      {
        icon: 'Instagram',
        link: 'https://instagram.com/zhassurbek',
      },
      {
        icon: 'Facebook',
        link: 'https://facebook.com/zhassurbek',
      },
    ],
  },
  {
    image: 'https://picsum.photos/1184/500',
    role: 'Глава отдела разработки',
    name: 'Пулатов Жасурбек Мухсинович',
    id: 1,
  },
  {
    image: 'https://picsum.photos/1184/500',
    role: 'Глава отдела разработки',
    name: 'Пулатов Жасурбек Мухсинович',
    id: 1,
  },
  {
    image: 'https://picsum.photos/1184/500',
    role: 'Глава отдела разработки',
    name: 'Пулатов Жасурбек Мухсинович',
    id: 1,
  },
  {
    image: 'https://picsum.photos/1184/500',
    role: 'Глава отдела разработки',
    name: 'Пулатов Жасурбек Мухсинович',
    id: 1,
  },
  {
    image: 'https://picsum.photos/1184/500',
    role: 'Глава отдела разработки',
    name: 'Пулатов Жасурбек Мухсинович',
    id: 1,
  },
  {
    image: 'https://picsum.photos/1184/500',
    role: 'Глава отдела разработки',
    name: 'Пулатов Жасурбек Мухсинович',
    id: 1,
  },
  {
    image: 'https://picsum.photos/1184/500',
    role: 'Глава отдела разработки',
    name: 'Пулатов Жасурбек Мухсинович',
    id: 1,
  },
  {
    image: 'https://picsum.photos/1184/500',
    role: 'Глава отдела разработки',
    name: 'Пулатов Жасурбек Мухсинович',
    id: 1,
  },
  {
    image: 'https://picsum.photos/1184/500',
    role: 'Глава отдела разработки',
    name: 'Пулатов Жасурбек Мухсинович',
    id: 1,
  },
  {
    image: 'https://picsum.photos/1184/500',
    role: 'Глава отдела разработки',
    name: 'Пулатов Жасурбек Мухсинович',
    id: 1,
  },
  {
    image: 'https://picsum.photos/1184/500',
    role: 'Глава отдела разработки',
    name: 'Пулатов Жасурбек Мухсинович',
    id: 1,
  },
  {
    image: 'https://picsum.photos/1184/500',
    role: 'Глава отдела разработки',
    name: 'Пулатов Жасурбек Мухсинович',
    id: 1,
  },
  {
    image: 'https://picsum.photos/1184/500',
    role: 'Глава отдела разработки',
    name: 'Пулатов Жасурбек Мухсинович',
    id: 1,
  },
  {
    image: 'https://picsum.photos/1184/500',
    role: 'Глава отдела разработки',
    name: 'Пулатов Жасурбек Мухсинович',
    id: 1,
  },
]
export const contactUs = [
  {
    icon: '@/assets/icons/phone.svg',
    title: 'Телефон для поддержки',
  },
  {
    icon: '@/assets/icons/mail.svg',
    name: 'support@uic.com',
    title: 'Электронная почта',
  },
]

export const menu = [
  {
    title: 'residents',
    link: '/residents',
    children: [
      {
        name: 'Mehr 2020',
        logo: '/logos/paylov.svg',
        started_at: 'Резидент с Октября 2020',
        rate: 7.5,
      },
      {
        name: 'Mehr 2020',
        logo: '/logos/paylov.svg',
        started_at: 'Резидент с Октября 2020',
        rate: 7.5,
      },
      {
        name: 'Mehr 2020',
        logo: '/logos/paylov.svg',
        started_at: 'Резидент с Октября 2020',
        rate: 7.5,
      },
      {
        name: 'Mehr 2020',
        logo: '/logos/paylov.svg',
        started_at: 'Резидент с Октября 2020',
        rate: 7.5,
      },

      {
        name: 'Mehr 2020',
        logo: '/logos/paylov.svg',
        started_at: 'Резидент с Октября 2020',
        rate: 7.5,
      },
      {
        name: 'Mehr 2020',
        logo: '/logos/paylov.svg',
        started_at: 'Резидент с Октября 2020',
        rate: 7.5,
      },
      {
        name: 'Mehr 2020',
        logo: '/logos/paylov.svg',
        started_at: 'Резидент с Октября 2020',
        rate: 7.5,
      },
    ],
  },
  {
    title: 'projects',
    link: '/projects',
    children: [
      {
        name: 'Гранты',
        logo: '/logos/paylov.svg',
        projectCount: 645,
        categories: [
          {
            title: 'Развитие туризма',
            projectCount: 78,
          },
          {
            title: 'Развитие туризма',
            projectCount: 78,
          },
          {
            title: 'Развитие туризма',
            projectCount: 78,
          },
          {
            title: 'Развитие туризма',
            projectCount: 78,
          },
          {
            title: 'Развитие туризма',
            projectCount: 78,
          },
          {
            title: 'Развитие туризма',
            projectCount: 78,
          },
          {
            title: 'Развитие туризма',
            projectCount: 78,
          },
          {
            title: 'Развитие туризма',
            projectCount: 78,
          },
          {
            title: 'Развитие туризма',
            projectCount: 78,
          },
          {
            title: 'Развитие туризма',
            projectCount: 78,
          },
        ],
      },
      {
        name: 'Субсидии',
        logo: '/logos/paylov.svg',
        projectCount: 645,
        categories: [
          {
            title: 'Развитие транспортного сектора',
            projectCount: 78,
          },
          {
            title: 'Развитие транспортного сектора',
            projectCount: 78,
          },
          {
            title: 'Развитие транспортного сектора',
            projectCount: 78,
          },
          {
            title: 'Развитие транспортного сектора',
            projectCount: 78,
          },
          {
            title: 'Развитие транспортного сектора',
            projectCount: 78,
          },
          {
            title: 'Развитие транспортного сектора',
            projectCount: 78,
          },
          {
            title: 'Развитие транспортного сектора',
            projectCount: 78,
          },
          {
            title: 'Развитие транспортного сектора',
            projectCount: 78,
          },
          {
            title: 'Развитие транспортного сектора',
            projectCount: 78,
          },
          {
            title: 'Развитие транспортного сектора',
            projectCount: 78,
          },
        ],
      },
      {
        name: 'Государственные проекты',
        logo: '/logos/paylov.svg',
        projectCount: 645,
        categories: [
          {
            title: 'Развитие туризма',
            projectCount: 78,
          },
          {
            title: 'Строительство дома',
            projectCount: 78,
          },
          {
            title: 'Строительство дома',
            projectCount: 78,
          },
          {
            title: 'Строительство дома',
            projectCount: 78,
          },
          {
            title: 'Строительство дома',
            projectCount: 78,
          },
          {
            title: 'Строительство дома',
            projectCount: 78,
          },
          {
            title: 'Строительство дома',
            projectCount: 78,
          },
          {
            title: 'Строительство дома',
            projectCount: 78,
          },
          {
            title: 'Строительство дома',
            projectCount: 78,
          },
          {
            title: 'Строительство дома',
            projectCount: 78,
          },
        ],
      },
    ],
  },
  {
    title: 'events_link',
    link: '/social',
    children: [],
  },
  {
    title: 'support_women',
    link: '/support-women',
    children: [],
  },
  {
    title: 'news.title',
    link: '/news',
    children: [],
  },
]
export const mainAbout = [
  'https://picsum.photos/1184/500',
  'https://picsum.photos/1185/500',
  'https://picsum.photos/1186/500',
  'https://picsum.photos/1187/500',
  'https://picsum.photos/1188/500',
  'https://picsum.photos/1189/500',
  'https://picsum.photos/1190/500',
  'https://picsum.photos/1191/500',
  'https://picsum.photos/1192/500',
  'https://picsum.photos/1193/500',
  'https://picsum.photos/1194/500',
  'https://picsum.photos/1195/500',
  'https://picsum.photos/1184/500',
  'https://picsum.photos/1185/500',
  'https://picsum.photos/1186/500',
  'https://picsum.photos/1187/500',
  'https://picsum.photos/1188/500',
  'https://picsum.photos/1189/500',
  'https://picsum.photos/1190/500',
  'https://picsum.photos/1191/500',
  'https://picsum.photos/1192/500',
  'https://picsum.photos/1193/500',
  'https://picsum.photos/1194/500',
  'https://picsum.photos/1195/500',
  'https://picsum.photos/1184/500',
  'https://picsum.photos/1185/500',
  'https://picsum.photos/1186/500',
  'https://picsum.photos/1187/500',
  'https://picsum.photos/1188/500',
  'https://picsum.photos/1189/500',
  'https://picsum.photos/1190/500',
  'https://picsum.photos/1191/500',
  'https://picsum.photos/1192/500',
  'https://picsum.photos/1193/500',
  'https://picsum.photos/1194/500',
  'https://picsum.photos/1195/500',
  'https://picsum.photos/1184/500',
  'https://picsum.photos/1185/500',
  'https://picsum.photos/1186/500',
  'https://picsum.photos/1187/500',
  'https://picsum.photos/1188/500',
  'https://picsum.photos/1189/500',
  'https://picsum.photos/1190/500',
  'https://picsum.photos/1191/500',
  'https://picsum.photos/1192/500',
  'https://picsum.photos/1193/500',
  'https://picsum.photos/1194/500',
  'https://picsum.photos/1195/500',
  'https://picsum.photos/1184/500',
  'https://picsum.photos/1185/500',
  'https://picsum.photos/1186/500',
  'https://picsum.photos/1187/500',
  'https://picsum.photos/1188/500',
  'https://picsum.photos/1189/500',
  'https://picsum.photos/1190/500',
  'https://picsum.photos/1191/500',
  'https://picsum.photos/1192/500',
  'https://picsum.photos/1193/500',
  'https://picsum.photos/1194/500',
  'https://picsum.photos/1195/500',
]

export const statisticCards = [
  {
    icon: 'files',
    title: 'Документы',
    count: 123,
    percentage: '+12%',
  },
  {
    icon: 'files',
    title: 'Документы',
    count: 1234567,
    percentage: '-16%',
  },
  {
    icon: 'files',
    title: 'Документы',
    count: 123654789,
    percentage: '+12%',
  },
  {
    icon: 'files',
    title: 'Документы',
    count: 123546,
    percentage: '-12%',
  },
]

export const companies: ICompany[] = [
  {
    title: 'Company Name 1',
    joinDate: new Date(),
    image: 'https://picsum.photos/200',
    projectCount: 45,
    icon: 'brain',
  },
  {
    title: 'Company Name 2',
    joinDate: new Date(),
    image: 'https://picsum.photos/201',
    projectCount: 5,
    icon: 'brand-4chan',
  },
  {
    title: 'Company Name 3',
    joinDate: new Date(),
    image: 'https://picsum.photos/202',
    projectCount: 51,
    icon: 'medical-cross',
  },
  {
    title: 'Company Name 4',
    joinDate: new Date(),
    image: 'https://picsum.photos/203',
    projectCount: 15,
    icon: 'home',
  },
  {
    title: 'Company Name 5',
    joinDate: new Date(),
    image: 'https://picsum.photos/200',
    projectCount: 13,
    icon: 'augmented-reality',
  },
]

export const chartLegends = [
  {
    name: 'Projects',
    color: '#EDB716',
    quantity: 2321,
  },
  {
    name: 'Users',
    color: '#E91313',
    quantity: 123,
  },
  {
    name: 'Contributors',
    color: '#62AD5A',
    quantity: 345,
  },
]

export const chart2Legends = [
  {
    name: 'Projects',
    color: '#EDB716',
    quantity: 2321,
  },
  {
    name: 'Users',
    color: '#E91313',
    quantity: 123,
  },
]

export const socialProjects = [
  {
    count: 560000000000,
    title: 'Сумма социальных заказов',
  },
  {
    count: 134,
    title: 'Количество социальных заказов',
  },
  {
    count: 5000,
    title: 'Количество проведенных мероприятий',
  },
  {
    count: 5000000,
    title: 'Общая численность охваченного населения',
  },
]

export const socialLinks = {
  instagram: 'https://instagram.com/#',
  telegram: 'https://t.me/#',
  facebook: 'https://facebook.com/#',
}

export const platforms = [
  {
    image: 'https://picsum.photos/72',
    company_name: 'Company 1',
    time: new Date(),
    projects_count: 5,
    ball_count: 10,
    id: 1,
  },
  {
    image: 'https://picsum.photos/73',
    company_name: 'Company 2',
    time: new Date(),
    projects_count: 8,
    ball_count: 15,
    id: 2,
  },
  {
    image: 'https://picsum.photos/74',
    company_name: 'Company 2',
    time: new Date(),
    projects_count: 8,
    ball_count: 15,
    id: 3,
  },
  {
    image: 'https://picsum.photos/75',
    company_name: 'Company 2',
    time: new Date(),
    projects_count: 8,
    ball_count: 15,
    id: 4,
  },
  {
    image: 'https://picsum.photos/76',
    company_name: 'Company 2',
    time: new Date(),
    projects_count: 8,
    ball_count: 15,
    id: 5,
  },
  {
    image: 'https://picsum.photos/77',
    company_name: 'Company 2',
    time: new Date(),
    projects_count: 8,
    ball_count: 15,
    id: 6,
  },
  {
    image: 'https://picsum.photos/78',
    company_name: 'Company 2',
    time: new Date(),
    projects_count: 8,
    ball_count: 15,
    id: 7,
  },
  {
    image: 'https://picsum.photos/79',
    company_name: 'Company 2',
    time: new Date(),
    projects_count: 8,
    ball_count: 15,
    id: 8,
  },
]

export const footerLinks = [
  {
    title: 'projects',
    link: '/projects',
  },
  {
    title: 'grand_and_subsidies',
    link: '/grants',
  },
  {
    title: 'events_link',
    link: '/social',
  },
  {
    title: 'social_projects',
    link: '/support-women',
  },
  {
    title: 'contact_link',
    link: '/contact-us',
  },
]

export const supports = [
  {
    title: 'Материальная помощь',
    badge: 'Финансы',
    icon: 'money',
    description:
      'Мы окажем вам финансовую поддержку и консультации, помогая вам воплотить Вашу идею в жизнь.',
  },
  {
    title: 'Материальная помощь',
    badge: 'Финансы',
    icon: 'heart',
    description:
      'Мы окажем вам финансовую поддержку и консультации, помогая вам воплотить Вашу идею в жизнь.',
  },
  {
    title: 'Материальная',
    badge: 'Финансы',
    icon: 'hands',
    description:
      'Мы окажем вам финансовую поддержку и консультации, помогая вам воплотить Вашу идею в жизнь.',
  },
  {
    title: 'Материальная помощь',
    badge: 'Финансы',
    icon: 'star',
    description:
      'Мы окажем вам финансовую поддержку и консультации, помогая вам воплотить Вашу идею в жизнь.',
  },
  {
    title: 'Материальная помощь',
    badge: 'Финансы',
    icon: 'report-money',
    description: 'Мы окажем вам финансовую поддержку и консультации.',
  },
]
export const projectAnnounces = [
  {
    id: '1',
    title: 'Развитие детских игровых площадок в городских парках',
    price: '70 000 000 сум',
    location: 'г Ташкент, Янгихаётский район',
    period: '8.10.2024 - 23.01.2024',
    img: 'https://picsum.photos/1195/500',
  },
  {
    id: '2',
    title: 'Проект «5 инициатив» для молодежи',
    price: '70 000 000 сум',
    location: 'г Ташкент, Чиланзар район',
    period: '8.10.2024 - 23.01.2024',
    img: 'https://picsum.photos/1194/500',
  },
  {
    id: '3',
    title: 'Развитие детских игровых площадок в городских парках',
    price: '70 000 000 сум',
    location: 'г Ташкент, Янгихаётский район',
    period: '8.10.2024 - 23.01.2024',
    img: 'https://picsum.photos/1196/500',
  },
  {
    id: '4',
    title: 'Проект «5 инициатив» для молодежи',
    price: '70 000 000 сум',
    location: 'г Ташкент, Чиланзар район',
    period: '8.10.2024 - 23.01.2024',
    img: 'https://picsum.photos/1197/500',
  },
  {
    id: '5',
    title: 'Развитие детских игровых площадок в городских парках',
    price: '70 000 000 сум',
    location: 'г Ташкент, Янгихаётский район',
    period: '8.10.2024 - 23.01.2024',
    img: 'https://picsum.photos/1198/500',
  },
  {
    id: '6',
    title: 'Проект «5 инициатив» для молодежи',
    price: '70 000 000 сум',
    location: 'г Ташкент, Чиланзар район',
    period: '8.10.2024 - 23.01.2024',
    img: 'https://picsum.photos/1199/500',
  },
]

export const projectTabList = () => {
  const { t } = useI18n()
  return [
    {
      id: 1,
      icon: 'projects-logo',
      label: t('statistics.social_projects'),
      value: 'projects',
    },
    {
      id: 2,
      icon: 'grants-logo',
      label: t('grants'),
      value: 'grants',
    },
    {
      id: 3,
      icon: 'subsidies-logo',
      label: t('subsidies'),
      value: 'subsidies',
    },
  ]
}
export const projectSingleTabList = (isMobile?: boolean) => {
  const { t } = useI18n()
  return [
    {
      label: isMobile
        ? t('project_single_tab.about_mobile')
        : t('project_single_tab.about'),
      value: 'about',
    },
    {
      label: isMobile
        ? t('project_single_tab.participant_mobile')
        : t('project_single_tab.participant'),
      value: 'participants',
    },
    {
      label: t('project_single_tab.project_result'),
      value: 'results',
    },
  ]
}
export const SocialActivities = [
  {
    followers: 50000,
    id: 1,
    title: 'Национальный фестиваль кукол',
    description:
      'Добро пожаловать на гранты и субсидии, объявленные фондом при Олий Мажлисе. Получите шанс получить грант или субсидию, подав заявку',
    time: '8 Октября, 2024',
    location: 'Улица Адхама Рахмата 15, г. Ташкент',
    users,
    img: 'https://picsum.photos/1194/500',
  },
  {
    followers: 50000,
    id: 2,
    title: 'Старое и новое (Дневники Савицкого)',
    description:
      '7-mart kuni “O‘ZEKSPOMARKAZ”ning 5-pavilionida “Savitskiy kundaliklari. Qadimiy va navqiron” nomli yangi multimedia ko‘rgazma loyihasi o‘z ishini boshlaydi. Ko‘rgazma tomoshabinlarni tarix va madaniyat multimedia ekranlarida rassomlar tomonidan yaratilgan hikoyalarda uyg‘unlashgan XX asr Markaziy Osiyo tasviriy san’ati olamiga sho‘ng‘ishga taklif etadi. Markaziy Osiyo tasviriy san’ati olamiga sho‘ng‘ishga taklif etadi.',
    time: '8 Октября, 2024',
    location: 'Улица Адхама Рахмата 15, г. Ташкент',
    users,
    img: 'https://picsum.photos/1195/500',
  },
  {
    followers: 50000,
    id: 3,
    title: 'Маленкий принц (музыкальная сказка)',
    description:
      'Добро пожаловать на гранты и субсидии, объявленные фондом при Олий Мажлисе. Получите шанс получить грант или субсидию, подав заявку',
    time: '8 Октября, 2024',
    location: 'Улица Адхама Рахмата 15, г. Ташкент',
    users,
    img: 'https://picsum.photos/1193/500',
  },
  {
    followers: 50000,
    id: 4,
    title: 'Национальный фестиваль кукол',
    description:
      'Добро пожаловать на гранты и субсидии, объявленные фондом при Олий Мажлисе. Получите шанс получить грант или субсидию, подав заявку',
    time: '8 Октября, 2024',
    location: 'Улица Адхама Рахмата 15, г. Ташкент',
    users,
    img: 'https://picsum.photos/1194/500',
  },
  {
    followers: 50000,
    id: 5,
    title: 'Старое и новое (Дневники Савицкого)',
    description:
      '7-mart kuni “O‘ZEKSPOMARKAZ”ning 5-pavilionida “Savitskiy kundaliklari. Qadimiy va navqiron” nomli yangi multimedia ko‘rgazma loyihasi o‘z ishini boshlaydi. Ko‘rgazma tomoshabinlarni tarix va madaniyat multimedia ekranlarida rassomlar tomonidan yaratilgan hikoyalarda uyg‘unlashgan XX asr Markaziy Osiyo tasviriy san’ati olamiga sho‘ng‘ishga taklif etadi. Markaziy Osiyo tasviriy san’ati olamiga sho‘ng‘ishga taklif etadi.',
    time: '8 Октября, 2024',
    location: 'Улица Адхама Рахмата 15, г. Ташкент',
    users,
    img: 'https://picsum.photos/1195/500',
  },
  {
    followers: 50000,
    id: 6,
    title: 'Маленкий принц (музыкальная сказка)',
    description:
      'Добро пожаловать на гранты и субсидии, объявленные фондом при Олий Мажлисе. Получите шанс получить грант или субсидию, подав заявку',
    time: '8 Октября, 2024',
    location: 'Улица Адхама Рахмата 15, г. Ташкент',
    users,
    img: 'https://picsum.photos/1193/500',
  },
]
export const residentTabList = () => {
  const { t } = useI18n()
  return [
    {
      label: t('resident_tab.about'),
      value: 'about',
    },
    {
      label: t('resident_tab.projects'),
      value: 'projects',
    },
    {
      label: t('resident_tab.comments'),
      value: 'comment',
    },
    {
      label: t('resident_tab.contacts'),
      value: 'contact',
    },
  ]
}
export const resultsProject = [
  {
    title: 'DONOR yoki INVESTOR',
    description:
      'Мы окажем вам поддержку и консультации, помогая вам воплотить Вашу идею в жизнь. lorem dsab slom dob ',
    type: '#здоровье',
    img: 'https://picsum.photos/250',
    organization: '12',
    price: '100',
  },
  {
    title: 'Teach for Uzbekistan',
    description:
      'OZone Fitness Centre приглашает посетить ТРЦ Samarqand Darvoza где пройдет социальный проект Spin for a win. lorem dsab slom dob ',
    type: '#здоровье',
    img: 'https://picsum.photos/251',
    organization: '12',
    price: '100',
  },
  {
    title: 'DONOR yoki INVESTOR',
    description:
      'Мы окажем вам поддержку и консультации, помогая вам воплотить Вашу идею в жизнь. lorem dsab slom dob ',
    type: '#здоровье',
    img: 'https://picsum.photos/252',
    organization: '12',
    price: '100',
  },
  {
    title: 'Teach for Uzbekistan',
    description:
      'OZone Fitness Centre приглашает посетить ТРЦ Samarqand Darvoza где пройдет социальный проект Spin for a win. lorem dsab slom dob ',
    type: '#здоровье',
    img: 'https://picsum.photos/253',
    organization: '12',
    price: '100',
  },
  {
    title: 'DONOR yoki INVESTOR',
    description:
      'Мы окажем вам поддержку и консультации, помогая вам воплотить Вашу идею в жизнь. lorem dsab slom dob ',
    type: '#здоровье',
    img: 'https://picsum.photos/254',
    organization: '12',
    price: '100',
  },
  {
    title: 'Teach for Uzbekistan',
    description:
      'OZone Fitness Centre приглашает посетить ТРЦ Samarqand Darvoza где пройдет социальный проект Spin for a win. lorem dsab slom dob ',
    type: '#здоровье',
    img: 'https://picsum.photos/255',
    organization: '12',
    price: '100',
  },
  {
    title: 'DONOR yoki INVESTOR',
    description:
      'Мы окажем вам поддержку и консультации, помогая вам воплотить Вашу идею в жизнь. lorem dsab slom dob ',
    type: '#здоровье',
    img: 'https://picsum.photos/256',
    organization: '12',
    price: '100',
  },
  {
    title: 'Teach for Uzbekistan',
    description:
      'OZone Fitness Centre приглашает посетить ТРЦ Samarqand Darvoza где пройдет социальный проект Spin for a win. lorem dsab slom dob ',
    type: '#здоровье',
    img: 'https://picsum.photos/257',
    organization: '12',
    price: '100',
  },
]

export const hashtags = [
  {
    label: '#здоровье',
    value: '#здоровье',
  },
  {
    label: '#общество',
    value: '#общество',
  },
  {
    label: '#образование',
    value: '#образование',
  },
  {
    label: '#здоровье',
    value: '#здоровье1',
  },
  {
    label: '#спорт',
    value: '#спорт',
  },
  {
    label: '#здоровье',
    value: '#здоровье2',
  },
  {
    label: '#здоровье',
    value: '#здоровье3',
  },
]

export const sharhCards = [
  {
    fullname: 'Ahmadjon Sanakulov',
    company: 'UIC group',
    comment:
      'OZone Fitness Centre приглашает посетить ТРЦ Samarqand Darvoza где пройдет социальный проект Spin for a win. lorem dsab slom dob ',
    avatar: 'https://picsum.photos/250',
    rating: 4.5,
  },
  {
    fullname: 'Ahmadjon Sanakulov',
    company: 'UIC group',
    comment:
      'OZone Fitness Centre приглашает посетить ТРЦ Samarqand Darvoza где пройдет социальный проект Spin for a win. lorem dsab slom dob ',
    avatar: 'https://picsum.photos/251',
    rating: 3.3,
  },
  {
    fullname: 'Ahmadjon Sanakulov',
    company: 'UIC group',
    comment:
      'OZone Fitness Centre приглашает посетить ТРЦ Samarqand Darvoza где пройдет социальный проект Spin for a win. lorem dsab slom dob ',
    avatar: 'https://picsum.photos/252',
    rating: 4.5,
  },
  {
    fullname: 'Ahmadjon Sanakulov',
    company: 'UIC group',
    comment:
      'OZone Fitness Centre приглашает посетить ТРЦ Samarqand Darvoza где пройдет социальный проект Spin for a win. lorem dsab slom dob ',
    avatar: 'https://picsum.photos/253',
    rating: 3.3,
  },
  {
    fullname: 'Ahmadjon Sanakulov',
    company: 'UIC group',
    comment:
      'OZone Fitness Centre приглашает посетить ТРЦ Samarqand Darvoza где пройдет социальный проект Spin for a win. lorem dsab slom dob ',
    avatar: 'https://picsum.photos/254',
    rating: 4.5,
  },
  {
    fullname: 'Ahmadjon Sanakulov',
    company: 'UIC group',
    comment:
      'OZone Fitness Centre приглашает посетить ТРЦ Samarqand Darvoza где пройдет социальный проект Spin for a win. lorem dsab slom dob ',
    avatar: 'https://picsum.photos/255',
    rating: 3.3,
  },
]

export const AttachedFiles = [
  {
    title: 'Техническое задание',
    description: '810.20 KB',
    icon: 'file',
  },
  {
    title: 'Техническое задание',
    description: '810.20 KB',
    icon: 'download',
  },
  {
    title: 'Техническое задание',
    description: '810.20 KB',
    icon: '',
  },
  {
    title: 'Техническое задание',
    description: '810.20 KB',
    icon: '',
  },
]

export const ReportImage = [
  {
    img: 'https://picsum.photos/269/183',
  },
  {
    img: 'https://picsum.photos/269/183',
  },
  {
    img: 'https://picsum.photos/269/183',
  },
  {
    img: 'https://picsum.photos/269/183',
  },
  {
    img: 'https://picsum.photos/269/183',
  },
]

export const ContactInfo = [
  {
    title: 'Техническое задание',
    description: '810.20 KB',
    icon: 'phone',
  },
  {
    title: 'Техническое задание',
    description: '810.20 KB',
    icon: 'mail',
  },
  {
    title: 'Техническое задание',
    description: '810.20 KB',
    icon: 'external-link',
  },
  {
    title: 'Техническое задание',
    description: '810.20 KB',
    icon: 'clock-hour',
  },
]

export const mapInfo = [
  {
    title: 'г.Ташкент, Шайхонтахурский р-н, Адхам Рахмат 15/1',
    description: 'Локация',
    icon: 'location',
  },
]

export const aboutData = [
  {
    title:
      '“United IT Company” была основана 8 октября 2020 года. По словам\n' +
      'директора компании Муродходжа Муратова, философия компании состоит\n' +
      'в том, чтобы собрать команду, отвечающую международным стандартам\n' +
      'в IT-сфере Узбекистана, открыть молодым программистам возможность\n' +
      'работать над собой и вместе с тем быть официально трудоустроенным,\n' +
      '    вывести компанию на видное место в мировой арене IT \n' +
      'На момент создания компании, команда состояла всего из 10 человек,\n' +
      '    а сейчас в команде больше +100 специалистов. Эти люди верили в\n' +
      'философию компании и стремились внести свой вклад в развитие\n' +
      'проекта. По сей день эти люди сохраняют лояльность компании и\n' +
      'развивают свои команды внутри компании в разных направлениях\n' +
      '(Backend, Frontend, QA, Mobile, Analytics, Marketing Team и т.\n' +
      '    д.).\n' +
      '"UIC Group" - это адрес проектов, которые имеют свои ценности и не\n' +
      'проходят без контроля качества. Каждая возможность и спрос в нашей\n' +
      'компании служат для удовлетворения потребностей наших клиентов с\n' +
      'максимальной эффективностью. Наша компания готова обслуживать\n' +
      'клиентов не просто как клиентов, а как партнеров на всю жизнь с\n' +
      'лучшими предложениями! Наличие наших систем SaaS (это большинство\n' +
      'сервисов в интернете: электронная почта, CRM-системы, планировщики\n' +
      'задач, веб-конструкторы для создания сайтов, платформы для ведения\n' +
      'блогов. То есть все облачные программы, которые позволяют решать\n' +
      'конкретные задачи) и PaaS (система управления базами данных, среда\n' +
      'машинного обучения или обработки big data) в дополнение к основным\n' +
      'направлениям обслуживания.',
  },
]

export const projectData = [
  {
    title: 'Развитие детских игровых площадок в городских парках',
    date: 'ООО "Ташкентский НПЗ"',
    descripton:
      ' Проект "Развитие детских игровых площадок в городских парках" направлен\n' +
      '        на создание безопасных, интересных и образовательных игровых пространств\n' +
      '        для детей разного возраста. Основная цель проекта - улучшить городской\n' +
      '        парк, предоставив детям возможность активно проводить время на свежем\n' +
      '        воздухе, развивая физические и социальные навыки.',
  },
]

export const data = [
  '    <img\n' +
    '              src="https://picsum.photos/269/183"\n' +
    '              alt="img"\n' +
    '              class="w-full rounded-2xl my-8"\n' +
    '            />\n' +
    '            <p\n' +
    '              class="text-brand-black text-base md:text-xl mb-2 md:mb-0 font-bold leading-130"\n' +
    '            >\n' +
    '              Выделение субсидий работодателям, которые принимают на работу лиц,\n' +
    '              освобожденных из исправительных учреждений\n' +
    '            </p>\n' +
    '            <p class="text-brand-black text-base leading-130 font-medium my-4">\n' +
    '              В Конституции Республики Узбекистан, Законе Республики Узбекистан\n' +
    '              «О местной государственной власти» и других законах Республики\n' +
    '              Узбекистан, указах, постановлениях и распоряжениях Президента\n' +
    '              Республики Узбекистан, Кабинета Министров Республики Узбекистан.\n' +
    '              Республике Узбекистан обеспечить выполнение решений и распоряжений\n' +
    '              акима города Ташкента совместно с государственными органами и\n' +
    '              органами хозяйственного управления. Заявители при регистрации\n' +
    '              вносят свои персональные данные в специальную электронную систему\n' +
    '              и загружают следующие документы:\n' +
    '            </p>\n' +
    '            <ul class="py-4 list-none">\n' +
    '              <li class="flex-center gap-2 pt-4">\n' +
    '                <span\n' +
    '                  class="h-4 w-4 border-2 flex-shrink-0 rounded-full border-primary"\n' +
    '                ></span>\n' +
    '                <p class="text-brand-black text-base leading-130 font-medium">\n' +
    '                  Копия документа о высшем образовании (или выписка из диплома –\n' +
    '                  для окончивших высшие учебные заведения Республики Узбекистан\n' +
    '                  на основе государственного гранта);\n' +
    '                </p>\n' +
    '              </li>\n' +
    '              <li class="flex-center gap-2 pt-4">\n' +
    '                <span\n' +
    '                  class="h-4 w-4 border-2 flex-shrink-0 rounded-full border-primary"\n' +
    '                ></span>\n' +
    '                <p class="text-brand-black text-base leading-130 font-medium">\n' +
    '                  Копия документа о высшем образовании (или выписка из диплома –\n' +
    '                  для окончивших высшие учебные заведения Республики Узбекистан\n' +
    '                  на основе государственного гранта);\n' +
    '                </p>\n' +
    '              </li>\n' +
    '            </ul>',
]

export const supportWomenHero = [
  {
    id: 1,
    name: 'title1',
    description: 'description1',
    image: '/images/support-women/person1.webp',
  },
  {
    id: 2,
    image: '/images/support-women/person2.webp',
  },
  {
    id: 3,
    name: 'title2',
    description: 'description2',
    image: '/images/support-women/person3.webp',
  },
  {
    id: 4,
    name: 'title3',
    description: 'description3',
    image: '/images/support-women/person4.webp',
  },
  {
    id: 5,
    name: 'title4',
    description: 'description4',
    image: '/images/support-women/person5.webp',
  },
]
