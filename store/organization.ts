import { defineStore } from 'pinia'

import { useApi } from '~/composables/useApi'
import type { IDefaultResponse, IOrganization } from '~/types'

export const useOrganizationStore = defineStore('organizationStore', {
  state: () => ({
    news: {
      total_records: 0,
      page: 1,
      page_size: 10,
      organizations: [] as IOrganization[],
      projects: [],
    },
  }),
  actions: {
    fetchOrganizations(item?: any, search?: string) {
      const filters = []
      if (search) {
        filters.push(['name', 'ilike', `${search}`])
      }
      return new Promise<IOrganization[]>((resolve, reject) => {
        useApi()
          .$get<IDefaultResponse<IOrganization>>('send_request', {
            params: {
              model: 'gov.organization',
              fields: 'name,image,phone,location,project_count',
              page: item?.currentPage,
              filter: filters.length > 0 ? [filters] : [],
            },
          })
          .then((data) => {
            this.organizations = data
            resolve(this.organizations)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    fetchOrganizationsSingle(id: number) {
      return new Promise<IOrganization[]>((resolve, reject) => {
        useApi()
          .$get<IDefaultResponse<IOrganization>>('send_request', {
            params: {
              model: 'gov.organization',
              fields:
                'name,register_date,image,sharh_rating,sharh_comment_count,telegram,instagram,sharh_link,facebook,description,mark',
              id,
            },
          })
          .then((data) => {
            this.organizations = data
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    fetchOrganizationsSingleProjects(id: number) {
      const filters = []
      if (id) {
        filters.push(
          ['owner_type', '=', 'organization'],
          ['organization', '=', id]
        )
      }
      return new Promise<IOrganization[]>((resolve, reject) => {
        useApi()
          .$get<IDefaultResponse<IOrganization>>('send_request', {
            params: {
              model: 'resident.project',
              fields: 'name,image,status,price,type',
              filter: filters.length > 0 ? [filters] : [],
            },
          })
          .then((data) => {
            this.projects = data.records
            resolve(data.records)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
  },
})
