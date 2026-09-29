import type { GeneratorDef } from '../types';
import { FIRST, LAST, ROLES, STATUS } from '../data';
import { pad, pick, phone, password, daysAgo } from '../lib/random';
import { domainOpt, phoneOpt, num, str } from './shared';

export const user: GeneratorDef = {
  id: 'user', name: 'Users', description: 'Accounts with role, status and test password',
  fields: ['userId', 'firstName', 'lastName', 'fullName', 'username', 'email', 'phone', 'password', 'status', 'role', 'createdDate'],
  options: [domainOpt, phoneOpt, { key: 'pwlen', label: 'Password length', type: 'number', default: 12 }],
  validate: (o) => (num(o, 'pwlen') < 8 || num(o, 'pwlen') > 64 ? 'Password length must be between 8 and 64.' : ''),
  generate: (i, o) => {
    const first = pick(FIRST), last = pick(LAST), username = `${first}.${last}`.toLowerCase() + (i + 1);
    return {
      userId: 'USR-' + pad(i + 1, 6), firstName: first, lastName: last, fullName: `${first} ${last}`, username,
      email: `${username}@${str(o, 'domain')}`, phone: phone(str(o, 'cc')), password: password(num(o, 'pwlen')),
      status: pick(STATUS), role: pick(ROLES), createdDate: daysAgo(365).toISOString().slice(0, 10),
    };
  },
};
