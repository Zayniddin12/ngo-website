import { IResidentSingle } from './residents'

export interface IBreadcrumb {
  title: string
  link: string
}

type TClass =
  | string
  | string[]
  | Record<string, boolean>
  | Record<string, boolean>[]

export type TClassName = TClass | TClass[]

export interface IOrganization {
  image: string
  name: string
  phone: string
  address: string
  projectCount: number
  id: number
}

export type TButtonVariants =
  | 'primary'
  | 'hero'
  | 'secondary'
  | 'outline'
  | 'outline-dark'
  | 'outline-primary'
  | 'outline-fill'
  | 'white'
  | 'outline-white'
  | 'transparent'
  | 'green'
  | 'greenBorder'
  | 'gold'
  | 'secondary-danger'
  | 'danger'
  | 'disabled'
  | 'red'
  | 'success'
  | 'secondary-gray'
  | 'secondary-blue'
  | 'secondary-green'
  | 'green-text'
  | 'secondary-gold'
  | 'bg-gray'
  | 'call'

export type TButtonSizes = 'sm' | 'md'

export interface IProjectNumbers {
  quantity: number | string
  title: string
}

export interface IChartLegend {
  name: string
  color: string
  quantity: number
}

export interface ICompany {
  image: string
  title: string
  joinDate: object
  projectCount: number
  icon: string
}

export type ISocial = {
  instagram: string
  linkedin: string
  youtube: string
  telegram: string
  facebook: string
}

export type IProduct = {
  name: string
  time: string
  projects_count: number
  ball_count: number
  image: string
  id: number
  user: {
    id: number
    avatar: string
    full_name: string
  }
}

export interface ICustomObject<T = string> {
  [key: string]: T
}

export type INewsData = {
  img: string
  name: string
  description: string
  day: string
  view_count: string | null
  image: {
    id: string
    image: string
  }[]
  category: {
    id: number
    name: string
  }
}
export type IGovProject = {
  title: string
  price: number
  end_date: string
  category: {
    id: number
    name: string
  }
}

export interface IDefaultResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
  records: T[]
}

export interface IPartners<T> {
  name: string
  image: string
}

export interface IResidentPlatform {
  records: [
    {
      id: number
      name: string
      description: string
      project_count: number
      rank: number
      image_url: string
    }
  ]
  total_records: 10
  page: 1
  page_size: 10
  next_page_url: null
  prev_page_url: null
}

export interface IOurServices<T> {
  name: string
  image: string
  description: string
}

export interface IOurTeam<T> {
  name: string
  image: string
  description: string
}

export interface ICustomData {
  name: string
  link: string
  description: string
  title: string
  image: string
}

export interface IContacts {
  phone: string
  email: string
  address: string
}

// eslint-disable-next-line import/export
export interface IOrganization {
  image_url: string[]
  name: string
  phone: string
  location: string
  project_count: number
  id: number
}

export interface IResident {
  slug: string
  name: string
  description?: string
  image: string
  project_count: number
  rank: number
  create_date?: string
  id: number
}

export interface IProjectAnouncement {
  id: number
  name: string
  description: string
  start_date: string
  end_date: string
  price: 100000.0
  status: string
  location: string
  file_url: string
  image: string
}

export interface ISocialEvent {
  slug?: string
  id: number
  title: string
  description: string
  location: string
  partners: {
    id: number
    name: string
    image: string
    slug: string
  }[]
  date: string
  image: string
  people_max: number
  people_visited: string | null
  report_image: {
    id: number
    image: string
  }[]
  project: number
  region: number
  district: string
}

export interface ISupport {
  id: number
  name: string
  description: string
  category: {
    id: number
    name: string
  }
  image: string
}

export interface IStory {
  description: string
  id: number
  image_url: string | null
  items: any[]
  name: string
}

export interface IRegions {
  id: number
  name: string
}

export interface IResidentFilter {
  region: string
  birthDate: string
  type: string
}

export interface IProjects {
  id: number
  name: string
  description: string
  category: {
    id: number
    name: string
  }
  price: number
  end_date: string
  type: string
  image_url: string[]
}

export interface IFeedback {
  id: number
  description: string
  rank: number
  resident: {
    id: number
    category: {
      id: number
      name: string
    }
    slug: string
  }
  name: string
  sharh_id_url: string
  company: string
  image: string
}

