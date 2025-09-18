export default function StatusFilter({ active = "ALL", counts, onChange }) {
  const base =
    "w-full rounded-xl border p-4 shadow text-left transition select-none focus:outline-none focus:ring-2 focus:ring-offset-2";

  const Btn = ({ id, label, count, activeClasses, hoverClasses }) => (
    <button
      type="button"
      role="radio"
      aria-checked={active === id}
      onClick={() => onChange && onChange(id)}
      className={`${base} ${active === id ? activeClasses : hoverClasses}`}
    >
      <div className="font-semibold">{label}</div>
      {typeof count === "number" && (
        <div className="text-sm opacity-70">{count} cards</div>
      )}
    </button>
  );

  return (
    <div
      role="radiogroup"
      aria-label="Status filter"
      className="mb-6 grid grid-cols-2 sm:grid-cols-4 gap-3"
    >
      <Btn
        id="ALL"
        label="🌐 All"
        count={counts?.all}
        activeClasses="border-cyan-600 ring-2 ring-cyan-500/30 ring-offset-2"
        hoverClasses="hover:border-cyan-400"
      />
      <Btn
        id="KNOWN"
        label="✅ Known"
        count={counts?.known}
        activeClasses="border-emerald-600 ring-2 ring-emerald-500/30 ring-offset-2"
        hoverClasses="hover:border-emerald-400"
      />
      <Btn
        id="ALMOST"
        label="🤔 Almost"
        count={counts?.almost}
        activeClasses="border-amber-600 ring-2 ring-amber-500/30 ring-offset-2"
        hoverClasses="hover:border-amber-400"
      />
      <Btn
        id="UNKNOWN"
        label="❌ Unknown"
        count={counts?.unknown}
        activeClasses="border-rose-600 ring-2 ring-rose-500/30 ring-offset-2"
        hoverClasses="hover:border-rose-400"
      />
    </div>
  );
}
