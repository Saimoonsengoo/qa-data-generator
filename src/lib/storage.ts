import type { Preset } from '../types';

const KEY = 'qatdg:presets';

export const loadPresets = (): Preset[] => {
  try { return JSON.parse(localStorage.getItem(KEY) ?? '[]') as Preset[]; } catch { return []; }
};
export const savePresets = (p: Preset[]) => {
  try { localStorage.setItem(KEY, JSON.stringify(p)); } catch { /* storage unavailable */ }
};
