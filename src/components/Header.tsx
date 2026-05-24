const CoinIcon = ({ size = 24 }: { size?: number }) => (
  <svg
    className="coin-icon"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" fill="#c9963a" stroke="#8b6914" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="7" fill="#e8b84b" />
    <text x="12" y="16" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#6b4a00" fontFamily="serif">G</text>
  </svg>
)

interface HeaderProps {
  gold: number
  completedCount: number
  totalCount: number
}

export default function Header({ gold, completedCount, totalCount }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-title">
        冒险家协会 · 第八酒馆
        <span>Adventure Guild · Tavern No.8</span>
      </div>
      <div className="header-right">
        <span className="stats-badge">
          委托进度 <span>{completedCount}/{totalCount}</span>
        </span>
        <div className="gold-counter" id="gold-counter">
          <CoinIcon size={22} />
          <span id="gold-value">{gold.toLocaleString()}</span>
        </div>
      </div>
    </header>
  )
}