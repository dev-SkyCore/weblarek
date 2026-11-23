import type { IApi, IOrderRequest, IOrderResponse, IProductsResponse } from '../types';

export class WebLarekApi {
  constructor(private readonly api: IApi) {}

  getProducts(): Promise<IProductsResponse> {
    return this.api.get<IProductsResponse>('/product/');
  }

  createOrder(order: IOrderRequest): Promise<IOrderResponse> {
    return this.api.post<IOrderResponse>('/order/', order);
  }
}
