// @ts-ignore
import { T } from '@shikijs/core/chunk-tokens'
import { isJwtExpired } from 'jwt-check-expiration'
import { NitroFetchRequest } from 'nitropack'
import { FetchOptions } from 'ofetch'

export const useApi = (apiUrl?: string) => {
  const baseURL = apiUrl || (import.meta.env.VITE_API_BASE_URL as string)
  const loading = ref(false)
  async function $service<T = unknown>(
    endpoint: NitroFetchRequest,
    options?: FetchOptions
  ): Promise<T> {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      ...options?.headers,
      'Accept-Language': useCookie('locale').value || 'ru',
    }
    return $fetch.create({
      ...options,
      baseURL,
      headers,
    })(endpoint)
  }
  async function $get<T = never>(
    endpoint: string,
    options?: FetchOptions
  ): Promise<T> {
    try {
      loading.value = true
      return await $service<T>(endpoint, options)
    } catch (err: any) {
      throw err.response
    } finally {
      loading.value = false
    }
  }
  async function $post<T = never>(
    endpoint: NitroFetchRequest,
    options?: Omit<FetchOptions, 'method'>
  ): Promise<T> {
    try {
      return await $service<T>(endpoint, { ...options, method: 'POST' })
    } catch (err: any) {
      throw err.response
    } finally {
      loading.value = false
    }
  }
  async function $put<T = never>(
    endpoint: NitroFetchRequest,
    options?: Omit<FetchOptions, 'method'>
  ): Promise<T> {
    try {
      return await $service<T>(endpoint, { ...options, method: 'PUT' })
    } catch (err: any) {
      throw err.response
    } finally {
      loading.value = false
    }
  }
  async function $patch<T = never>(
    endpoint: NitroFetchRequest,
    options?: Omit<FetchOptions, 'method'>
  ): Promise<T> {
    try {
      return await $service<T>(endpoint, { ...options, method: 'PATCH' })
    } catch (err: any) {
      throw err.response
    } finally {
      loading.value = false
    }
  }
  async function $delete<T = never>(
    endpoint: NitroFetchRequest,
    options?: Omit<FetchOptions, 'method'>
  ): Promise<T> {
    try {
      return await $service<T>(endpoint, { ...options, method: 'DELETE' })
    } catch (err: any) {
      throw err.response
    } finally {
      loading.value = false
    }
  }
  return {
    loading,
    baseURL,
    $get,
    $post,
    $put,
    $patch,
    $delete,
  }
}
