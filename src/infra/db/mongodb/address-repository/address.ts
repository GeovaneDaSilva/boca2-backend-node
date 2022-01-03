import { AddressModel } from './../../../../domain/entities/address';
import { IAddressRepository } from './../../../../data/useCases/protocols/repositories/address-repository';
import GroupSchema from '../mongo-schemas/group-schema'


import { AddGroup, IGroup } from '../../../../domain/useCases/group/group'
import { GroupModel } from '../../../../domain/entities/group'
import { IAddress } from '../../../../domain/useCases/address/address';
import AddressSchema from '../mongo-schemas/address-schema';



const props = 'id street city state zip country pre_default cord_address group_customer created_at orders '

export class AddressMongoRepository implements IAddressRepository {

  async add (addressData: AddressModel): Promise<IAddress> {
    try {      
      
      const collection: IAddress | any  = await AddressSchema.create(addressData)
      const { _id, orders, address, city, state, zip, country, pre_default, cord_address, group_customer, created_at } = collection
      const newCollection = {
        id: _id, 
        orders: orders || null, 
        address, 
        city, state, zip, 
        country, pre_default, 
        cord_address, 
        group_customer, 
        created_at }

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
      const collection: AddGroup | any = await AddressSchema.findById(id)
      if(collection === null) return 
      const { _id, orders, address, city, state, zip, country, pre_default, cord_address, group_customer, created_at } = collection
      const newCollection = {
        id: _id, 
        orders: orders || null, 
        address, 
        group_customer, 
        city, state, zip, 
        country, pre_default, 
        cord_address, 
        created_at }
        
      return newCollection
    } catch (error) {
      console.log(error)
    }
  }

  async update (id: string, body: any): Promise<IAddress> {
    try {
      const collection: GroupModel | any = await AddressSchema.findByIdAndUpdate(id, body, {new: true, useFindAndModify: false})
  
        
        
        return collection
    } catch (error) {
      console.log(error)
    }
  }

  async delete (id: string): Promise<IAddress> {
    try {

      const collectionRemoveAddress: GroupModel | any = await AddressSchema.findByIdAndDelete(id)
      
      if(collectionRemoveAddress === null) return 
      const { _id, city, state, zip, country, pre_default, cord_address, group_customer, created_at } = collectionRemoveAddress
      const newCollection: any = {
        id: _id, 
        group_customer, 
        city, state, zip, 
        country, pre_default, 
        cord_address, 
        created_at }


        const collectionGroup: GroupModel | any = await GroupSchema.findById(collectionRemoveAddress.group_customer)
  
        
      let group = await collectionGroup.address
    
      
      const index = group.indexOf(id);
      if (index > -1) {
        group.splice(index, 1);
      }
      
      await GroupSchema.findByIdAndUpdate({_id: collectionRemoveAddress.group_customer}, {$set: {address: group}})
        
      return collectionRemoveAddress
      
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
