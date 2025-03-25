import { defineStore } from 'pinia'

import { useApi } from '~/composables/useApi'
import type { IDefaultResponse, INewsData } from '~/types'

export const useNewsStore = defineStore('newsStore', {
  state: () => ({
    news: {
      records: [] as INewsData[],
      total_records: 0,
      page: 1,
      page_size: 10,
      singleNews: [],
    },
    session_id: 'ftrgftgtrg', // Set your device_id here
  }),
  actions: {
    fetchNews(item?: any, search?: string, category?: number, id?: number) {
      const filters = []
      if (search) {
        filters.push(['title', 'ilike', `${search}`])
      }
      if (category) {
        filters.push([['id', '=', id]])
      }

      return new Promise<void>((resolve, reject) => {
        useApi()
          .$get<IDefaultResponse<INewsData>>('send_request', {
            params: {
              model: 'agency.news',
              fields:
                'id,date,description,category{id,name},video,content,link,tag{id,name},image{id,image},title',
              page: item?.currentPage,
              page_size: 10,
              filter: filters.length > 0 ? [filters] : [],
            },
          })
          .then((response) => {
            this.news.records = response.records
            this.news.total_records = response.total_records
            this.news.page = item?.currentPage || 1
            this.news.page_size = 10
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    fetchNewsSingle(id: number) {
      const device_id = this.session_id

      return new Promise<void>((resolve, reject) => {
        useApi()
          .$get<IDefaultResponse<INewsData>>('send_request', {
            params: {
              model: 'agency.news',
              fields:
                'id,title,description,image{id,image},view_count,category{id,name},date,tag{name,slug},link',
              id,
              device_id,
            },
          })
          .then((response) => {
            if (response) {
              this.news = response
            }
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    fetchSingleNews(id: number) {
      return new Promise<void>((resolve, reject) => {
        useApi()
          .$get<IDefaultResponse<INewsData>>('send_request', {
            params: {
              model: 'agency.news',
              fields:
                'id,date,description,category{id,name},video,content,link,tag{id,name},image{id,image},title',
              id,
            },
          })
          .then((response) => {
            this.singleNews = response.records
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
  },
})
