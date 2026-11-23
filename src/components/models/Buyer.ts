import type { BuyerErrors, IBuyer, TPayment } from '../../types';

export class Buyer {
  private payment: TPayment | null = null;
  private address = '';
  private phone = '';
  private email = '';

  setData(data: Partial<IBuyer>): void {
    if (data.payment !== undefined) {
      this.payment = data.payment;
    }
    this.address = data.address ?? this.address;
    this.phone = data.phone ?? this.phone;
    this.email = data.email ?? this.email;
  }

  getData(): IBuyer {
    return {
      payment: this.payment,
      address: this.address,
      phone: this.phone,
      email: this.email,
    };
  }

  clear(): void {
    this.setData({ payment: null, address: '', phone: '', email: '' });
  }

  validate(): BuyerErrors {
    const errors: BuyerErrors = {};

    if (this.payment === null) {
      errors.payment = 'Выберите способ оплаты';
    }
    if (this.address.trim() === '') {
      errors.address = 'Укажите адрес доставки';
    }
    if (this.phone.trim() === '') {
      errors.phone = 'Укажите телефон';
    }
    if (this.email.trim() === '') {
      errors.email = 'Укажите электронную почту';
    }

    return errors;
  }
}
