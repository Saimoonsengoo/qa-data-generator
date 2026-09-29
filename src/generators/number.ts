import type { GeneratorDef } from '../types';
import { num } from './shared';

export const number: GeneratorDef = {
  id: 'number', name: 'Numbers', description: 'Integers, decimals, currency, percentages', fields: ['value'],
  options: [
    { key: 'min', label: 'Minimum', type: 'number', default: 1 },
    { key: 'max', label: 'Maximum', type: 'number', default: 100 },
    { key: 'dec', label: 'Decimal places', type: 'number', default: 2 },
  ],
  validate: (o) =>
    num(o, 'min') > num(o, 'max') ? 'Maximum value must be greater than minimum value.'
    : num(o, 'dec') < 0 || num(o, 'dec') > 10 ? 'Decimal places must be between 0 and 10.' : '',
  generate: (_i, o) => ({ value: +(num(o, 'min') + Math.random() * (num(o, 'max') - num(o, 'min'))).toFixed(num(o, 'dec')) }),
};
