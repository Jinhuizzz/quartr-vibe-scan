const tickers = [
  { symbol: "AAPL", change: "+0.12%", positive: true },
  { symbol: "MSFT", change: "+1.28%", positive: true },
  { symbol: "GOOGL", change: "-0.45%", positive: false },
  { symbol: "AMZN", change: "+2.15%", positive: true },
  { symbol: "NVDA", change: "+3.28%", positive: true },
  { symbol: "META", change: "+1.72%", positive: true },
  { symbol: "TSLA", change: "-1.35%", positive: false },
  { symbol: "COIN", change: "+2.77%", positive: true },
  { symbol: "PLTR", change: "+2.23%", positive: true },
  { symbol: "AMD", change: "+1.89%", positive: true },
  { symbol: "SPY", change: "+0.04%", positive: true },
  { symbol: "QQQ", change: "+0.32%", positive: true },
];

const TickerBar = () => {
  const items = [...tickers, ...tickers]; // duplicate for seamless loop

  return (
    <div className="w-full border-y border-border/50 bg-surface/50 overflow-hidden py-3">
      <div className="animate-ticker flex items-center gap-8 w-max">
        {items.map((t, i) => (
          <div key={i} className="flex items-center gap-2 text-sm whitespace-nowrap">
            <span className="font-display font-semibold text-foreground">{t.symbol}</span>
            <span className={t.positive ? "text-green-400" : "text-red-400"}>
              {t.change}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TickerBar;
