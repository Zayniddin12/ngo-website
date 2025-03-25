import { IDefaultResponse, ISocialEvent } from '~/types'

export const useSocialStore = defineStore('socialStore', {
  state: () => ({
    loading: false,
    error: null,
    events: [] as ISocialEvent[],
  }),
  getters: {},
  actions: {
    fetchSocialEventBySlug(slug: string) {
      this.loading = true
      return new Promise<ISocialEvent>((resolve, reject) => {
        useApi()
          .$get('send_request', {
            params: {
              model: 'resident.event',
              fields:
                'title,description,requirements,image,location,partners{slug,image,name,date,create_date},date,people_max,people_visited,report_image{id,image}',
              slug,
            },
          })
          .then((data) => {
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
          .finally(() => (this.loading = false))
      })
    },
    fetchOtherEvents(slug: string) {
      this.loading = true
      return new Promise<IDefaultResponse<ISocialEvent>>((resolve, reject) => {
        useApi()
          .$get<IDefaultResponse<ISocialEvent>>('send_request', {
            params: {
              model: 'resident.event',
              fields:
                'title,description,requirements,image,location,partners{slug,image,name},date,slug',
              filter: JSON.stringify([['slug', '!=', slug]]),
              orders: `create_date asc`,
            },
          })
          .then((data) => {
            this.events = data.records
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
          .finally(() => (this.loading = false))
      })
    },
  },
})
