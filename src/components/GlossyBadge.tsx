export default function GlossyBadge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="relative inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-bold text-white overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #00C9A7 0%, #00B4D8 100%)',
        boxShadow: '0 2px 8px rgba(0,180,216,0.3), inset 0 1px 0 rgba(255,255,255,0.5)',
      }}
    >
      {/* Aqua-style top highlight band */}
      <span
        className="absolute top-0 left-0 right-0 h-[45%] rounded-t-full pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 100%)',
        }}
        aria-hidden
      />
      <span className="relative z-10">{children}</span>
    </span>
  )
}
