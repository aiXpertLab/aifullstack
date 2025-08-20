import '../css/App.css'

const trackingStocks = [
    {
        id: '1', symbol: 'Tesla', name: 'Client', price: 'Revenue: $321.87M', change: '+11.09 (+3.57%)', chart: '',
        videos: [
            { id: 'v1', title: 'TSLA Q1 Report', type: 'Report', stats: '9 videos' },
            { id: 'v2', title: 'Tesla China Market', type: 'Research', stats: '5 videos' },
            { id: 'v3', title: 'Musk Keynote', type: 'Analysis', stats: '2 videos' },
        ],
        tags: ['Analysis 21', 'Q&A 130', 'Trading 24', 'Valuation 1'],
    },
    {
        id: '2', symbol: 'NNvidia', name: 'Vendor', price: 'Cost: $170M', change: '+0.27 (+0.16%)', chart: '',
        videos: [
            { id: 'v1', title: 'NVDA 25Q2 Report', type: 'Report', stats: '8 videos' },
            { id: 'v2', title: 'NVDA Tech Review', type: 'Research', stats: '4 videos' },
            { id: 'v3', title: 'DeepSeek', type: 'Analysis', stats: '4 videos' },
        ],
        tags: ['Analysis 13', 'Q&A 360', 'Trading 100', 'Valuation 1'],
    },
    {
        id: '3', symbol: 'Palantir', name: 'Competitor', price: 'Revenue: $151.26M', change: '+2.68 (+1.8%)', chart: '',
        videos: [
            { id: 'v1', title: 'PLTR 25Q2 Report', type: 'Report', stats: '3 videos' },
            { id: 'v2', title: 'PLTR Tech Deep Dive', type: 'Research', stats: '4 videos' },
            { id: 'v3', title: 'AIPcon Conference', type: 'Analysis', stats: '2 videos' },
        ],
        tags: ['Analysis 11', 'Q&A 130', 'Trading 5', 'Valuation 1'],
    },
]

const latestVideos = [
    { id: 'lv1', title: 'Stablecoin Industry: Why the Boom?', type: 'Industry', date: '2025.07.14', stats: '3.1k views 577 likes' },
    { id: 'lv2', title: 'Humanoid Robot Investment: How to Prepare?', type: 'Industry', date: '2025.07.07', stats: '8.2k views 811 likes' },
]

const weeklyPicks = [
    { id: 'wp1', title: 'NVDA Q2 Report: Is the Risk Over?', type: 'Report', date: '2025.06.02', stats: '8.4k views 596 likes' },
    { id: 'wp2', title: 'TSLA: Musk Risk Rising?', type: 'Analysis', date: '2025.03.24', stats: '9.7k views 6318 likes' },
]

export default function Home() {
    return (
        <div>
            <section className="home-section">
                <h2 className="section-title">Absolute Tracking</h2>
                <div className="card-grid">
                    {trackingStocks.map(stock => (
                        <div key={stock.id} className="stock-card">
                            <div className="stock-card-header">
                                <span className="stock-symbol">{stock.symbol}</span>
                                <span className="stock-title">{stock.name}</span>
                            </div>
                            <div className="stock-card-price">
                                <span className="stock-price">{stock.price}</span>
                                <span className="stock-change">{stock.change}</span>
                            </div>
                            <div className="stock-chart-placeholder">[chart]</div>
                            <div className="stock-articles">
                                {stock.videos.map(video => (
                                    <div key={video.id} className="stock-article">
                                        <span className="article-type">{video.type}</span>
                                        <span className="article-title">{video.title}</span>
                                        <span className="article-stats">{video.stats}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="stock-tags">
                                {stock.tags.map(tag => (
                                    <span key={tag} className="stock-tag">{tag}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <section className="home-section">
                <div className="section-row">
                    <h2 className="section-title">Latest Videos</h2>
                    <span className="section-more">More &gt;</span>
                </div>
                <div className="video-row">
                    {latestVideos.map(video => (
                        <div key={video.id} className="video-card">
                            <div className="video-title">{video.title}</div>
                            <div className="video-meta">
                                <span className="video-type">{video.type}</span>
                                <span className="video-date">{video.date}</span>
                                <span className="video-stats">{video.stats}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <section className="home-section">
                <div className="section-row">
                    <h2 className="section-title">Weekly Picks</h2>
                    <span className="section-more">More &gt;</span>
                </div>
                <div className="video-row">
                    {weeklyPicks.map(video => (
                        <div key={video.id} className="video-card">
                            <div className="video-title">{video.title}</div>
                            <div className="video-meta">
                                <span className="video-type">{video.type}</span>
                                <span className="video-date">{video.date}</span>
                                <span className="video-stats">{video.stats}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
} 