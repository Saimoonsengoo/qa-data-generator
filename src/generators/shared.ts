import type { OptionSpec, Opts } from '../types';

export const domainOpt: OptionSpec = { key: 'domain', label: 'Email domain', type: 'text', default: 'example.test' };
export const phoneOpt: OptionSpec = { key: 'cc', label: 'Phone prefix', type: 'text', default: '09' };
export const num = (o: Opts, k: string) => Number(o[k]);
export const str = (o: Opts, k: string) => String(o[k]);
