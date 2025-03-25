import type { IContacts, IDefaultResponse } from '~/types'

// @ts-ignore
export const useContactStore = defineStore('contactStore', {
  state: () => ({
    contacts: [] as IContacts[],
    loading: false,
  }),
  actions: {
    fetchContacts() {
      return new Promise<IContacts[]>((resolve, reject) => {
        this.loading = true
        useApi()
          .$get<IDefaultResponse<IContacts>>('send_request', {
            params: {
              model: 'contact',
              fields: 'phone,email,address',
            },
          })
          .then((res) => {
            this.contacts = res.records
            return resolve(this.contacts)
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
