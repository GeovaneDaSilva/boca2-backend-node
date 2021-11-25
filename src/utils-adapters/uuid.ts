import shortid from 'shortid'
import { Iuuid } from '../infra/adapters/Iuuid'

export class Uuid implements Iuuid {
  async id (): Promise<string> {
    const id = await shortid.generate()

    return id
  }
}
