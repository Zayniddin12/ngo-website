import { IGovProject } from '@/types'

export interface ITeam {
  facebook?: string | boolean
  instagram?: string | boolean
  telegram?: string | boolean
  id: number
  image: string
  position: string
  name: string
}

export interface IResidentSingle {
  slug: string
  id: number
  name: string
  description: string
  project_count: number
  rank?: number
  web_site: string
  image: string
  team?: ITeam[]
  date?: string
  register_date?: string
  rating?: number
  facebook?: string
  telegram?: string
  instagram?: string
  longitude?: number
  latitude?: number
}

export interface IResidentProject extends IGovProject {
  description: string
  type: string
  image: string
  start_date: string
  name: string
  resident: IResidentSingle
  status: string
  slug: string
}

export interface IResidentProperties {
  id: number
  register_date: string
  list_number: number
  bank_details: number
  number_stir: number
  number_ktut: number
  inn: number
  oked: number
}

export interface IResidentContact extends IResidentSingle {
  phone: string
  working_hours: string
  email: string
  location: string
}
