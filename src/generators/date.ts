import type { GeneratorDef } from '../types';
import { inZone } from '../lib/random';
import { str } from './shared';

export const date: GeneratorDef = {
  id: 'date', name: 'Dates', description: 'Local, UTC and date-time for timezone bugs', fields: ['local', 'utc', 'dateTime'],
  options: [
    { key: 'from', label: 'From', type: 'date', default: '2026-01-01' },
    { key: 'to', label: 'To', type: 'date', default: '2026-12-31' },
    { key: 'tz', label: 'Time zone', type: 'text', default: 'Asia/Yangon' },
    { key: 'time', label: 'Include time', type: 'check', default: true },
  ],
  validate: (o) => {
    if (str(o, 'from') > str(o, 'to')) return 'Invalid date range: From must be on or before To.';
    try { new Intl.DateTimeFormat('en', { timeZone: str(o, 'tz') }); } catch { return 'Unknown time zone: ' + str(o, 'tz'); }
    return '';
  },
  generate: (_i, o) => {
    const a = Date.parse(str(o, 'from') + 'T00:00:00Z'), b = Date.parse(str(o, 'to') + 'T23:59:59Z');
    const d = new Date(a + Math.random() * (b - a)), time = !!o.time, tz = str(o, 'tz');
    return {
      local: inZone(d, tz, time),
      utc: time ? d.toISOString() : d.toISOString().slice(0, 10),
      dateTime: `${d.toISOString().replace('Z', '')} (${tz})`,
    };
  },
};
