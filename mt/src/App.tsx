import { Routes, Route } from 'react-router-dom'
import { gql, useLazyQuery } from '@apollo/client'
import { useState } from 'react'
import './css/App.css'

import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Banner from './components/Banner'
import Home from './components/Home'

import Analysis from './features/Analysis'
import ContentSection from './features/ContentSection'

const SEMANTIC_SEARCH = gql`
  query SemanticSearch($query: String!, $topK: Int) {
    semanticSearch(query: $query, topK: $topK) {
      id
      title
      score
      summary
    }
  }
`

function App() {
    const [results, setResults] = useState<any[]>([])
    const [searching, setSearching] = useState(false)
    const [runSemanticSearch] = useLazyQuery(SEMANTIC_SEARCH, {
        onCompleted: data => {
            console.log('Semantic search results:', data)
            setResults(data?.semanticSearch || [])
            setSearching(false)
        },
        onError: err => {
            console.error('Semantic search error:', err)
            setSearching(false)
        }
    })

    const handleSemanticSearch = (query: string) => {
        console.log('Searching for:', query)
        setSearching(true)
        runSemanticSearch({ variables: { query, topK: 8 } })
    }
    console.log('Rendering results:', results)
    return (
        <div className="app-layout">
            <Sidebar />
            <div className="main-area">
                <Header onSemanticSearch={handleSemanticSearch} />
                <Banner results={results} />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/tracking" element={<ContentSection section="Tracking" />} />
                        <Route path="/analysis" element={<Analysis />} />
                        <Route path="/school" element={<ContentSection section="School" />} />
                        <Route path="/report" element={<ContentSection section="Report" />} />
                        <Route path="/qa" element={<ContentSection section="Q&A" />} />
                        <Route path="/trading" element={<ContentSection section="Trading" />} />
                        <Route path="/course" element={<ContentSection section="Course" />} />
                        <Route path="/announcements" element={<Announcements />} />
                    </Routes>
                    {searching && <div style={{ marginTop: 24 }}>Searching...</div>}
                    {!searching && results.length === 0 && (
                        <div style={{ marginTop: 32, color: '#888' }}>No results found.</div>
                    )}
                    {results.length > 0 && (
                        <div style={{ marginTop: 32, background: 'yellow', color: 'black' }}>
                            <h2>Semantic Search Results</h2>
                            <ul>
                                {results.map(r => (
                                    <li key={r.id}>{r.title}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}

function Announcements() {
    return <h2>Announcements - Platform news and updates.</h2>
}

export default App
