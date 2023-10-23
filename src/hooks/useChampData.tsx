/* eslint-disable */
import { useEffect, useState } from 'react'
import { Champion } from '~/types/types'

const useChampData = (champId : string | string[]) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [champ, setChamp] = useState<Champion>()

    useEffect(()=>{
        const fetchEnemyData = async () => {
          const res = await fetch(`http://ddragon.leagueoflegends.com/cdn/13.20.1/data/en_US/champion/${champId}.json`)
          const data : any = await res.json()
          const champRawData : any = Object.values(data?.data)[0]
          const champData: Champion = {
            name: champRawData?.name,
            image: champRawData?.image,
            id: champRawData?.id,
            spells: champRawData?.spells
          }
          setChamp(champData)
          setIsLoaded(true)
        }
        if(champId){
          fetchEnemyData()
        }
      }, [champId])

    return {
        isLoaded,
        champ
    }
}

export default useChampData