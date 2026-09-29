import { useEffect, useState } from 'react';
import type { Format, GeneratorDef, Opts, PresetConfig, Row } from '../types';
import { loadPresets, savePresets } from '../lib/storage';
import OptionField from './OptionField';
import ResultView from './ResultView';

interface Props { def: GeneratorDef; initial?: PresetConfig; notify: (m: string) => void }

const MAX_QTY = 10_000;
const defaults = (def: GeneratorDef): Opts => Object.fromEntries(def.options.map((o) => [o.key, o.default]));

export default function GeneratorPage({ def, initial, notify }: Props) {
  const [opts, setOpts] = useState<Opts>(initial?.opts ?? defaults(def));
  const [qty, setQty] = useState(initial?.qty ?? 10);
  const [fmt, setFmt] = useState<Format>(initial?.fmt ?? 'table');
  const [cols, setCols] = useState<string[]>(initial?.cols ?? def.fields);
  const [nonce, setNonce] = useState(0);
  const [rows, setRows] = useState<Row[]>([]);
  const [error, setError] = useState('');
  const raw = def.fields.length === 0;

  // Regenerate 300ms after any option/quantity change (column and format changes only re-render).
  useEffect(() => {
    const t = setTimeout(() => {
      const n = Number(qty);
      if (!def.singleShot && (!Number.isInteger(n) || n < 1 || n > MAX_QTY)) return setError(`Quantity must be a whole number from 1 to ${MAX_QTY.toLocaleString()}.`);
      const missing = def.options.find((o) => o.type !== 'check' && String(opts[o.key]).trim() === '');
      if (missing) return setError(`${missing.label} is required.`);
      const msg = def.validate?.(opts);
      if (msg) return setError(msg);
      try {
        setRows(def.generateAll ? def.generateAll(opts) : Array.from({ length: n }, (_, i) => def.generate(i, opts)));
        setError('');
      } catch (e) {
        setError((e as Error).message);
      }
    }, 300);
    return () => clearTimeout(t);
  }, [def, opts, qty, nonce]);

  const toggleCol = (c: string) => setCols((cur) => (cur.includes(c) ? cur.filter((x) => x !== c) : [...cur, c]));
  const savePreset = () => {
    const name = prompt('Preset name');
    if (!name) return;
    savePresets([...loadPresets(), { name, generatorId: def.id, config: { opts, qty: Number(qty), fmt, cols } }]);
    notify('Preset saved');
  };
  const shownCols = raw ? null : def.fields.filter((f) => cols.includes(f));

  return (
    <>
      <h2>{def.name}</h2>
      <p className="sub">{def.description}. Emails use the .test domain; passwords are test-only.</p>
      <div className="lay">
        <div className="panel cfg">
          <div className="row">
            {!def.singleShot && (
              <label className="f">Quantity
                <input type="number" min={1} max={MAX_QTY} value={qty} onChange={(e) => setQty(e.target.value as unknown as number)} />
              </label>
            )}
            {def.options.map((spec) => (
              <OptionField key={spec.key} spec={spec} value={opts[spec.key]} onChange={(v) => setOpts({ ...opts, [spec.key]: v })} />
            ))}
            <label className="f">Format
              <select value={fmt} onChange={(e) => setFmt(e.target.value as Format)}>
                <option>table</option><option>json</option><option>csv</option>
              </select>
            </label>
          </div>
          {!raw && (
            <div className="chk">
              {def.fields.map((f) => (
                <label key={f}><input type="checkbox" checked={cols.includes(f)} onChange={() => toggleCol(f)} />{f}</label>
              ))}
            </div>
          )}
          <div className="row" style={{ marginTop: 14 }}>
            <button className="btn p" onClick={() => setNonce(nonce + 1)}>Generate</button>
            <button className="btn" onClick={savePreset}>Save as preset</button>
          </div>
          <p className="err" role="alert">{error}</p>
        </div>
        <div style={{ minWidth: 0 }}>
          {shownCols && shownCols.length === 0
            ? <p className="sub">Select at least one field.</p>
            : <ResultView rows={rows} cols={shownCols} fmt={fmt} name={def.id} onRegenerate={() => setNonce(nonce + 1)} notify={notify} />}
        </div>
      </div>
    </>
  );
}
