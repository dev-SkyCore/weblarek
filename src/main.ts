import './scss/styles.scss';

import { Api } from './components/base/Api';
import { WebLarekApi } from './components/WebLarekApi';
import { API_URL } from './utils/constants';

import { Basket } from './components/models/Basket';
import { Buyer } from './components/models/Buyer';
import { Catalog } from './components/models/Catalog';
import { apiProducts } from './utils/data';



const [firstProduct, secondProduct, unavailableProduct] = apiProducts.items;

console.group('Каталог');

const catalog = new Catalog();
catalog.setProducts(apiProducts.items);

console.log('Все товары:', catalog.getProducts());
console.log('Найденный товар:', catalog.getProductById(firstProduct.id));
console.log('Несуществующий товар:', catalog.getProductById('missing'));
console.log('До выбора товара:', catalog.getSelectedProduct());

catalog.setSelectedProduct(firstProduct);
console.log('Выбранный товар:', catalog.getSelectedProduct());

console.groupEnd();

console.group('Корзина');

const basket = new Basket();
basket.addItem(firstProduct);
basket.addItem(secondProduct);
basket.addItem(firstProduct);
basket.addItem(unavailableProduct);

console.log('Товары после добавления:', basket.getItems());
console.log('Количество товаров:', basket.getCount());
console.log('Общая стоимость:', basket.getTotal());
console.log('Первый товар в корзине:', basket.hasItem(firstProduct.id));
console.log('Товар без цены в корзине:', basket.hasItem(unavailableProduct.id));

basket.removeItem(firstProduct);
console.log('Товары после удаления первого:', basket.getItems());
console.log('Первый товар после удаления:', basket.hasItem(firstProduct.id));

basket.clear();
console.log('Товары после очистки:', basket.getItems());
console.log('Стоимость после очистки:', basket.getTotal());

console.groupEnd();

console.group('Покупатель');

const buyer = new Buyer();
console.log('Ошибки до заполнения:', buyer.validate());

buyer.setData({ payment: 'card', address: 'ул. Лесная, 10' });
console.log('Ошибки после первого шага формы:', buyer.validate());

buyer.setData({ phone: '+7 999 999-99-99' });
console.log('Данные после обновления только телефона:', buyer.getData());

buyer.setData({ email: 'buyer@example.com' });
console.log('Ошибки после заполнения всех полей:', buyer.validate());

buyer.clear();
console.log('Данные после очистки:', buyer.getData());
console.log('Ошибки после очистки:', buyer.validate());

console.groupEnd();

const shopApi = new WebLarekApi(new Api(API_URL));

shopApi
  .getProducts()
  .then(({ items }) => {
    catalog.setProducts(items);
    console.log('Каталог с сервера:', catalog.getProducts());
  })
  .catch((error: unknown) => {
    console.error('Не удалось загрузить каталог:', error);
  });
