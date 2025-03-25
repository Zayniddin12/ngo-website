import type {
  IDefaultResponse,
  IOurServices,
  IOurTeam,
  IPartners,
  IStory,
} from '~/types'

export const useAboutStore = defineStore('aboutStore', {
  state: () => ({
    partners: [] as IPartners<any>[],
    serviceDatas: [] as IOurServices[],
    ourTeam: [] as IOurTeam<any>[],
    hasNextNews: false as boolean,
    stories: [] as IStory[],
    loading: true,
  }),
  actions: {
    fetchPartners() {
      return new Promise<IPartners<any>[]>((resolve, reject) => {
        useApi()
          .$get<IDefaultResponse<IPartners<any>>>('send_request', {
            params: {
              model: 'resident.partner',
              fields: 'name,image,link',
            },
          })
          .then((res) => {
            this.partners = res.records
            return resolve(this.partners)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    fetchOurServices() {
      return new Promise<IOurServices[]>((resolve, reject) => {
        useApi()
          .$get<IDefaultResponse<IOurServices>>('send_request', {
            params: {
              model: 'resident.service',
              fields: 'name,image,description',
            },
          })
          .then((res) => {
            this.serviceDatas = res.records
            return resolve(this.serviceDatas)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    fetchOurTeam() {
      this.loading = true
      return new Promise<IOurTeam<any>[]>((resolve, reject) => {
        useApi()
          .$get<IDefaultResponse<IOurTeam<any>>>('send_request', {
            params: {
              model: 'team',
              fields: 'name,image,position',
            },
          })
          .then((res) => {
            this.ourTeam = res.records
            return resolve(this.ourTeam)
          })
          .catch((error) => {
            reject(error)
          })
          .finally(() => {
            this.loading = false
          })
      })
    },
    fetchStories() {
      this.loading = true
      return new Promise<IStory[]>((resolve, reject) => {
        useApi()
          .$get<IStory>('send_request', {
            params: {
              model: 'x_story',
              fields: 'id,name,image,items{id,name,description,image,url}',
            },
          })
          .then((res) => {
            this.stories = res?.records
            return resolve(this.stories)
          })
          .catch((error) => {
            reject(error)
          })
          .finally(() => {
            this.loading = false
          })
      })
    },
  },
})
