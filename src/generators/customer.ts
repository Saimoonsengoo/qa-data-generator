import type { GeneratorDef } from '../types';
import { CHANNELS, GEO, OUTLETS, STATUS } from '../data';
import { pad, pick, phone, r } from '../lib/random';
import { domainOpt, phoneOpt, str } from './shared';

export const customer: GeneratorDef = {
  id: 'customer', name: 'Customers', description: 'Outlets with channel type and township',
  fields: ['customerId', 'customerCode', 'customerName', 'phone', 'email', 'address', 'stateDivision', 'district', 'township', 'outletType', 'channelType', 'status'],
  options: [domainOpt, phoneOpt],
  generate: (i, o) => {
    const [state, district, township] = pick(GEO), outlet = pick(OUTLETS);
    return {
      customerId: 'CUS-' + pad(i + 1, 6), customerCode: 'CUST' + pad(i + 1, 3), customerName: `${outlet} ${pad(i + 1, 3)}`,
      phone: phone(str(o, 'cc')), email: `cust${i + 1}@${str(o, 'domain')}`, address: `No.${r(1, 200)}, Test Street`,
      stateDivision: state, district, township, outletType: outlet, channelType: pick(CHANNELS), status: pick(STATUS),
    };
  },
};
