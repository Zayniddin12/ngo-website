import dayjs from 'dayjs'

import type {
  IDefaultResponse,
  IGovProject,
  IGrantSingle,
  IParticipant,
  IProjectDetailAbout,
  IProjectResult,
  IRegions,
  ISimilarProjects,
  ISocialEvents,
} from '~/types'
import type { IResidentProject } from '~/types/residents'
import { formatDateToValid } from '~/utils'

export const useProjectStore = defineStore('projectStore', {
  state: () => ({
    grants: [] as IGovProject[],
    headerGrants: [] as IGovProject[],
    projects: [] as IGovProject[],
    subsidies: [] as IGovProject[],
    loading: true,
    categories: [] as IRegions[],
    statuses: [] as IRegions[],
    grantSingle: {} as IGrantSingle | null,
    subsidySingle: {} as IGrantSingle | null,
    participants: {} as IParticipant,
    projectResult: {} as IProjectResult,
    similarProjects: [] as ISimilarProjects[],
    residentProjects: [] as IResidentProject[],
    socialEvents: [] as ISocialEvents[],
  }),
  getters: {},
  actions: {
    fetchProjects(item: any, search: any, filter: any, order: any) {
      this.loading = true
      return new Promise<IGovProject[]>((resolve, reject) => {
        let orders = 'asc'
        if (!order) {
          orders = 'desc'
        }
        const filters = []
        if (search) {
          filters.push(['type', 'in', [`${filter?.type}`]])
        }
        if (search) {
          filters.push(['name', 'ilike', `${search}`])
        }
        if (filter?.from) {
          filters.push([
            'start_date',
            '>=',
            `${dayjs(formatDateToValid(filter?.from)).format('YYYY-MM-DD')}`,
          ])
        }
        if (filter?.to) {
          filters.push([
            'end_date',
            '<=',
            `${dayjs(formatDateToValid(filter?.to)).format('YYYY-MM-DD')}`,
          ])
        }
        if (filter.price_from) {
          filters.push(['price', '>=', `${filter.price_from}`])
        }
        if (filter.price_to) {
          filters.push(['price', '<=', `${filter.price_to}`])
        }
        if (filter?.category) {
          filters.push(['category', '=', filter.category])
        }
        if (filter?.status) {
          filters.push(['status', '=', `${filter.status}`])
        }
        if (filter?.region) {
          filters.push(['region', '=', Number.parseInt(filter.region)])
        }
        if (filter?.city) {
          filters.push(['district', '=', filter.city])
        }
        if (filter?.type) {
          filters.push(['type', '=', `${filter.type}`])
        }

        useApi()
          .$get<IDefaultResponse<IGovProject>>('send_request', {
            params: {
              model: 'resident.project',
              fields:
                'id,name,description,price,end_date,image,type,category{id,name},district,status,start_date,end_date,region',
              filter: [filters],
              page_size: 4,
              page: item?.currentPage,
              orders: `create_date ${orders}`,
            },
          })
          .then((data) => {
            this.grants = data
            resolve(this.grants)
          })
          .catch((error) => {
            reject(error)
          })
          .finally(() => (this.loading = false))
      })
    },
    fetchProjectCategory() {
      return new Promise<IRegions[]>((resolve, reject) => {
        useApi()
          .$get<IDefaultResponse<IRegions>>('send_request', {
            params: {
              model: 'resident.project.category',
              fields: 'id,name',
            },
          })
          .then((data) => {
            this.categories = data.records
            resolve(this.categories)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    fetchHeaderProjects() {
      this.loading = true
      return new Promise<IGovProject>((resolve, reject) => {
        useApi()
          .$get<IGrantSingle>('send_request', {
            params: {
              model: 'resident.project',
              fields: 'id,name,project_type_counts',
            },
          })
          .then((data) => {
            this.projects = data
            resolve(this.projects)
          })
          .catch((error) => {
            reject(error)
          })
          .finally(() => (this.loading = false))
      })
    },
    fetchGrantSingle(id: string) {
      this.loading = true
      return new Promise<IGrantSingle>((resolve, reject) => {
        useApi()
          .$get<IGrantSingle>('send_request', {
            params: {
              model: 'resident.project',
              fields:
                'id,name,description,status,category{id,name},price,start_date,end_date,image,type,region,district,bottom_description,key_aspects{name,id,description},price,location,source_of_budget,report_image,report_document,report_description,file{id,name,file,type}',
              filter: [['type', 'in', ['gov_grant_project']]],
              id: `${id}`,
            },
          })
          .then((data) => {
            this.grantSingle = data
            resolve(this.grantSingle)
          })
          .catch((error) => {
            reject(error)
          })
          .finally(() => (this.loading = false))
      })
    },
    fetchSubsidySingle(id: string) {
      this.loading = true
      return new Promise<IGrantSingle>((resolve, reject) => {
        useApi()
          .$get<IGrantSingle>('send_request', {
            params: {
              model: 'resident.project',
              fields:
                'id,name,description,status,category{id,name},price,start_date,end_date,image,type,region,district,bottom_description,key_aspects{name,id,description},price,location,source_of_budget,report_image,report_document,report_description,file{id,name,file}',
              filter: [['type', 'in', ['gov_subsidy_project']]],
              id: `${id}`,
            },
          })
          .then((data) => {
            this.subsidySingle = data
            resolve(this.subsidySingle)
          })
          .catch((error) => {
            reject(error)
          })
          .finally(() => (this.loading = false))
      })
    },
    fetchProjectsByResident(slug: string) {
      this.loading = true
      return new Promise((resolve, reject) => {
        useApi()
          .$get<IDefaultResponse<IResidentProject>>('send_request', {
            params: {
              model: 'resident.project',
              fields: `id,name,image,description,resident{id,name},type,executor_residents{id,name},type,category{id,name},price,start_date,end_date,owner_type,status,slug`,
              filter: `["|",["resident.slug","=","${slug}"],["executor_residents.slug","in",["${slug}"]]]`,
            },
          })
          .then((res) => {
            this.residentProjects = res.records as IResidentProject[]
            resolve(this.residentProjects)
          })
          .catch((error) => {
            reject(error)
          })
          .finally(() => (this.loading = false))
      })
    },
    fetchProject(slug: string) {
      this.loading = true
      return new Promise((resolve, reject) => {
        useApi()
          .$get<IProjectDetailAbout>('send_request', {
            params: {
              model: 'resident.project',
              slug,
              fields:
                'name,slug,price,type,image,description,price,location,start_date,end_date,status,key_aspects{id,name,description},file{id,name,file,type,size},tag{id,name},report_image{name,size,type,file},report_file{name,size,type,file},report_document{name,size,type,file},report_description,source_of_budget',
            },
          })
          .then((res) => {
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
          .finally(() => (this.loading = false))
      })
    },
    getSimilarProjects(categoryId: number, projectId: number) {
      this.loading = true
      return new Promise<ISimilarProjects[]>((resolve, reject) => {
        useApi()
          .$get<IDefaultResponse<ISimilarProjects>>('send_request', {
            params: {
              model: 'resident.project',
              fields:
                'id,name,price,description,start_date,end_date,image,location,type',
              filter: [
                [
                  ['category.id', '=', categoryId],
                  ['id', '!=', projectId],
                ],
              ],
            },
          })
          .then((res) => {
            this.similarProjects = res.records
            resolve(this.similarProjects)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    getParticipants(id: number) {
      this.loading = true
      return new Promise<IParticipant>((resolve, reject) => {
        useApi()
          .$get<IParticipant>('send_request', {
            params: {
              model: 'resident.project',
              fields:
                'id,type,price,start_date,end_date,project_request{id,resident{id,name,slug,image,date},status,description,file,create_date},status',
              id,
            },
          })
          .then((res) => {
            this.participants = res
            resolve(this.participants)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    getProjectResult(id: number) {
      this.loading = true
      return new Promise<IProjectResult>((resolve, reject) => {
        useApi()
          .$get<IProjectResult>('send_request', {
            params: {
              model: 'resident.project',
              fields:
                'name,report_image{id,name,size,type,file},report_file{id,name,size,type,file},report_document{name,size,type,file},report_description',
              id,
            },
          })
          .then((res) => {
            this.projectResult = res
            resolve(this.projectResult)
          })
          .catch((err) => {
            reject(err)
          })
      })
    },
    fetchSocialEvents(item: any, search: any, filter: any, order: any) {
      this.loading = true
      return new Promise<ISocialEvents[]>((resolve, reject) => {
        let orders = 'asc'
        if (!order) {
          orders = 'desc'
        }
        const filters = []
        if (search) {
          filters.push(['title', 'ilike', `${search}`])
        }
        if (filter?.from) {
          filters.push([
            'date',
            '>=',
            `${dayjs(formatDateToValid(filter?.from)).format('YYYY-MM-DD')}`,
          ])
        }
        if (filter?.to) {
          filters.push([
            'date',
            '<=',
            `${dayjs(formatDateToValid(filter?.to)).format('YYYY-MM-DD')}`,
          ])
        }
        if (filter?.region) {
          filters.push(['region', '=', Number.parseInt(filter.region)])
        }
        if (filter?.city) {
          filters.push(['district', '=', `${filter.city}`])
        }

        useApi()
          .$get<IDefaultResponse<ISocialEvents>>('send_request', {
            params: {
              model: 'resident.event',
              fields:
                'title,date,location,requirements,people_max,people_visited,description,image,report_image{id,image},project,partners{id,image,name,slug},region,district,slug',
              filter: [filters],
              page_size: 3,
              page: item?.currentPage,
              orders: `create_date ${orders}`,
            },
          })
          .then((data) => {
            this.socialEvents = data
            resolve(this.socialEvents)
          })
          .catch((error) => {
            reject(error)
          })
          .finally(() => (this.loading = false))
      })
    },
  },
})
