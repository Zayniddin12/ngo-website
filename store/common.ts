import { defineStore } from 'pinia'

import { useApi } from '~/composables/useApi'
import type { ICardSide, IDefaultResponse } from '~/types'

export const useCommonStore = defineStore('common', {
  state: () => ({
    loading: true,
    sideCards: [] as ICardSide[],
  }),
  actions: {
    fetchSideCards() {
      return new Promise<ICardSide[]>((resolve, reject) => {
        useApi()
          .$get<IDefaultResponse<ICardSide>>('send_request', {
            params: {
              model: 'ngo.banner',
              fields: 'name,image,link,position',
            },
          })
          .then((data) => {
            this.sideCards = data.records
            resolve(this.sideCards)
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
