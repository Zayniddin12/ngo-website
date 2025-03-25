import { IComments } from '~/types'
import {
  IResidentContact,
  IResidentProperties,
  IResidentSingle,
} from '~/types/residents'

export const useResidentsStore = defineStore('residents-store', {
  state: () => ({
    loading: false,
    error: null,
    resident: {} as IResidentSingle,
  }),
  getters: {},
  actions: {
    fetchResidentBySlug(slug: string) {
      this.loading = true
      return new Promise((resolve, reject) => {
        useApi()
          .$get<IResidentSingle>('send_request', {
            params: {
              model: 'resident.platform',
              slug,
              fields:
                'name,image,description,project_count,rank,sharh_rating,sharh_comment_count,team{name,position,facebook,instagram,telegram,image},facebook,instagram,telegram,web_site',
            },
          })
          .then((res) => {
            this.resident = res
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
          .finally(() => (this.loading = false))
      })
    },
    async fetchResidentContact(slug: string): Promise<IResidentContact | any> {
      try {
        return await useApi().$get<IResidentContact>('send_request', {
          params: {
            model: 'resident.platform',
            slug,
            fields:
              'facebook,instagram,telegram,web_site,latitude,longitude,location,name,image',
          },
        })
      } catch (error) {
        return error
      }
    },
    async fetchResidentComments(slug: string | string[], page: number) {
      this.loading = true
      try {
        const response = await useApi().$get<IComments>('send_request', {
          params: {
            model: 'feedback.feedback',
            fields:
              'id,name,image,description,rank,resident{id,name,slug},sharh_id_url',
            filter: `[["resident.slug","=","${slug}"]]`,
            page,
          },
        })
        return response
      } catch (error) {
        return error
      } finally {
        this.loading = false
      }
    },
    async fetchResidentProps(slug: string): Promise<IResidentProperties | any> {
      try {
        return await useApi().$get<IResidentProperties>('send_request', {
          params: {
            model: 'resident.platform',
            slug,
            fields:
              'register_date,list_number,bank_details,number_stir,number_ktut,inn,oked',
          },
        })
      } catch (error) {
        return error
      }
    },
  },
})
