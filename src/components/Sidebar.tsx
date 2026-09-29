import { GENERATORS } from '../generators';

interface Props { route: string; open: boolean; onNavigate: (r: string) => void }

export default function Sidebar({ route, open, onNavigate }: Props) {
  const item = (id: string, label: string) => (
    <button key={id} className={route === id ? 'on' : ''} onClick={() => onNavigate(id)}>{label}</button>
  );
  return (
    <nav className={open ? 'open' : ''} aria-label="Generators">
      <h1>QA Test Data Generator</h1>
      {item('home', 'Dashboard')}
      <div className="sep" />
      {GENERATORS.map((g) => item(g.id, g.name))}
      <div className="sep" />
      {item('presets', 'Presets')}
    </nav>
  );
}
