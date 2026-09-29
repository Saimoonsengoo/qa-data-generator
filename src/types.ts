export type Row = Record<string, unknown>;
export type OptValue = string | number | boolean;
export type Opts = Record<string, OptValue>;
export type Format = 'table' | 'json' | 'csv';

export interface OptionSpec {
  key: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'select' | 'check' | 'textarea';
  default: OptValue;
  choices?: string[];
}

export interface GeneratorDef {
  id: string;
  name: string;
  description: string;
  /** Column names. Leave empty for raw generators (e.g. JSON) that output objects as-is. */
  fields: string[];
  options: OptionSpec[];
  /** No quantity input; generateAll produces the whole set (e.g. Boundary). */
  singleShot?: boolean;
  validate?: (o: Opts) => string;
  generate: (index: number, o: Opts) => Row;
  generateAll?: (o: Opts) => Row[];
}

export interface PresetConfig {
  opts: Opts;
  qty: number;
  fmt: Format;
  cols: string[];
}

export interface Preset {
  name: string;
  generatorId: string;
  config: PresetConfig;
}
