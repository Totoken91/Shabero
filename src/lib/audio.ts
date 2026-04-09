let jpVoice: SpeechSynthesisVoice | null = null
let voicesLoaded = false

function loadVoice() {
  if (voicesLoaded) return
  const voices = speechSynthesis.getVoices()
  if (voices.length > 0) {
    jpVoice = voices.find((v) => v.lang.startsWith('ja')) ?? null
    voicesLoaded = true
  }
}

// Try loading immediately + on voiceschanged
if (typeof window !== 'undefined') {
  loadVoice()
  speechSynthesis.onvoiceschanged = loadVoice
}

export function speakJapanese(text: string, rate = 0.85): void {
  if (typeof window === 'undefined') return
  loadVoice()
  speechSynthesis.cancel()
  const u = new SpeechSynthesisUtterance(text)
  u.lang = 'ja-JP'
  u.rate = rate
  if (jpVoice) u.voice = jpVoice
  speechSynthesis.speak(u)
}

export function stopSpeaking(): void {
  speechSynthesis.cancel()
}

export function isSpeaking(): boolean {
  return speechSynthesis.speaking
}
