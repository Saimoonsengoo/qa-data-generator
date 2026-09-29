import { useCallback, useRef, useState } from 'react';
import type { Preset } from './types';
import { byId } from './generators';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import GeneratorPage from './components/GeneratorPage';
import Presets from './components/Presets';

export default function App() {
  const [route, setRoute] = useState('home');
  const [preset, setPreset] = useState<Preset | undefined>();
  const [key, setKey] = useState(0);
  const [menu, setMenu] = useState(false);
  const [toast, setToast] = useState('');
  const timer = useRef<number>();

  const notify = useCallback((m: string) => {
    setToast(m);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToast(''), 1400);
  }, []);
  const go = (r: string, p?: Preset) => { setRoute(r); setPreset(p); setKey((k) => k + 1); setMenu(false); window.scrollTo(0, 0); };
  const def = byId(route);

  return (
    <>
      <Sidebar route={route} open={menu} onNavigate={(r) => go(r)} />
      <div className="content">
        <button className="btn" id="menu" onClick={() => setMenu(!menu)} aria-label="Toggle menu">Menu</button>
        <main>
          {route === 'home' && <Dashboard onOpen={(id) => go(id)} />}
          {route === 'presets' && <Presets onLoad={(p) => go(p.generatorId, p)} />}
          {def && <GeneratorPage key={key} def={def} initial={preset?.config} notify={notify} />}
        </main>
      </div>
      <div id="toast" className={toast ? 'on' : ''} role="status">{toast}</div>
    </>
  );
}
