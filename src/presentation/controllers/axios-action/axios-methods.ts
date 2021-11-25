import { HttpClient } from './../../../data/useCases/protocols/http/http-client'
import { HttpRequest, HttpResponse } from './../../interfaces/http'
import { Controller } from './../../interfaces/controller'
import { serverError, success } from '../../helpers/http-helper'
import { AxiosGet } from '../../../domain/useCases/get-axios'
export class AxiosListController implements Controller {
  constructor (
    private readonly axiosGet: AxiosGet,
    private readonly httpClient: HttpClient) {
    this.axiosGet = axiosGet
    this.httpClient = httpClient
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const params = {
        email: httpRequest.body.email,
        password: httpRequest.body.password
      }
      const data = await this.httpClient.request({
        url: 'http://localhost:3000/api/login',
        method: 'post',
        body: params
      })

      console.log(data)
      const post = await this.axiosGet.list(data.body)

      return success(post)
    } catch (error) {
      return serverError(error.message)
    }
  }
}
