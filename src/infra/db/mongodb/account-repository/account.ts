import { AccountModel } from '../../../../domain/entities/account'
import { AddAccountModel } from '../../../../domain/useCases/account/add-account'
import AccountSchema from '../mongo-schemas/account-schema'
import { IAccountRepository } from '../../../../data/useCases/protocols/repositories/account-repository'



const props = 'id, phone name last_name email role image created_date activated activated_at devices'
export class AccountMongoRepository implements IAccountRepository {

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    try {
      const collection: AddAccountModel | any = await AccountSchema.create(accountData)

      const { _id, name, email, last_name, phone, role, activated, created_date } = collection
      const newCollection: any = { id: _id, name: name, last_name, email: email, role: role, phone, activated, created_date: created_date }

      await collection.save()
      return newCollection
    } catch (error) {
      console.log(error)
    }
  }

  async getAll (): Promise<AccountModel> {
    try {
      const collection: AddAccountModel | any = await AccountSchema.find({}, props)
      return collection
    } catch (error) {
      console.log(error)
    }
  }

  async getOne (email: string): Promise<AccountModel> {
    try {
      const collection: AddAccountModel | any = await AccountSchema.findOne({ email: email }, )

      return collection
    } catch (error) {
      console.log(error)
    }
  }

  async getById (id: string): Promise<AccountModel> {
    try {
      const collection: AddAccountModel | any = await AccountSchema.findById(id, props)
      const { _id, name, email, last_name, phone, role, activated, activated_at, created_date } = collection
      const newCollection: any = { id: _id, name: name, last_name, email: email, role: role, phone, activated, activated_at, created_date: created_date }

      return newCollection
    } catch (error) {
      console.log(error)
    }
  }

  async update (id: string, body: any): Promise<AccountModel> {
    try {
      const collection: AddAccountModel | any = await AccountSchema.findByIdAndUpdate(id, body, {new: true, useFindAndModify: false})
      const { _id, name, email, last_name, phone, role, activated, created_date, activated_at } = collection
      const newCollection: any = { id: _id, name: name, last_name, email: email, role: role, phone, activated, created_date: created_date, activated_at }

      return newCollection
    } catch (error) {
      console.log(error)
    }
  }

  async delete (id: string): Promise<AccountModel> {
    try {
      const collection: AddAccountModel | any = await AccountSchema.findByIdAndDelete(id)

      const { _id, name, email, last_name, phone, role, activated, created_date, activated_at } = collection
      const newCollection: any = { id: _id, name: name, last_name, email: email, role: role, phone, activated, created_date: created_date, activated_at }
      return newCollection
    } catch (error) {
      console.log(error)
    }
  }

  async count (value?: any): Promise<AccountModel> {
    try {
      const collection: AddAccountModel | any = await AccountSchema.count(value)
      return collection
    } catch (error) {
      console.log(error)
    }
  }

  async select (value: any): Promise<AccountModel> {
    try {
      const collection: AddAccountModel | any = await AccountSchema.find(value, props)
      return collection
    } catch (error) {
      console.log(error)
    }
  }
}
