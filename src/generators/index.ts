import type { GeneratorDef } from '../types';
import { user } from './user';
import { customer } from './customer';
import { employee } from './employee';
import { product } from './product';
import { id } from './id';
import { date } from './date';
import { number } from './number';
import { boundary } from './boundary';
import { json } from './json';

/** Register new generators here. The sidebar, dashboard and presets pick them up automatically. */
export const GENERATORS: GeneratorDef[] = [user, customer, employee, product, id, date, number, boundary, json];
export const byId = (id: string) => GENERATORS.find((g) => g.id === id);
