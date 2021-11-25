import { AxiosGet } from './../../domain/useCases/get-axios'
export class DbAxios implements AxiosGet {
  async list (data: any): Promise<void> {
    return data
  }
}
