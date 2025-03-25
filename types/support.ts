export interface IStatistics {
  id?: number
  image_url: string
  name: string
  count: string
  percentage?: string
}

export interface ISupportCard {
  category: {
    id: number
    name: string
  }
  id: number
  name: string
  description: string
  image: string
}
