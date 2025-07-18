import '../css/App.css'
import { useState } from 'react'

export default function Header({ onSemanticSearch }: { onSemanticSearch: (query: string) => void }) {
    const [search, setSearch] = useState('')

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') onSemanticSearch(search)
    }
    const handleClick = () => onSemanticSearch(search)

    return (
        <header className="header-bar">
            <div className="header-spacer" />
            <input
                className="header-search header-search-wide"
                type="text"
                placeholder="AI-assistant smart Semantic Search ..."
                value={search}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
            />
            <button className="semantic-search-btn" onClick={handleClick}>Search</button>
        </header>
    )
} 