let currentAudio: HTMLAudioElement | null = null

/**
 * Play a phrase. Uses pre-recorded MP3 if the phrase has an id,
 * falls back to Web Speech Synthesis otherwise.
 */
export function speakJapanese(text: string, rate = 0.85, phraseId?: string): void {
  if (typeof window === 'undefined') return
  stopSpeaking()

  // Try MP3 first
  if (phraseId) {
    const src = `/audio/${phraseId}.mp3`
    const audio = new Audio(src)
    audio.playbackRate = rate > 0.7 ? 1 : 0.75 // slow mode
    currentAudio = audio
    audio.play().catch(() => {
      // MP3 not found — fall back to TTS
      fallbackTTS(text, rate)
    })
    return
  }

  fallbackTTS(text, rate)
}

function fallbackTTS(text: string, rate: number) {
  if (typeof speechSynthesis === 'undefined') return
  speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(text)
  u.lang = 'ja-JP'
  u.rate = rate
  const voices = speechSynthesis.getVoices()
  const jpVoice = voices.find((v) => v.lang.startsWith('ja'))
  if (jpVoice) u.voice = jpVoice
  speechSynthesis.speak(u)
}

export function stopSpeaking(): void {
  if (currentAudio) {
    currentAudio.pause()
    currentAudio.currentTime = 0
    currentAudio = null
  }
  if (typeof speechSynthesis !== 'undefined') {
    speechSynthesis.cancel()
  }
}

export function isSpeaking(): boolean {
  if (currentAudio && !currentAudio.paused) return true
  if (typeof speechSynthesis !== 'undefined') return speechSynthesis.speaking
  return false
}
