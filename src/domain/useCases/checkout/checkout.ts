


export interface ICheckout {
  toPay: (gateWay: any) => Promise<any>
}
