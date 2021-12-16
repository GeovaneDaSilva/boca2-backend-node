import GroupSchema from '../mongo-schemas/group-schema'
import AccountSchema from '../mongo-schemas/account-schema'
import AddressSchema from '../mongo-schemas/address-schema'


import { IGroupRepository } from '../../../../data/useCases/protocols/repositories/group-repository'
import { AddGroup, IGroup } from '../../../../domain/useCases/group/group'
import { GroupModel } from '../../../../domain/entities/group'



const props = 'id tags name items uploads description image activated price details created_at offer_price lb oz text_offer sku product'

export class GroupMongoRepository implements IGroupRepository {

  async add (groupData: AddGroup): Promise<IGroup> {
    try {
            
      const collection: IGroup | any = await GroupSchema.create(groupData)
      await collection.save()
      
      const { account } = collection
      

      await AccountSchema.findByIdAndUpdate(account, {group: collection._id})

      return collection
    } catch (error) {
      console.log(error)
    }
  }

  async getAll (): Promise<IGroup> {
    try {
      const collection: AddGroup | any = await GroupSchema.find({}, props)
      //.populate({path: 'category', model: CategorySchema})
      const total:number = await GroupSchema.count()

      let group: any = {
        groups: collection,
        total: total
      }
      return group
    } catch (error) {
      console.log(error)
    }
  }

  async getOne (name: string): Promise<IGroup> {
    try {
      const collection: AddGroup | any = await GroupSchema.findOne({ sku: name }, props)
        
        return collection
    } catch (error) {
      console.log(error)
    }
  }

  async getById (id: string): Promise<IGroup> {
    try {
      
      
      const collection: AddGroup | any = await GroupSchema.findById(id).
      populate({path: 'account',  model: AccountSchema}) 
     .populate({path: 'address',  model: AddressSchema}) 

      if(collection === null) return 
      
      const { _id, orders, address, account } = collection
      const newCollection = {id: _id, orders, address, account}
        
      return newCollection
    } catch (error) {
      console.log(error)
    }
  }

  async update (id: string, body: any): Promise<IGroup> {
    try {
      const collection: GroupModel | any = await GroupSchema.findByIdAndUpdate(id, body, {new: true, useFindAndModify: false})
  
        
        
        return collection
    } catch (error) {
      console.log(error)
    }
  }

  async delete (id: string): Promise<IGroup> {
    try {

      const collectionRemoveGroup: GroupModel | any = await GroupSchema.findByIdAndDelete(id)
      
      return  collectionRemoveGroup
      
    } catch (error) {
      console.log(error)
    }
  }

  async count (value?: any): Promise<IGroup> {
    try {
      const collection: GroupModel | any = await GroupSchema.count(value)
      return collection
    } catch (error) {
      console.log(error)
    }
  }

  async select (value: any): Promise<IGroup> {
    try {
      const collection: GroupModel | any = await GroupSchema.find(value, props)
      return collection
    } catch (error) {
      console.log(error)
    }
  }

  async getItemsByProductId (id: string): Promise<IGroup> {
    try {
      const collection: IGroup | any = await GroupSchema.findById(id, props)



      return collection
    } catch (error) {
      console.log(error)
    }
  }
}
