import '../css/App.css'

const mockData: Record<string, { id: string; symbol: string; title: string; price: string; change: string; chart: string; articles: { id: string; title: string; type: string; }[] }[]> = {
    Tracking: [
        {
            id: '1', symbol: 'TSLA', title: 'Tesla', price: '$322.29', change: '+11.51 (+3.7%)', chart: '', articles: [
                { id: 'a1', title: 'TSLA Q1 Report', type: 'Report' },
                { id: 'a2', title: 'Tesla China Market', type: 'Research' },
                { id: 'a3', title: 'Musk Keynote', type: 'Analysis' },
            ]
        },
        {
            id: '2', symbol: 'NVDA', title: 'Nvidia', price: '$170.82', change: '+0.12 (+0.07%)', chart: '', articles: [
                { id: 'a1', title: 'NVDA 25Q2 Report', type: 'Report' },
                { id: 'a2', title: 'NVDA Tech Review', type: 'Research' },
                { id: 'a3', title: 'DeepSeek', type: 'Analysis' },
            ]
        },
        {
            id: '3', symbol: 'PLTR', title: 'Palantir', price: '$150.99', change: '+2.41 (+1.62%)', chart: '', articles: [
                { id: 'a1', title: 'PLTR 25Q2 Report', type: 'Report' },
                { id: 'a2', title: 'PLTR Tech Deep Dive', type: 'Research' },
                { id: 'a3', title: 'AIPcon Conference', type: 'Analysis' },
            ]
        },
    ],
    // Add similar mock data for other sections as needed
}

type Props = { section: string }

export default function ContentSection({ section }: Props) {
    const data = mockData[section] || []
    return (
        <div>
            <h2 className="section-title">{section}</h2>
            <div className="card-grid">
                {data.map(item => (
                    <div key={item.id} className="stock-card">
                        <div className="stock-card-header">
                            <span className="stock-symbol">{item.symbol}</span>
                            <span className="stock-title">{item.title}</span>
                        </div>
                        <div className="stock-card-price">
                            <span className="stock-price">{item.price}</span>
                            <span className="stock-change">{item.change}</span>
                        </div>
                        {/* Placeholder for chart */}
                        <div className="stock-chart-placeholder">[chart]</div>
                        <div className="stock-articles">
                            {item.articles.map(article => (
                                <div key={article.id} className="stock-article">
                                    <span className="article-type">{article.type}</span>
                                    <span className="article-title">{article.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
} 