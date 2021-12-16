import { AddressModel } from './../../../../domain/entities/address';
import { IAddressRepository } from './../../../../data/useCases/protocols/repositories/address-repository';
import GroupSchema from '../mongo-schemas/group-schema'
import AccountSchema from '../mongo-schemas/account-schema'


import { AddGroup, IGroup } from '../../../../domain/useCases/group/group'
import { GroupModel } from '../../../../domain/entities/group'
import { IAddress } from '../../../../domain/useCases/address/address';
import AddressSchema from '../mongo-schemas/address-schema';



const props = 'id tags name items uploads description image activated price details created_at offer_price lb oz text_offer sku product'

export class AddressMongoRepository implements IAddressRepository {

  async add (addressData: AddressModel): Promise<IAddress> {
    try {      
      
      const collection: IAddress | any  = await AddressSchema.create(addressData)
      const { _id, address, group_customer, created_at } = collection

      const newCollection: any  = {id: _id, address, group_customer, created_at }

      const groupDB:  any = await GroupSchema.findById(newCollection.group_customer)

      console.log('aquiii', groupDB.address);
      
      
      const resultPush = await groupDB.address.push(newCollection.id)

      await groupDB.save()


      console.log('send Push', resultPush);


      return newCollection
    } catch (error) {
      console.log(error)
    }
  }

  async getAll (): Promise<IAddress> {
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

  async getOne (name: string): Promise<IAddress> {
    try {
      const collection: AddGroup | any = await GroupSchema.findOne({ sku: name }, props)
        
        return collection
    } catch (error) {
      console.log(error)
    }
  }

  async getById (id: string): Promise<IAddress> {
    try {
      const collection: AddGroup | any = await GroupSchema.findById(id).
      populate({path: 'account',  model: AccountSchema}) 
      
      const { _id, orders, address, account } = collection
      const newCollection = {id: _id, orders, address, account}
        
      return newCollection
    } catch (error) {
      console.log(error)
    }
  }

  async update (id: string, body: any): Promise<IAddress> {
    try {
      const collection: GroupModel | any = await GroupSchema.findByIdAndUpdate(id, body, {new: true, useFindAndModify: false})
  
        
        
        return collection
    } catch (error) {
      console.log(error)
    }
  }

  async delete (id: string): Promise<IAddress> {
    try {

      const collectionRemoveGroup: GroupModel | any = await GroupSchema.findByIdAndDelete(id)
      
      return  collectionRemoveGroup
      
    } catch (error) {
      console.log(error)
    }
  }

  async count (value?: any): Promise<IAddress> {
    try {
      const collection: GroupModel | any = await GroupSchema.count(value)
      return collection
    } catch (error) {
      console.log(error)
    }
  }

  async select (value: any): Promise<IAddress> {
    try {
      const collection: GroupModel | any = await GroupSchema.find(value, props)
      return collection
    } catch (error) {
      console.log(error)
    }
  }

  async getItemsByProductId (id: string): Promise<IAddress> {
    try {
      const collection: IGroup | any = await GroupSchema.findById(id, props)



      return collection
    } catch (error) {
      console.log(error)
    }
  }
}
