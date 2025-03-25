/* eslint-disable no-console */
import type { IDefaultResponse, IResident } from '@/types'
import type { IStatistics, ISupportCard } from '@/types/support'

export const useSupportStore = defineStore('support-store', {
  state: () => ({
    supports: [] as ISupportCard[],
    statistics: [] as IStatistics[],
    platforms: [],
    isLoading: false as boolean,
    supportWomenLoading: false as boolean,
    error: null,
  }),
  actions: {
    async getSupports(pageSize?: number) {
      this.isLoading = true
      try {
        const response = await useApi().$get<IDefaultResponse<ISupportCard>>(
          'send_request',
          {
            params: {
              model: 'ngo.support',
              fields: 'name,description,image,category{id,name}',
              page_size: pageSize,
            },
          }
        )
        this.supports = response.records
        return response.records
      } catch (error) {
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },
    async getStatistics() {
      this.isLoading = true
      try {
        const response = await useApi().$get<IDefaultResponse<IStatistics>>(
          'send_request',
          {
            params: {
              model: 'statistic.statistic',
              fields: 'name,count,percentage,image',
            },
          }
        )
        this.statistics = response.records
        return response.records
      } catch (error) {
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },
    async fetchWomenSupportResidents() {
      try {
        const response = await useApi().$get<IDefaultResponse<IResident>>(
          'send_request',
          {
            params: {
              model: 'resident.platform',
              fields:
                'name,image,rank,project_count,description,slug,create_date',
              filter: JSON.stringify([['is_woman_support', '=', 'True']]),
            },
          }
        )
        return response.records
      } catch (error) {
        console.error(error)
        return error
      }
    },
  },
})
