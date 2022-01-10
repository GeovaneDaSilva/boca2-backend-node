import { InvoiceMongoRepository } from './../../infra/db/mongodb/invoice-repository/invoice';
import { DeleteStateInvoiceController, EditInvoiceController, GetInvoiceController, GetStateInvoiceController, RegisterInvoiceController } from '../../presentation/controllers/invoice/invoice';
import { DbInvoice } from '../../data/useCases/db-invoice/db-invoice';
import { StripePayment } from '../../utils-adapters/stripe-payment';
import { MailProvider } from '../../utils-adapters/nodemailer-adapter';


export const makeRegisterInvoiceController = (): RegisterInvoiceController => {

  const invoiceMongoRepository = new InvoiceMongoRepository()
  const stripePayment = new StripePayment()
  const mailProvider = new MailProvider()
  const dbInvoice = new DbInvoice(invoiceMongoRepository, stripePayment, mailProvider)
  const registerInvoiceController = new RegisterInvoiceController(dbInvoice)
  return registerInvoiceController
}

export const makeDeleteStateInvoiceController = (): DeleteStateInvoiceController => {

  const invoiceMongoRepository = new InvoiceMongoRepository()
  const stripePayment = new StripePayment()
  const mailProvider = new MailProvider()
  const dbInvoice = new DbInvoice(invoiceMongoRepository, stripePayment, mailProvider)
  const deleteStateInvoiceController = new DeleteStateInvoiceController(dbInvoice, invoiceMongoRepository)
  return deleteStateInvoiceController
}

export const makeGetStateInvoiceController = (): GetStateInvoiceController => {

  const invoiceMongoRepository = new InvoiceMongoRepository()
  const stripePayment = new StripePayment()
  const mailProvider = new MailProvider()
  const dbInvoice = new DbInvoice(invoiceMongoRepository, stripePayment, mailProvider)
  const getStateInvoiceController = new GetStateInvoiceController(dbInvoice, invoiceMongoRepository)
  return getStateInvoiceController
}

export const makeGetInvoiceController = (): GetInvoiceController => {

  const invoiceMongoRepository = new InvoiceMongoRepository()
  const stripePayment = new StripePayment()
  const mailProvider = new MailProvider()
  const dbInvoice = new DbInvoice(invoiceMongoRepository, stripePayment, mailProvider)
  const getInvoiceController = new GetInvoiceController(dbInvoice, invoiceMongoRepository)
  return getInvoiceController
}

export const makeEditInvoiceController = (): EditInvoiceController => {

  const invoiceMongoRepository = new InvoiceMongoRepository()
  const stripePayment = new StripePayment()
  const mailProvider = new MailProvider()
  const dbInvoice = new DbInvoice(invoiceMongoRepository, stripePayment, mailProvider)
  const editInvoiceController = new EditInvoiceController(dbInvoice, invoiceMongoRepository)
  return editInvoiceController
}




