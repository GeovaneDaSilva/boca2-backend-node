import { AddressModel } from '../../entities/address';
import { GroupModel } from '../../entities/group';

export interface IGroup {
  _id?: string
  id?: string
  address?: any
  orders?: any
  account: any
  
  created_date?: string

}

export interface AddGroup {
  create: (data: GroupModel) => Promise<IGroup>
  get: (id?: GroupModel) => Promise<IGroup>
  update: (id: GroupModel) => Promise<IGroup>
  delete: (id: GroupModel) => Promise<IGroup>
}