export interface IPaginationResponse<T> {
  total_records: number
  page: number
  page_size: number
  next_page_url: null | string
  prev_page_url: null | string
  records?: T[]
}

// Grand or Subside ...
export interface IProjectType {
  id: number
  name: string
  description: string
  category: {
    id: number
    name: string
  }
  price: number
  end_date: string
  image: string
}

export type TProjectType =
  | 'gov_grant_project'
  | 'gov_subsidy_project'
  | 'social_project'

export interface IComplectedProject {
  id: number
  name: string
  type: TProjectType
  description: string
  price: number
  main_tag: {
    name: string
  }
  category: {
    id: number
    name: string
  }
  image: string
  organization: number | null
}

export interface IStatistics {
  id: number
  name: string
  count: string
  percentage: string
  image: string
}

export interface ISupportStatisticNumber {
  id: number
  name: string
  count: string
}

export interface IDocument {
  id: number
  name: string
  description: string
}

export interface IComment {
  id: number
  name: string
  image: string
  description: string
  rank: number
  resident: IResidentSingle
  sharh_id_url: string
}

export interface IRegions {
  id: number
  name: string
  slug?: string
}

export interface ITag {
  id: number
  name: string
  slug?: string
  link?: string
}

export type TProjectStatus = 'started' | 'in_progress' | 'completed'

export interface ISocialProjectsSingle {
  id: number
  name: string
  price: number
  end_date: string
  start_date: string
  description: string
  status: TProjectStatus
  image: string
  tag: ITag[]
  location: string
  category: {
    id: number
  }
}

export interface IFileProject {
  id: number
  name: string
  file: string
  type: string
  size: number
}

export interface IProjectDetailAbout {
  name: string
  price: number
  image: string
  key_aspects: {
    id: number
    name: string
    description: string
  }[]
  description: string
  file: IFileProject[]
  start_date: string
  end_date: string
  source_of_budget: string
  tag: {
    id: number
    name: string
  }[]
  report_image: { name: string; size: number; type: string; file: string }[]
  report_file: { name: string; size: number; type: string; file: string }[]
  report_document: { name: string; size: number; type: string; file: string }[]
  report_description: string
}

export interface IGrantSingle {
  id: number
  name: string
  description: string
  status: TProjectStatus
  category: {
    id: number | null
    name: number | null
  }
  price: number
  start_date: string
  end_date: string
  image: string
  type: TProjectType
  region: string | boolean | null
  district: string | boolean | null
  bottom_description: string | null
  key_aspects:
    | [
        {
          name: string | undefined
          id: number | undefined
          description: string
        }
      ]
  location: string
  source_of_budget: string
  report_image: any[]
  report_document: any[]
  report_description: string | null
  file: [
    {
      id: number
      name: string | null
      file: string | null
      type: string | null
    }
  ]
}

export interface ICardSide {
  id: number
  name: string
  image: string
  link: string
  position: string
}

export interface ISimilarProjects {
  id: number
  name: string
  location: string
  description: string
  start_date: string
  end_date: string
  price: number
  type: TProjectType
  image: string
}

export interface IFeedbackTag {
  id: number
  name: string
}

export type TParticipantStatus = 'new' | 'approved' | 'rejected'

export interface IParticipant {
  id: number
  price: number
  start_date: string
  end_date: string
  project_request: {
    id: number
    resident: {
      id: number
      name: string
      slug: string
      image: string
      date: string
    }
    status: TParticipantStatus
    description?: string
    file: string
    create_date: string
  }[]
  status: TProjectStatus
}

export interface ISocialEvents {
  records: ISocialEvent[]

  total_records: number
  page: number
  page_size: number
  next_page_url: string | null
  prev_page_url: string | null
}

export interface IComments {
  page: number
  total_records: number
  page_size: number
  records: IComment[]
}

export interface IProjectResult {
  id: number
  name: string
  report_image: {
    name: string
    size: number
    type: string
    file: string
  }[]

  report_file: {
    id: number
    name: string
    size: number
    type: string
    file: string
  }[]
  report_document: {
    name: string
    size: number
    type: string
    file: string
  }[]
  report_description: string
}



export interface IOneId {
  link: string
}