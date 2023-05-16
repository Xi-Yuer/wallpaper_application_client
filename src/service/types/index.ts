export interface Method {
  /** HTTP 请求 OPTIONS */
  OPTIONS
  /** HTTP 请求 GET */
  GET
  /** HTTP 请求 HEAD */
  HEAD
  /** HTTP 请求 POST */
  POST
  /** HTTP 请求 PUT */
  PUT
  /** HTTP 请求 DELETE */
  DELETE
  /** HTTP 请求 TRACE */
  TRACE
  /** HTTP 请求 CONNECT */
  CONNECT
}

export interface IConfig {
  url: string
  data?: any
  method?: keyof Method
  showToast?: boolean
  isPermission?: boolean
}

export interface IResponse<T> {
  data: T
  message: string
  statusCode: number
  timestamp: string
}
