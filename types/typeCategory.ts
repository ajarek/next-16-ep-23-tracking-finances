export type Category = {
  name: string
  icon: string
  limit: number
  id: string
  powiadomienia: boolean
}

export type CategoryLimits = {
  powiadomienia: boolean
  rozrywka: number
  zdrowie: number
  oplaty: number
  zakupy: number
  restauracje: number
  edukacja: number
  inne: number
}
