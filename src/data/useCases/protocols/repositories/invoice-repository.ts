import { IOrder } from './../../../../domain/useCases/order/order';
import { OrderModel } from "../../../../domain/entities/order"
import { InvoiceModel } from '../../../../domain/entities/invoice';
import { IInvoice } from '../../../../domain/useCases/invoice/invoice';


export interface IInvoiceRepository {
  add: (orderData: InvoiceModel) => Promise<IInvoice>
  getAll: () => Promise<IInvoice>
  getOne: (email: string) => Promise<IInvoice>
  getById: (id: string) => Promise<IInvoice>
  delete: (id: string) => Promise<IInvoice>
  update: (id: string, body: any) => Promise<IInvoice>
  count: (value?: any) => Promise<IInvoice>
  select: (value?: any) => Promise<IInvoice>


}


