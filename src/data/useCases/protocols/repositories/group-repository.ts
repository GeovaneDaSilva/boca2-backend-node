import { AddGroup, IGroup } from '../../../../domain/useCases/group/group'

export interface IGroupRepository {
  add: (accountData: AddGroup) => Promise<IGroup>
  getAll: () => Promise<IGroup>
  getOne: (email: string) => Promise<IGroup>
  getById: (id: string) => Promise<IGroup>
  delete: (id: string) => Promise<IGroup>
  update: (id: string, body: any) => Promise<IGroup>
  count: (value?: any) => Promise<IGroup>
  select: (value?: any) => Promise<IGroup>


}


