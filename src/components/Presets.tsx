import { useState } from 'react';
import type { Preset } from '../types';
import { byId } from '../generators';
import { loadPresets, savePresets } from '../lib/storage';

export default function Presets({ onLoad }: { onLoad: (p: Preset) => void }) {
  const [list, setList] = useState<Preset[]>(loadPresets);
  const remove = (i: number) => {
    const next = list.filter((_, idx) => idx !== i);
    savePresets(next);
    setList(next);
  };
  return (
    <>
      <h2>Presets</h2>
      <p className="sub">Saved in this browser only. Save one from any generator.</p>
      <div className="panel">
        {list.length === 0 && <p>No presets yet. Open a generator, set your options, and choose Save as preset.</p>}
        {list.map((p, i) => (
          <div className="pl" key={i}>
            <span><b>{p.name}</b> · {byId(p.generatorId)?.name ?? p.generatorId}</span>
            <button className="btn" onClick={() => onLoad(p)}>Load</button>
            <button className="btn" onClick={() => remove(i)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
}
