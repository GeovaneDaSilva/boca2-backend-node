import { InvoiceMongoRepository } from './../../infra/db/mongodb/invoice-repository/invoice';
import { RegisterInvoiceController } from '../../presentation/controllers/invoice/invoice';
import { DbInvoice } from '../../data/useCases/db-invoice/db-invoice';


export const makeRegisterInvoiceController = (): RegisterInvoiceController => {

  const invoiceMongoRepository = new InvoiceMongoRepository()
  const dbInvoice = new DbInvoice(invoiceMongoRepository)
  const registerInvoiceController = new RegisterInvoiceController(dbInvoice)
  return registerInvoiceController
}

