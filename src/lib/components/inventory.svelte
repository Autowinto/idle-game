<div>
  {#each items as item}
    <div class=' bg-black rounded mb-3 p-3 flex gap-3'>
      <image src={item.iconPath} class='bg-white max-w-8 max-h-8' />
      <div>
        <div class='text-xl font-bold'>{item.name}</div>
        <div>{item.description}</div>
        <div>Quantity: {item.quantity}</div>

      </div>
    </div>
  {/each}
</div>

<script lang='ts'>
  import type { Item, Weapon } from '$lib/types'
  import defImg from '$lib/assets/notfound.png'

  const items: Item[] = []

  const blaster: Weapon = {
    id: 'weapon:blaster',
    name: 'Blaster',
    description: 'A standard issue blaster',
    quantity: 1,
    stackable: false,
    iconPath: defImg,
    damage: 2,
  }

  const potion: Item = {
    id: 'consumable:potion',
    name: 'Potion',
    description: 'A healing potion',
    quantity: 3,
    iconPath: defImg,
    stackable: true,
  }

  items.push(blaster)
  items.push(potion)
</script>
