
import { GroupModel } from '../../../domain/entities/group'
import { AddGroup, IGroup } from '../../../domain/useCases/group/group'
import { IGroupRepository } from '../protocols/repositories/group-repository'


export class DbAddGroup implements AddGroup {

  constructor(private readonly iGroupRepository: IGroupRepository){
    this.iGroupRepository = iGroupRepository
  }
  

  async create (data: GroupModel): Promise<IGroup> {

    const group: any = { account: data }
    
    const groupDb: any = await this.iGroupRepository.add(group)

    console.log(groupDb);
    
    
    return new Promise(resolve => resolve(
      groupDb
      
    ))
  }

  async get (group: GroupModel): Promise<IGroup> {
    
    return new Promise(resolve => resolve(
      group
      
    ))
  }

  async update (group: GroupModel): Promise<IGroup> {
    
    return new Promise(resolve => resolve(
      group
      
    ))
  }

  async delete (group: GroupModel): Promise<IGroup> {
    
    return new Promise(resolve => resolve(
      group
      
    ))
  }
}
