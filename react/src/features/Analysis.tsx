import '../css/App.css'
import { gql, useQuery } from '@apollo/client'
import { useState } from 'react'

const ARTICLES_QUERY = gql`
  query ListArticles {
    listArticles {
      id
      title
      summary
      content
      coverImage
      date
      views
      likes
      comments
      shares
    }
  }
`

const API_SUMMARIZE_URL = 'http://localhost:8080/v1/summarize'

export default function Analysis() {
  const { data, loading, error } = useQuery(ARTICLES_QUERY)
  const [expanded, setExpanded] = useState<{ [id: string]: boolean }>({})
  const [summaries, setSummaries] = useState<{ [id: string]: string }>({})
  const [loadingSummary, setLoadingSummary] = useState<{ [id: string]: boolean }>({})
  const [showSummary, setShowSummary] = useState<{ [id: string]: boolean }>({})

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error loading articles.</div>

  const handleSummarize = async (article: any) => {
    setLoadingSummary(ls => ({ ...ls, [article.id]: true }))
    try {
      const res = await fetch(API_SUMMARIZE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: article.content, max_length: 60, min_length: 20 })
      })
      const data = await res.json()
      setSummaries(s => ({ ...s, [article.id]: data.summary }))
      setShowSummary(ss => ({ ...ss, [article.id]: true }))
    } catch (e) {
      setSummaries(s => ({ ...s, [article.id]: 'Failed to summarize.' }))
      setShowSummary(ss => ({ ...ss, [article.id]: true }))
    } finally {
      setLoadingSummary(ls => ({ ...ls, [article.id]: false }))
    }
  }

  return (
    <div>
      <div className="video-list">
        {data.listArticles.map((article: any) => {
          const isExpanded = expanded[article.id]
          const isLoading = loadingSummary[article.id]
          const summary = summaries[article.id]
          const isShowingSummary = showSummary[article.id]
          return (
            <div key={article.id} className="video-row">
              <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div className="video-thumb" style={{ background: `url(${article.coverImage}) center/cover` }}>
                    <span className="video-thumb-title" style={{background: 'rgba(255,255,255,0.7)', borderRadius: '8px', padding: '0.2rem 0.5rem'}}>{article.title}</span>
                  </div>
                  <div style={{ margin: '8px 0 0 0', textAlign: 'center', width: '100%' }}>
                    <button className="video-details-toggle-btn" onClick={() => handleSummarize(article)} disabled={isLoading}>
                      {isLoading ? 'Summarizing...' : 'AI Summarize'}
                    </button>
                    {isShowingSummary ? (
                      <button className="video-details-toggle-btn" style={{ marginLeft: 8 }} onClick={() => setShowSummary(ss => ({ ...ss, [article.id]: false }))}>
                        Show Original
                      </button>
                    ) : null}
                  </div>
                </div>
                <div className="video-details">
                  <div className="video-details-title">{article.title}</div>
                  <div className="video-details-meta">
                    <span>{article.views} views</span>
                    <span>· {new Date(article.date).toLocaleDateString()}</span>
                    <span>· 👍 {article.likes}</span>
                    <span>· 💬 {article.comments}</span>
                    <span>· 🔗 {article.shares}</span>
                  </div>
                  <div className="video-details-summary">{article.summary}</div>
                  <div className="video-details-content" style={{ color: '#555', fontSize: '1.03rem', marginTop: '0.3rem', minHeight: 60 }}>
                    {isShowingSummary || isLoading ? (
                      isLoading ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 60 }}>
                          <span className="spinner" style={{ marginBottom: 8 }} />
                          <span>Summarizing...</span>
                        </div>
                      ) : (
                        <>{summary}</>
                      )
                    ) : isExpanded
                      ? <>
                          {article.content}
                          <button className="video-details-toggle-btn" onClick={() => setExpanded(e => ({ ...e, [article.id]: false }))}>Less</button>
                        </>
                      : <>
                          {article.content.length > 800
                            ? article.content.slice(0, 800) + '...'
                            : article.content}
                          {article.content.length > 800 && (
                            <button className="video-details-toggle-btn" onClick={() => setExpanded(e => ({ ...e, [article.id]: true }))}>More</button>
                          )}
                        </>
                    }
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
} 