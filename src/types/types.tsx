export interface Champion {
    name: string,
    id: number,
    image: Image
    spells: Ability[]
}

export interface Ability {
    name: string,
    cooldown: number[],
    image: Image
}

export interface Image {
    full: string,
    sprite: string
}

