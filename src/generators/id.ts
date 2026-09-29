import type { GeneratorDef } from '../types';
import { pad, r, uuid } from '../lib/random';
import { num, str } from './shared';

export const id: GeneratorDef = {
  id: 'id', name: 'IDs', description: 'UUID, incremental, numeric or random IDs', fields: ['id'],
  options: [
    { key: 'kind', label: 'Type', type: 'select', default: 'Incremental', choices: ['Incremental', 'UUID v4', 'Numeric', 'Random'] },
    { key: 'prefix', label: 'Prefix', type: 'text', default: 'USR' },
    { key: 'start', label: 'Starting number', type: 'number', default: 1 },
    { key: 'padn', label: 'Padding', type: 'number', default: 6 },
  ],
  generate: (i, o) => {
    const kind = str(o, 'kind'), prefix = str(o, 'prefix');
    if (kind === 'UUID v4') return { id: uuid() };
    if (kind === 'Numeric') return { id: String(r(1e8, 9e8)) };
    if (kind === 'Random') return { id: `${prefix}-${Math.random().toString(36).slice(2, 10).toUpperCase()}` };
    return { id: `${prefix}-${pad(num(o, 'start') + i, num(o, 'padn'))}` };
  },
};
