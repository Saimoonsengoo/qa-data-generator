import { useMemo } from 'react';
import type { Format, Row } from '../types';
import { copyText, download, toCsv } from '../lib/export';

interface Props {
  rows: Row[];
  /** null = raw objects (JSON generator) */
  cols: string[] | null;
  fmt: Format;
  name: string;
  onRegenerate: () => void;
  notify: (m: string) => void;
}

const MAX_TABLE_ROWS = 200;
const MAX_TEXT_CHARS = 300_000;

export default function ResultView({ rows, cols, fmt, name, onRegenerate, notify }: Props) {
  const data = useMemo<Row[]>(
    () => (cols ? rows.map((r) => Object.fromEntries(cols.map((c) => [c, r[c]]))) : rows),
    [rows, cols],
  );
  const json = () => JSON.stringify(data, null, 2);
  const csv = () => (cols ? toCsv(data, cols) : '');
  const text = fmt === 'csv' && cols ? csv() : json();
  const copy = async (s: string) => { await copyText(s); notify('Copied to clipboard'); };
  const asTable = cols && fmt === 'table';

  return (
    <div>
      <div className="bar">
        <button className="btn" onClick={() => copy(text)}>Copy all</button>
        {cols && <button className="btn" onClick={() => download(`${name}-test-data.csv`, csv(), 'text/csv')}>Export CSV</button>}
        <button className="btn" onClick={() => download(`${name}-test-data.json`, json(), 'application/json')}>Export JSON</button>
        <button className="btn" onClick={onRegenerate}>Regenerate</button>
        <span className="meta">
          {rows.length.toLocaleString()} record{rows.length === 1 ? '' : 's'}
          {asTable && rows.length > MAX_TABLE_ROWS && ` (showing first ${MAX_TABLE_ROWS}; copy and export include all)`}
          {asTable && ' · click a cell to copy'}
        </span>
      </div>
      {asTable ? (
        <div className="tw">
          <table>
            <thead><tr><th>#</th>{cols.map((c) => <th key={c}>{c}</th>)}</tr></thead>
            <tbody>
              {data.slice(0, MAX_TABLE_ROWS).map((r, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  {cols.map((c) => (
                    <td key={c} className="c" onClick={() => copy(String(r[c] ?? ''))}>{String(r[c] ?? '')}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <pre>{text.slice(0, MAX_TEXT_CHARS)}</pre>
      )}
    </div>
  );
}
