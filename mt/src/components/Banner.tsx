import '../css/App.css'

export default function Banner({ results }: { results?: any[] }) {
  return (
    <div className="banner">
      <span role="img" aria-label="diamond" className="banner-icon">💎</span>
      {results && results.length > 0 ? (
        <div style={{ color: '#fff', fontSize: '1rem' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {results.map(r => (
              <li key={r.id} style={{ marginBottom: 8, fontWeight: 400 }}>
                <div><span style={{ fontWeight: 600 }}>{r.title}</span></div>
                <div style={{ fontSize: '0.95em', color: '#61dafb' }}>id: {r.id}</div>
                <div style={{ fontSize: '0.95em', color: '#61dafb' }}>score: {r.score?.toFixed(3)}</div>
                {r.embedding && (
                  <div style={{ fontSize: '0.95em', color: '#aaa' }}>
                    embedding: [{r.embedding.slice(0, 5).map((v: number) => v.toFixed(3)).join(', ')}...]
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <span className="banner-text">AI helps you invest smarter. Get instant insights with semantic search.</span>
      )}
    </div>
  )
} 