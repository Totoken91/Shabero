export interface Phrase {
  jp: string
  romaji: string
  fr: string
  note: string
  noteType?: 'default' | 'green' | 'blue'
  who?: 'them' | 'you'
}

export interface Scenario {
  id: string
  name: string
  description: string
  phrases: Phrase[]
}
