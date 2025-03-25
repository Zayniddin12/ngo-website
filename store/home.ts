import { useApi } from '~/composables/useApi'
import type {
  IComplectedProject,
  ICustomData,
  IDefaultResponse,
  IDocument,
  IFeedback,
  IFeedbackTag,
  INewsData,
  IOrganization,
  IPaginationResponse,
  IProjectAnouncement,
  IProjectType,
  IRegions,
  IResident,
  IResidentPlatform,
  ISocialEvent,
  IStatistics,
  IStory,
  ISupport,
  ISupportStatisticNumber,
  ITag,
  IOneId,
} from '~/types'

export const useHomeStore = defineStore('homeStore', {
  state: () => ({
    residentPlatform: [] as IResidentPlatform[],
    headerResPlatform: [] as IResidentPlatform[],
    socials: [] as ICustomData[],
    organizations: [] as IOrganization[],
    resident: [] as IResident[],
    documents: [] as IDocument[],
    projectAnouncements: [] as IProjectAnouncement[],
    socialEvents: [] as ISocialEvent[],
    supports: [] as ISupport[],
    story: [] as IStory[],
    feedbacks: [] as IFeedback[],
    grands: [] as IProjectType[],
    subside: [] as IProjectType[],
    completedProjects: [] as IComplectedProject[],
    statistics: [] as IStatistics[],
    supportStatisticNumbers: [] as ISupportStatisticNumber[],
    missionTags: [] as ITag[],
    regions: [] as IRegions[],
    districts: [] as IRegions[],
    feedbackTags: [] as IFeedbackTag[],
    loading: true,
    oneId: [] as IOneId[],
  }),
  actions: {
    fetchResidentPlatform(
      item: any,
      search: any,
      filter: any,
      header: boolean,
      order: boolean
    ) {
      this.loading = true
      return new Promise<IResidentPlatform[]>((resolve, reject) => {
        const filters = []
        let orders = 'asc'
        if (!order) {
          orders = 'desc'
        }
        if (filter?.region) {
          filters.push(['region', '=', filter.region - 0])
        }
        if (filter?.birthDate) {
          filters.push(['date', '=', `${filter.birthDate}`])
        }
        if (filter?.type) {
          filters.push([['type', '=', `${filter.type}`]])
        }
        if (search) {
          filters.push(['name', 'ilike', `${search}`])
        }

        useApi()
          .$get<IDefaultResponse<IResidentPlatform>>('send_request', {
            params: {
              model: 'resident.platform',
              fields:
                'name,image,description,project_count,rank,type,date,team,slug,create_date,region',
              filter: [filters],
              page: item?.currentPage,
              orders: `create_date ${orders}`,
            },
          })
          .then((data) => {
            if (header) {
              this.headerResPlatform = data
              resolve(this.headerResPlatform)
            } else {
              this.residentPlatform = data
              resolve(this.residentPlatform)
            }
          })
          .catch((error) => {
            reject(error)
          })
          .finally(() => {
            this.loading = false
          })
      })
    },
    fetchResident() {
      return new Promise<IResident[]>((resolve, reject) => {
        useApi()
          .$get<IDefaultResponse<IResident>>('send_request', {
            params: {
              model: 'resident.rule',
              fields: 'title,description',
            },
          })
          .then((data) => {
            this.resident = data.records
            resolve(this.resident)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    fetchSocials() {
      return new Promise<ICustomData[]>((resolve, reject) => {
        useApi()
          .$get<IDefaultResponse<ICustomData>>('send_request', {
            params: {
              model: 'social.account',
              fields: 'name,link,image',
            },
          })
          .then((data) => {
            this.socials = data.records
            resolve(this.socials)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
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
                'name,register_date,sharh_rating,sharh_comment_count,telegram,instagram,sharh_link,facebook,description,mark',
              id,
            },
          })
          .then((data) => {
            this.organizations = data
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    async fetchDocumentPages() {
      try {
        const response = await useApi().$get<IDefaultResponse<IDocument>>(
          'send_request',
          {
            params: {
              model: 'ngo.document',
              fields: 'name,description',
            },
          }
        )

        return response.records
      } catch (error) {
        return error
      }
    },
    fetchProjectAnouncements() {
      return new Promise((resolve, reject) => {
        useApi()
          .$get<IDefaultResponse<IProjectAnouncement>>('send_request', {
            params: {
              model: 'resident.project',
              fields:
                'name,image,start_date,end_date,price,status,file_url,location',
              page_size: 6,
            },
          })
          .then((data) => {
            this.projectAnouncements = data.records
            resolve(this.projectAnouncements)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    fetchSocialEvents() {
      return new Promise<ISocialEvent[]>((resolve, reject) => {
        useApi()
          .$get<IDefaultResponse<ISocialEvent>>('send_request', {
            params: {
              model: 'resident.event',
              fields:
                'title,description,image,location,partners{id,name,slug,image},date,slug',
            },
          })
          .then((data) => {
            this.socialEvents = data.records
            resolve(this.socialEvents)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    fetchSupports() {
      return new Promise<ISupport[]>((resolve, reject) => {
        useApi()
          .$get<IDefaultResponse<ISupport>>('send_request', {
            params: {
              model: 'ngo.support',
              fields: 'name,description,image,category',
            },
          })
          .then((data) => {
            this.supports = data.records
            resolve(this.supports)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    fetchFeedbacks({
      filterByCategoryId,
    }: { filterByCategoryId?: number } = {}) {
      const filters: any[] = []
      if (filterByCategoryId) {
        filters.push([['resident.category', '=', filterByCategoryId]])
      }

      return new Promise<IFeedback[]>((resolve, reject) => {
        useApi()
          .$get<IDefaultResponse<IFeedback>>('send_request', {
            params: {
              model: 'feedback.feedback',
              fields:
                'description,rank,resident{id,category,slug,category{id,name}},image,name,company,sharh_id_url',
              filter: filters,
            },
          })
          .then((data) => {
            this.feedbacks = data.records
            resolve(this.feedbacks)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    fetchGrands() {
      return new Promise<IProjectType[]>((resolve, reject) => {
        useApi()
          .$get<IPaginationResponse<IProjectType>>('send_request', {
            params: {
              model: 'resident.project',
              fields:
                'id,name,description,category{id,name},price,end_date,image',
              filter: JSON.stringify([['type', '=', 'gov_grant_project']]),
            },
          })
          .then((data) => {
            this.grands = data.records!
            resolve(this.grands)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    fetchSubsides() {
      return new Promise<IProjectType[]>((resolve, reject) => {
        useApi()
          .$get<IPaginationResponse<IProjectType>>('send_request', {
            params: {
              model: 'resident.project',
              fields:
                'id,name,description,category{id,name},price,end_date,image',
              filter: JSON.stringify([['type', '=', 'gov_subsidy_project']]),
            },
          })
          .then((data) => {
            this.grands = data.records!
            resolve(this.grands)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    fetchCompletedProjects() {
      return new Promise<IComplectedProject[]>((resolve, reject) => {
        useApi()
          .$get<IDefaultResponse<IComplectedProject>>('send_request', {
            params: {
              model: 'resident.project',
              fields:
                'id,name,description,category{id,name},price,end_date,image,type,organization,main_tag{name}',
              filter: JSON.stringify([['status', '=', 'completed']]),
            },
          })
          .then((data) => {
            this.completedProjects = data.records
            resolve(this.completedProjects)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    fetchStatistics() {
      return new Promise<IStatistics[]>((resolve, reject) => {
        useApi()
          .$get<IDefaultResponse<IStatistics>>('send_request', {
            params: {
              model: 'statistic.statistic',
              fields: 'name,count,percentage,image',
            },
          })
          .then((data) => {
            this.statistics = data.records
            resolve(this.statistics)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    fetchSupportStatisticNumbers() {
      return new Promise<ISupportStatisticNumber[]>((resolve, reject) => {
        useApi()
          .$get<IDefaultResponse<ISupportStatisticNumber>>('send_request', {
            params: {
              model: 'statistic.number',
              fields: 'name,count',
            },
          })
          .then((data) => {
            this.supportStatisticNumbers = data.records
            resolve(this.supportStatisticNumbers)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    fetchMissionTags() {
      this.loading = true
      return new Promise<ITag[]>((resolve, reject) => {
        useApi()
          .$get<IDefaultResponse<ITag>>('send_request', {
            params: {
              model: 'ngo.front.tag',
              fields: 'name,link',
            },
          })
          .then((data) => {
            this.missionTags = data.records
            resolve(this.missionTags)
          })
          .catch((error) => {
            reject(error)
          })
          .finally(() => {
            this.loading = false
          })
      })
    },
    fetchRegions() {
      return new Promise<IRegions[]>((resolve, reject) => {
        useApi()
          .$get<IDefaultResponse<IRegions>>('send_request', {
            params: {
              model: 'ngo.region',
              fields: 'id,name',
            },
          })
          .then((data) => {
            this.regions = data.records
            resolve(this.regions)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    fetchDistricts(id: number) {
      return new Promise<IRegions[]>((resolve, reject) => {
        useApi()
          .$get<IDefaultResponse<IRegions>>('send_request', {
            params: {
              model: 'ngo.district',
              fields: 'id,name,region',
              filter: [[['region', '=', id - 0]]],
            },
          })
          .then((data) => {
            this.districts = data.records
            resolve(this.districts)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    fetchFeedbackTags() {
      return new Promise<IFeedbackTag[]>((resolve, reject) => {
        useApi()
          .$get<IDefaultResponse<IFeedbackTag>>('send_request', {
            params: {
              model: 'resident.category',
              fields: 'id,name',
            },
          })
          .then((data) => {
            this.feedbackTags = data.records
            resolve(this.feedbackTags)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    fetchNews() {
      return new Promise<INewsData[]>((resolve, reject) => {
        useApi()
          .$get<IDefaultResponse<INewsData>>('send_request', {
            params: {
              model: 'agency.news',
              fields:
                'id,date,description,category{id,name},video,view_count,content,link,tag{id,name},image{id,image},title',
              page_sie: 7,
            },
          })
          .then((data) => {
            this.news = data.records
            resolve(this.news)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    fetchOneId() {
      return new Promise<IOneId[]>((resolve, reject) => {
        useApi()
          .$get<IDefaultResponse<IOneId>>('one-id/')
          .then((data) => {
            this.oneId = data
            resolve(this.oneId)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
  },
})
