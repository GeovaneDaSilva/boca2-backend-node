import { IInvoice, IInvoiceUseCase } from './../../../domain/useCases/invoice/invoice';
import { InvoiceModel } from '../../../domain/entities/invoice';
import { IInvoiceRepository } from '../protocols/repositories/invoice-repository';

export class DbInvoice implements IInvoiceUseCase {

  constructor(private readonly iInvoiceRepository: IInvoiceRepository){
    this.iInvoiceRepository = iInvoiceRepository
  }
   async add (orderData: InvoiceModel): Promise<IInvoice> {

    const insertInvoiceDb = await this.iInvoiceRepository.add(orderData)
    return new Promise(resolve => resolve(
      insertInvoiceDb
      
    ))
  }

  async get (invoice?: InvoiceModel): Promise<IInvoice> {
    
    return new Promise(resolve => resolve(
      invoice
      
    ))
  }

  async delete (invoice: InvoiceModel | any): Promise<IInvoice> {
    const deleteInvoice = await this.iInvoiceRepository.delete(invoice)
    return new Promise(resolve => resolve(
      deleteInvoice
      
    ))
  }

  async select (value: Boolean | any): Promise<IInvoice> {
    const getInvoice = await this.iInvoiceRepository.select(value)
    return new Promise(resolve => resolve(
      getInvoice
      
    ))
  }

}
