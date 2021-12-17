import { serverError } from "./../presentation/helpers/http-helper";
import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe_Public_key = process.env.PUBLIC_KEY;

export interface IAddress {
  line1: string;
  postal_code: string;
  city: string;
  state: string;
  country: string;
}

export interface ICustomer {
  email: string;
  source: any;
  name: string;
  address: IAddress;
}

export interface IStripeCard {
  number: number;
  exp_month: number;
  exp_year: number;
  cvc: string;
}

let param = { card: {} };
param.card = {
  number: "4242424242424242",
  exp_month: 2,
  exp_year: 2024,
  cvc: "212",
};

export interface IStripe {
  amount: number;
  currency: string;
  source: any;
  description: any;
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2020-08-27",
});

export interface IPayment {
  createCustomer: (customerReq?: ICustomer) => Promise<any>;
  creatCard: (body?: IStripeCard) => Promise<any>;
  pay: (body: IStripe) => Promise<any>;
}

export class StripePayment implements IPayment {

  async createCustomer(customerReq?: ICustomer): Promise<any> {
    
    const customer = await stripe.customers.create(customerReq);

    return new Promise((resolve) => resolve(customer));
  }

  async creatCard(body?: any): Promise<any> {
    const getCard = await stripe.tokens.create(body);

    return new Promise((resolve) => resolve(getCard));
  }

  async pay(body: IStripe): Promise<IStripe> {
    const charge = await stripe.charges.create({
      amount: body.amount * 100,
      currency: body.currency,
      source: body.source,
      description: body.description,
    });
    return charge;
  }
}
