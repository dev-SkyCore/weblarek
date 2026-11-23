import type { BuyerErrors, IBuyer, TPayment } from '../../types';

export class Buyer {
  private payment: TPayment = '';
  private address = '';
  private phone = '';
  private email = '';

  setData(data: Partial<IBuyer>): void {
    this.payment = data.payment ?? this.payment;
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
    this.setData({ payment: '', address: '', phone: '', email: '' });
  }

  validate(): BuyerErrors {
    const errors: BuyerErrors = {};

    if (this.payment === '') {
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
