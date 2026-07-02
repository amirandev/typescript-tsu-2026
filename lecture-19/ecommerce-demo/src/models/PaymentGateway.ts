export interface PaymentResult {
  success: boolean;
  transactionId: string;
  message: string;
}

export interface PaymentGateway {
  readonly name: string;
  charge(amount: number, currency: string): Promise<PaymentResult>;
  refund(transactionId: string): Promise<boolean>;
}

export class StripeGateway implements PaymentGateway {
  readonly name = 'Stripe';

  async charge(amount: number, currency: string): Promise<PaymentResult> {
    await new Promise(r => setTimeout(r, 500));
    return {
      success: true,
      transactionId: `stripe_${Date.now()}`,
      message: `Charged ${currency} ${amount} via Stripe`,
    };
  }

  async refund(_transactionId: string): Promise<boolean> {
    await new Promise(r => setTimeout(r, 300));
    return true;
  }
}

export class TBCPayGateway implements PaymentGateway {
  readonly name = 'TBC Pay';

  async charge(amount: number, currency: string): Promise<PaymentResult> {
    await new Promise(r => setTimeout(r, 800));
    return {
      success: true,
      transactionId: `tbc_${Date.now()}`,
      message: `Charged ${currency} ${amount} via TBC Pay`,
    };
  }

  async refund(_transactionId: string): Promise<boolean> {
    await new Promise(r => setTimeout(r, 400));
    return true;
  }
}
