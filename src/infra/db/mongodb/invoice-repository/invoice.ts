
import { IOrder } from '../../../../domain/useCases/order/order';
import InvoiceSchema from '../mongo-schemas/invoice-schema';

import { InvoiceModel } from '../../../../domain/entities/invoice';
import { IInvoice } from '../../../../domain/useCases/invoice/invoice';
import { IInvoiceRepository } from '../../../../data/useCases/protocols/repositories/invoice-repository';



const props = 'id street city state zip country pre_default cord_address group_customer created_at orders '

export class InvoiceMongoRepository implements IInvoiceRepository {

  async add (invoiceData: InvoiceModel): Promise<IInvoice> {
    try {      
        

      const collection: InvoiceModel | any = await InvoiceSchema.create(invoiceData)

      

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
      
        
      return 
    } catch (error) {
      console.log(error)
    }
  }

  async update (id: string, body: any): Promise<InvoiceModel> {
    try {
  
        
        
        return null
    } catch (error) {
      console.log(error)
    }
  }

  async delete (id: string): Promise<InvoiceModel> {
    try {

     
      
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

  async select (value: any): Promise<InvoiceModel> {
    try {
      
      const collection: IOrder | any = await InvoiceSchema.find({group_customer: value})
    
      let orders: any = {
        orders: collection, 

      }
      return orders

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
