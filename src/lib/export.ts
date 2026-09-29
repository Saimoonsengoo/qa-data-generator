import type { Row } from '../types';

export const toCsv = (rows: Row[], cols: string[]) => {
  const cell = (v: unknown) => {
    const s = String(v ?? '');
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [cols.join(','), ...rows.map((r) => cols.map((c) => cell(r[c])).join(','))].join('\n');
};

export const download = (name: string, text: string, type: string) => {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], { type }));
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 500);
};

export const copyText = async (s: string) => {
  try {
    await navigator.clipboard.writeText(s);
  } catch {
    const t = document.createElement('textarea');
    t.value = s;
    document.body.appendChild(t);
    t.select();
    document.execCommand('copy');
    t.remove();
  }
};
