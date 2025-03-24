type ItemType = 'weapon' | 'material' | 'consumable'

type ItemID<ItemType extends string> = `${ItemType}:${string}`

export interface Item {
  id: ItemID<ItemType>
  name: string
  stackable: boolean
  description: string
  quantity: number
  iconPath?: string
}

export interface Weapon extends Item {
  damage: number
}
