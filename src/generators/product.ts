import type { GeneratorDef } from '../types';
import { CATEGORIES, STATUS, UOMS } from '../data';
import { pad, pick, r } from '../lib/random';
import { num } from './shared';

export const product: GeneratorDef = {
  id: 'product', name: 'Products', description: 'SKUs with price and quantity ranges',
  fields: ['productId', 'productCode', 'productName', 'sku', 'category', 'brand', 'uom', 'price', 'quantity', 'status'],
  options: [
    { key: 'pmin', label: 'Min price', type: 'number', default: 1000 },
    { key: 'pmax', label: 'Max price', type: 'number', default: 50000 },
    { key: 'qmin', label: 'Min quantity', type: 'number', default: 1 },
    { key: 'qmax', label: 'Max quantity', type: 'number', default: 100 },
  ],
  validate: (o) =>
    num(o, 'pmin') > num(o, 'pmax') ? 'Maximum price must be greater than minimum price.'
    : num(o, 'qmin') > num(o, 'qmax') ? 'Maximum quantity must be greater than minimum quantity.' : '',
  generate: (i, o) => ({
    productId: 'PROD-' + pad(i + 1, 6), productCode: 'PRD' + pad(i + 1, 3), productName: 'Test Product ' + pad(i + 1, 3),
    sku: 'SKU-' + pad(i + 1, 6), category: pick(CATEGORIES), brand: 'Test Brand', uom: pick(UOMS),
    price: r(num(o, 'pmin'), num(o, 'pmax')), quantity: r(num(o, 'qmin'), num(o, 'qmax')), status: pick(STATUS),
  }),
};
