import type { GeneratorDef } from '../types';
import { FIRST, GEO, LAST, POSITIONS, STATUS } from '../data';
import { pad, pick, phone } from '../lib/random';
import { domainOpt, phoneOpt, str } from './shared';

export const employee: GeneratorDef = {
  id: 'employee', name: 'Employees', description: 'Staff with position, department and branch',
  fields: ['employeeId', 'fullName', 'firstName', 'lastName', 'phone', 'email', 'position', 'department', 'branch', 'stateDivision', 'district', 'township', 'status'],
  options: [domainOpt, phoneOpt],
  generate: (i, o) => {
    const first = pick(FIRST), last = pick(LAST), [position, department] = pick(POSITIONS), [state, district, township] = pick(GEO);
    return {
      employeeId: 'EMP-' + pad(i + 1, 6), fullName: `${first} ${last}`, firstName: first, lastName: last, phone: phone(str(o, 'cc')),
      email: `${first}.${last}${i + 1}@${str(o, 'domain')}`.toLowerCase(), position, department, branch: `${state} Branch`,
      stateDivision: state, district, township, status: pick(STATUS),
    };
  },
};
