interface DialogueBubbleProps {
  text: string
  romaji?: string
  speaker: 'npc' | 'player'
}

export default function DialogueBubble({ text, romaji, speaker }: DialogueBubbleProps) {
  const isNpc = speaker === 'npc'

  return (
    <div
      className={`animate-fade-up max-w-[80%] ${
        isNpc ? 'self-start' : 'self-end'
      }`}
    >
      <div
        className={`px-4 py-3 rounded-2xl ${
          isNpc
            ? 'glass-sm bg-blue-50/40 rounded-bl-sm'
            : 'rounded-br-sm text-white'
        }`}
        style={
          isNpc
            ? undefined
            : { background: 'linear-gradient(135deg, var(--blue), var(--teal))' }
        }
      >
        <p className={`text-[15px] leading-snug ${isNpc ? 'font-jp' : ''}`}>
          {text}
        </p>
        {romaji && (
          <p className="text-[12px] opacity-60 mt-1">{romaji}</p>
        )}
      </div>
    </div>
  )
}
