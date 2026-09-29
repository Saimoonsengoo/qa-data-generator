import type { GeneratorDef } from '../types';
import { FIRST, LAST } from '../data';
import { daysAgo, phone, pick, r, uuid } from '../lib/random';
import { str } from './shared';

const SAMPLE = `{
  "name": "string",
  "age": "number",
  "email": "email",
  "active": "boolean",
  "tags": ["string"],
  "profile": { "phone": "phone", "id": "uuid", "joined": "date" }
}`;

const LEAVES: Record<string, () => unknown> = {
  string: () => `${pick(FIRST)} ${pick(LAST)}`,
  number: () => r(18, 65),
  boolean: () => Math.random() < 0.5,
  email: () => `${pick(FIRST).toLowerCase()}${r(1, 999)}@example.test`,
  phone: () => phone(),
  uuid,
  date: () => daysAgo(900).toISOString().slice(0, 10),
};

const fill = (t: unknown): unknown => {
  if (Array.isArray(t)) return [0, 1, 2].map(() => fill(t[0]));
  if (t && typeof t === 'object') return Object.fromEntries(Object.entries(t).map(([k, v]) => [k, fill(v)]));
  const leaf = LEAVES[String(t)];
  if (!leaf) throw new Error(`Unknown type "${String(t)}". Use ${Object.keys(LEAVES).join(', ')}, [arrays] or {nested objects}.`);
  return leaf();
};

export const json: GeneratorDef = {
  id: 'json', name: 'JSON', description: 'Generate objects from your own schema', fields: [],
  options: [{ key: 'schema', label: 'Schema', type: 'textarea', default: SAMPLE }],
  generate: (_i, o) => {
    let schema: unknown;
    try { schema = JSON.parse(str(o, 'schema')); } catch (e) { throw new Error('Invalid JSON schema: ' + (e as Error).message); }
    return fill(schema) as Record<string, unknown>;
  },
};
