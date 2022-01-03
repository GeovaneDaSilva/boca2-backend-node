import { InvoiceMongoRepository } from './../../infra/db/mongodb/invoice-repository/invoice';
import { DeleteStateInvoiceController, GetInvoiceController, GetStateInvoiceController, RegisterInvoiceController } from '../../presentation/controllers/invoice/invoice';
import { DbInvoice } from '../../data/useCases/db-invoice/db-invoice';


export const makeRegisterInvoiceController = (): RegisterInvoiceController => {

  const invoiceMongoRepository = new InvoiceMongoRepository()
  const dbInvoice = new DbInvoice(invoiceMongoRepository)
  const registerInvoiceController = new RegisterInvoiceController(dbInvoice)
  return registerInvoiceController
}

export const makeDeleteStateInvoiceController = (): DeleteStateInvoiceController => {

  const invoiceMongoRepository = new InvoiceMongoRepository()
  const dbInvoice = new DbInvoice(invoiceMongoRepository)
  const deleteStateInvoiceController = new DeleteStateInvoiceController(dbInvoice, invoiceMongoRepository)
  return deleteStateInvoiceController
}

export const makeGetStateInvoiceController = (): GetStateInvoiceController => {

  const invoiceMongoRepository = new InvoiceMongoRepository()
  const dbInvoice = new DbInvoice(invoiceMongoRepository)
  const getStateInvoiceController = new GetStateInvoiceController(dbInvoice, invoiceMongoRepository)
  return getStateInvoiceController
}

export const makeGetInvoiceController = (): GetInvoiceController => {

  const invoiceMongoRepository = new InvoiceMongoRepository()
  const dbInvoice = new DbInvoice(invoiceMongoRepository)
  const getInvoiceController = new GetInvoiceController(dbInvoice, invoiceMongoRepository)
  return getInvoiceController
}


