import { LocalNotifications } from '@capacitor/local-notifications'
import { Capacitor } from '@capacitor/core'

const NOTIF_ID = 1001
const NOTIF_HOUR = 19 // 19h00

const MESSAGES = [
  { title: 'Ton streak t\'attend 🔥', body: 'Quelques phrases et ta série continue. ça prend 3 minutes.' },
  { title: 'しゃべろう！', body: 'Tu n\'as pas encore pratiqué aujourd\'hui. Lance-toi !' },
  { title: 'Le Japon se rapproche ✈️', body: 'Une petite session pour garder le rythme ?' },
  { title: 'Ne casse pas ta série 🎌', body: 'Tu es trop proche pour abandonner maintenant.' },
  { title: 'Rappel Shabero', body: 'Ta session du jour t\'attend. 3 minutes suffisent.' },
]

function getTomorrowAt19(): Date {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  d.setHours(NOTIF_HOUR, 0, 0, 0)
  return d
}

function pickMessage(seed: number) {
  return MESSAGES[seed % MESSAGES.length]
}

export async function requestNotificationPermission(): Promise<boolean> {
  if (!Capacitor.isNativePlatform()) return false

  const { display } = await LocalNotifications.requestPermissions()
  return display === 'granted'
}

export async function scheduleStreakReminder(): Promise<void> {
  if (!Capacitor.isNativePlatform()) return

  const { display } = await LocalNotifications.checkPermissions()
  if (display !== 'granted') return

  // Cancel any existing reminder first
  await cancelStreakReminder()

  const at = getTomorrowAt19()
  const msg = pickMessage(at.getDate())

  await LocalNotifications.schedule({
    notifications: [
      {
        id: NOTIF_ID,
        title: msg.title,
        body: msg.body,
        schedule: { at },
        smallIcon: 'ic_stat_icon_config_sample',
        iconColor: '#2196F3',
      },
    ],
  })
}

export async function cancelStreakReminder(): Promise<void> {
  if (!Capacitor.isNativePlatform()) return
  try {
    await LocalNotifications.cancel({ notifications: [{ id: NOTIF_ID }] })
  } catch {
    // Ignore if no notification to cancel
  }
}
