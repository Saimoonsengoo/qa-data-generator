import type { OptionSpec, OptValue } from '../types';

interface Props { spec: OptionSpec; value: OptValue; onChange: (v: OptValue) => void }

export default function OptionField({ spec, value, onChange }: Props) {
  const id = 'o_' + spec.key;
  if (spec.type === 'check')
    return (
      <label className="f inline"><input id={id} type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} />{spec.label}</label>
    );
  return (
    <label className="f">
      {spec.label}
      {spec.type === 'select' ? (
        <select id={id} value={String(value)} onChange={(e) => onChange(e.target.value)}>
          {spec.choices?.map((c) => <option key={c}>{c}</option>)}
        </select>
      ) : spec.type === 'textarea' ? (
        <textarea id={id} spellCheck={false} value={String(value)} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input id={id} type={spec.type} value={String(value)} onChange={(e) => onChange(e.target.value)} />
      )}
    </label>
  );
}
