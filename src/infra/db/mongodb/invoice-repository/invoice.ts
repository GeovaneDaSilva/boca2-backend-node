
import { IOrder } from '../../../../domain/useCases/order/order';
import InvoiceSchema from '../mongo-schemas/invoice-schema';

import { InvoiceModel } from '../../../../domain/entities/invoice';
import { IInvoice } from '../../../../domain/useCases/invoice/invoice';
import { IInvoiceRepository } from '../../../../data/useCases/protocols/repositories/invoice-repository';



const props = 'id street city state zip country pre_default cord_address group_customer customer_phone note created_at orders deleted updated_at'

export class InvoiceMongoRepository implements IInvoiceRepository {

  async add (invoiceData: InvoiceModel): Promise<IInvoice> {
    try {      
        
      const count: InvoiceModel | any = await InvoiceSchema.count()
      invoiceData.order_number = count + 1
      invoiceData.deleted = false
      const collection: InvoiceModel | any = await InvoiceSchema.create(invoiceData)
      
      collection.created_at = new Date()

      await collection.save()

      return collection
    } catch (error) {
      console.log(error)
    }
  }

  async getAll (): Promise<InvoiceModel> {
    try {
      const collection: InvoiceModel | any = await InvoiceSchema.find()
      const count: IOrder | any =  await InvoiceSchema.count()
      let invoices: any = {
        invoices: collection, 
        orders_total: count
      }
      return invoices
    } catch (error) {
      console.log(error)
    }
  }

  async getOne (name: string): Promise<InvoiceModel> {
    try {
      const collection = null
        
        return collection
    } catch (error) {
      console.log(error)
    }
  }

  async getById (id: string): Promise<InvoiceModel> {
    try {
      
      const collection: InvoiceModel | any = await InvoiceSchema.findById(id)

      return collection
    } catch (error) {
      console.log(error)
    }
  }

  async update (id: string, body: any): Promise<InvoiceModel> {
    try {
  
      const collection: InvoiceModel | any = await InvoiceSchema.findByIdAndUpdate(id, body)

        
      return collection
    } catch (error) {
      console.log(error)
    }
  }

  async delete (id: string): Promise<InvoiceModel> {
    try {

      const collection: InvoiceModel | any = await InvoiceSchema.findById(id)
      
      collection.deleted = true
      collection.updated_at = new Date()

      collection.save()

      return collection
      
      return  
      
    } catch (error) {
      console.log(error)
    }
  }

  async count (value?: any): Promise<InvoiceModel> {
    try {
    
      return 
    } catch (error) {
      console.log(error)
    }
  }

  async select (value: Boolean): Promise<InvoiceModel> {
    try {
      
      let collection: IInvoice | any = await InvoiceSchema.find({paid: value})
      
      let newCollection = collection.filter(invoice => (invoice.deleted) === false)
      
      const count = await newCollection.length
      
      let invoices: any = {
        invoices: newCollection,
        total: count

      }
      return invoices

    } catch (error) {
      console.log(error)
    }
  }

  async getItemsByProductId (id: string): Promise<InvoiceModel> {
    try {

      return 
    } catch (error) {
      console.log(error)
    }
  }
}
