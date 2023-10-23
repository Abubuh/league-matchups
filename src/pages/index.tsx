/* eslint-disable */
import { useEffect, useState } from 'react'
// import kataBackground from "../images/kata-background.jpg"
import Image from 'next/image'
import { type Champion } from '~/types/types'
const CHAMPIONS_DATA_URL = "http://ddragon.leagueoflegends.com/cdn/13.20.1/data/en_US/champion.json"
const CHAMP_IMAGE_URL = "http://ddragon.leagueoflegends.com/cdn/13.20.1/img/champion/"

export default function Home() {
  const [champs, setChamps] = useState<Champion[]>([])
  const [search, setSearch] = useState("")
  const champsFiltered = champs.filter(({name}) => (name.toLowerCase()).includes(search.toLowerCase()))

  useEffect(() => {
    const fetchData = () => {
      fetch(CHAMPIONS_DATA_URL)
      .then(res => res.json())
      .then((data) => {  return (data.data)})
      .then((res) => { return setChamps(Object.values(res))})
    }
    fetchData()
  }, [])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value
    setSearch(searchValue)
  }

  return (
    <div className={`h-[100vh] bg-[url(/kata-background.jpg)] background-image:linear-gradient(rgba(9, 148, 143, 0.9)) bg-cover bg-center `}>

      <section className='flex h-[50vh] items-center'>
        <div className=' w-full flex flex-col'>
          <h1 className='text-white text-center text-8xl py-10 mt-32'>Select your matchup</h1>
          <input type="text"
          value={search}
          placeholder='Aatrox, Ahri, Zed, Zeri'
          onChange={handleChange}
          className='w-5/12 mx-auto text-black py-4 px-6 bg-zinc-200 text-xl rounded-md border-4 focus:border-neutral-900'/>
        </div>
      </section>
      {
          champsFiltered.length > 0 ? 
         
          <div className='overflow-y-scroll h-[35vh]'>
          <ul className=''>
            <div className='grid grid-cols-5 w-3/5 mx-auto '>
            {champsFiltered.map(({id, name, image}) => {
              return (
                <a href={id} key={id} className='flex flex-col py-5 transition hover:scale-125'>
                  <p className='text-white text-center'>{name}</p>
                  <Image src={CHAMP_IMAGE_URL + image.full} className='w-1/2 mx-auto' alt="" width={1280} height={1080}/>
                </a>
                )
              })}
              </div>
            </ul>
        </div> :
        <div className='text-center text-white w-full mt-20'>
          <p className='animate-bounce text-5xl'>Loading</p>
        </div>
        }
        {/* <Image src={kataBackground} className='h-full w-full pointer-events-none ' alt="Kata background" width={1280}/> */}

    </div>
  )
}
