const version: string = await fetch('https://ddragon.leagueoflegends.com/api/versions.json')
.then(data => data.json() as Promise<string[]>)
.then(res => { return res[0]!})

export const CHAMP_IMAGE_URL =`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/`;
export const ABILITIES_IMAGE_URL =`http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/`;
export const ITEM_IMAGE_URL = `http://ddragon.leagueoflegends.com/cdn/${version}/img/item/`
export const SUMMONERS_IMAGE_URL = `http://ddragon.leagueoflegends.com/cdn/${version}/img/spell/`
export const POST_CHAMP_IMAGE_URL = `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/`;
export const RUNE_IMAGE_URL = "https://ddragon.canisback.com/img/"

