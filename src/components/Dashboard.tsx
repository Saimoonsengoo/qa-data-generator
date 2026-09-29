import { GENERATORS } from '../generators';

export default function Dashboard({ onOpen }: { onOpen: (id: string) => void }) {
  return (
    <>
      <h2>Dashboard</h2>
      <p className="sub">Pick a generator. Everything runs in your browser, and nothing is sent anywhere.</p>
      <div className="grid">
        {GENERATORS.map((g) => (
          <div className="card" key={g.id}>
            <b>{g.name}</b>
            <span>{g.description}</span>
            <button className="btn p" onClick={() => onOpen(g.id)}>Generate</button>
          </div>
        ))}
      </div>
    </>
  );
}
