import Image from 'next/image'
import { useParams } from 'next/navigation'
import React from 'react'
import useChampData from '~/hooks/useChampData'
const ABILITIES_IMAGE_URL = 'http://ddragon.leagueoflegends.com/cdn/13.20.1/img/spell/'

const Page = () => {
  const params = useParams()
  const enemyChamp : string = params?.champion as string
  const {isLoaded, champ} = useChampData(enemyChamp)

  console.log(champ)


  const ENEMY_CHAMP_IMAGE_URL = `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ?.id}_0.jpg`
  const KATARINA_IMAGE_URL = `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/Katarina_0.jpg`
  
  
  return (
    <div className='flex h-[100vh] justify-center py-24 bg-slate-950 px-24'>
      <div className='w-1/2'>
        <Image src={KATARINA_IMAGE_URL} width={380} height={560}
        className={
          'object-cover object-right transition-opacity duration-700 pointer-events-none mx-auto border-2 rounded' + (isLoaded ? " opacity-80" :  " opacity-0") 
        } alt=""/>
      </div>

      <div className='flex flex-col w-1/2'>
        <Image src={ENEMY_CHAMP_IMAGE_URL} width={380} height={560}
        className={
          ' object-cover object-center transition-opacity duration-700 pointer-events-none mx-auto border-2 rounded ' + (isLoaded ? " opacity-80" : " opacity-0") 
        } alt=""/>
        <div >
          <ul className={'flex py-8 transition-opacity duration-700' + (isLoaded ? " opacity-80" : " opacity-0")}>
            {champ?.spells.map((spell) => {
              return (
                <div key={spell.name} className='text-center w-1/2 px-10' >
                  <Image src={ABILITIES_IMAGE_URL + spell.image.full} width={75} height={75} alt='' className='hover:-translate-y-2 transition duration-500 mx-auto border border-[3px] border-amber-500 rounded mb-2'/>
                  <p className='text-white'>{spell.name}</p>
                  <p className='text-white'>{spell.cooldown[0]} seconds</p>
                </div>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Page