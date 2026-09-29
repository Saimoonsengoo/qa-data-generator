import type { GeneratorDef } from '../types';
import { num } from './shared';

export const boundary: GeneratorDef = {
  id: 'boundary', name: 'Boundary', description: 'Min/max edge values for any numeric field', fields: ['case', 'value'], singleShot: true,
  options: [
    { key: 'field', label: 'Field name', type: 'text', default: 'Quantity' },
    { key: 'min', label: 'Minimum', type: 'number', default: 1 },
    { key: 'max', label: 'Maximum', type: 'number', default: 100 },
  ],
  validate: (o) => (num(o, 'min') > num(o, 'max') ? 'Maximum value must be greater than minimum value.' : ''),
  generate: () => ({}),
  generateAll: (o) => {
    const a = num(o, 'min'), b = num(o, 'max');
    const cases: [string, number | string][] = [
      ['Below minimum', a - 1], ['Minimum', a], ['Minimum + 1', a + 1], ['Maximum - 1', b - 1], ['Maximum', b],
      ['Maximum + 1', b + 1], ['Zero', 0], ['Negative', -1], ['Empty', ''], ['Very large', Number.MAX_SAFE_INTEGER],
    ];
    return cases.map(([c, value]) => ({ case: c, value }));
  },
};
