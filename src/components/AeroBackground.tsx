export default function AeroBackground() {
  return (
    <div className="fixed inset-0 -z-10 bg-aero overflow-hidden">
      {/* Light streaks — Vista Aurora style */}
      <div className="light-streak light-streak-1" />
      <div className="light-streak light-streak-2" />
      <div className="light-streak light-streak-3" />

      {/* Glossy bubbles */}
      <div className="bubble bubble-1" />
      <div className="bubble bubble-2" />
      <div className="bubble bubble-3" />
      <div className="bubble bubble-4" />
      <div className="bubble bubble-5" />
      <div className="bubble bubble-6" />
      <div className="bubble bubble-7" />
      <div className="bubble bubble-8" />

      {/* Decorative fish */}
      <svg className="deco-fish deco-fish-1" viewBox="0 0 60 30" width="80" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="25" cy="15" rx="18" ry="10" fill="#FF8C42" opacity="0.3"/>
        <polygon points="43,15 55,5 55,25" fill="#FF6B2B" opacity="0.25"/>
        <circle cx="20" cy="13" r="2" fill="white" opacity="0.4"/>
        <path d="M12,10 Q25,5 38,10" stroke="white" strokeWidth="1" fill="none" opacity="0.2"/>
        <path d="M12,20 Q25,25 38,20" stroke="#E85D26" strokeWidth="0.5" fill="none" opacity="0.2"/>
      </svg>
      <svg className="deco-fish deco-fish-2" viewBox="0 0 60 30" width="50" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="25" cy="15" rx="18" ry="10" fill="#4FC3F7" opacity="0.3"/>
        <polygon points="43,15 55,5 55,25" fill="#29B6F6" opacity="0.25"/>
        <circle cx="20" cy="13" r="2" fill="white" opacity="0.4"/>
        <path d="M12,10 Q25,5 38,10" stroke="white" strokeWidth="1" fill="none" opacity="0.2"/>
      </svg>

      {/* Wave bottom */}
      <div className="wave-bottom" />
    </div>
  )
}
