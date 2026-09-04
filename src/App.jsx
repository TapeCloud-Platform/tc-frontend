const apps = [
  {
    id: 'tapeflix',
    name: 'TapeFlix',
    description: 'Películas, series y reseñas.',
    url: 'http://localhost:5174',
  },
  {
    id: 'tapebeat',
    name: 'TapeBeat',
    description: 'Música, artistas y playlists.',
    url: 'http://localhost:5175',
  },
];

export default function App() {
  return (
    <main className="portal-shell">
      <section className="portal-card">
        <p className="eyebrow">TapeCloud</p>
        <h1>Portal principal</h1>
        <p className="subtitle">Elige tu aplicación para continuar.</p>

        <div className="apps-grid">
          {apps.map((app) => (
            <a key={app.id} className="app-link" href={app.url} target="_blank" rel="noreferrer">
              <div className="app-icon">{app.name.slice(0, 2).toUpperCase()}</div>
              <div>
                <h2>{app.name}</h2>
                <p>{app.description}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
