const BARS   = [65, 45, 80, 30, 55, 70, 40, 85, 50, 60, 35, 75];
const LABELS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export default function StockoutChart({ minimal = false }) {
  return (
    <div className="bg-bg rounded-sm p-5" style={{ height: minimal ? 150 : 200 }}>
      {!minimal && (
        <div className="flex items-center justify-between mb-3">
          <span className="section-label text-cyan" style={{ fontSize: "0.6rem" }}>
            DRUG AVAILABILITY — 2024
          </span>
          <div className="flex gap-4">
            <div className="flex items-center gap-1.5">
              <span className="block w-2 h-2 rounded-sm" style={{ background: "rgba(255,60,56,0.8)" }} />
              <span className="font-mono text-muted" style={{ fontSize: "0.6rem" }}>Critical</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="block w-2 h-2 rounded-sm" style={{ background: "rgba(0,255,213,0.7)" }} />
              <span className="font-mono text-muted" style={{ fontSize: "0.6rem" }}>Adequate</span>
            </div>
          </div>
        </div>
      )}

      <div
        className="flex items-end gap-1.5"
        style={{ height: minimal ? "90px" : "110px" }}
      >
        {BARS.map((h, i) => (
          <div key={i} className="flex-1 flex flex-col justify-end h-full">
            <div
              className="bar rounded-tl-sm rounded-tr-sm w-full"
              style={{
                height: `${h}%`,
                background: h > 60
                  ? "rgba(255,60,56,0.75)"
                  : "rgba(0,255,213,0.65)",
                animationDelay: `${i * 0.05}s`,
              }}
            />
          </div>
        ))}
      </div>

      <div className="flex gap-1.5 mt-1.5">
        {LABELS.map((l) => (
          <div key={l} className="flex-1 text-center font-mono text-muted" style={{ fontSize: "0.45rem" }}>
            {l}
          </div>
        ))}
      </div>
    </div>
  );
}
