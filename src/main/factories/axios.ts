import { DbAxios } from './../../data/useCases/data-axios'
import { AxiosHttpClient } from '../../infra/http/axios-http-client/axios-http-client'
import { AxiosListController } from '../../presentation/controllers/axios-action/axios-methods'

export const makeAxiosListControllerController = (): AxiosListController => {
  const dbAxios = new DbAxios()
  const axiosHttpClient = new AxiosHttpClient()
  const axiosListController = new AxiosListController(dbAxios, axiosHttpClient)
  return axiosListController
}
