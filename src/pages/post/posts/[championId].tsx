import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { CHAMP_IMAGE_URL, ITEM_IMAGE_URL, RUNE_IMAGE_URL, SUMMONERS_IMAGE_URL } from '~/config'
import { api } from '~/utils/api'

const PostsExample = () => {
  const [championUsedId, setChampionUsed] = useState<number>(0)
  const router = useRouter()
  const { data : postsData } = api.post.getDataPostsById.useQuery(championUsedId)

  useEffect(() => {
    if(router.isReady){
      const paramId = (router.query).championId
      setChampionUsed(parseInt(paramId))}
    },[router.isReady, router.query])

 
  return (
    <div className="bg-slate-400 h-[100vh] flex flex-col py-14">
         <input type="text" placeholder='Look for matchup' className=' self-center text-center text-black border border-black text-2xl rounded-md w-3/12 h-10 py-8'/>
          <table className='bg-gray-100 border-[3px] border-black  border-separate my-10 mx-20 rounded-xl'>
            <thead>       
              <tr className='grid grid-flow-col grid-cols-3'> 
                <th>Matchup</th>
                <th>Recommended build</th>
                <th>Summs and Runes</th>
              </tr>
            </thead>
            <tbody>
            {postsData?.data.map(({ rune, playingWith, playingAgainst, items, mainSummoner, secondarySummoner, id }) => {
              return (
              <tr key={id} >
                <Link  href={`/post/${playingWith?.key}/${id}`}>
                <button className='grid grid-flow-col grid-cols-3 w-full border-t-2 hover:bg-gray-200 border-black'>
                  <div className='flex justify-center'>
                    <img
                      src={`${CHAMP_IMAGE_URL}${playingWith?.key}.png`}
                      className="p-3 rounded-2xl max-h-[100px] max-w-[100px] w-4/12"
                      alt=""
                      width={100}
                      height={100}
                    />
                    <p className='self-center text-2xl'>vs</p>
                    <img
                      src={`${CHAMP_IMAGE_URL}${playingAgainst?.key}.png`}
                      className="p-3 rounded-2xl max-h-[100px] max-w-[100px] w-4/12"
                      alt=""
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className=' self-center'>
                    <ul className='flex justify-left gap-2 '>
                    {
                      items?.map(({id, image}) => {
                        return (
                            <img key={id}
                            src={`${ITEM_IMAGE_URL}${image}`}
                            className=' max-h-[60px] max-w-[60px] w-2/12 rounded-md'
                            alt=""
                            height={100}
                            width={100}/>      
                          )
                        })
                      }
                    </ul>
                  </div>
                  <div className='grid grid-flow-col grid-cols-2 self-center w-1/2 mx-auto'>
                    <div className='grid gap-2 py-1'> 
                      <img src={`${SUMMONERS_IMAGE_URL}${mainSummoner?.key}.png`}
                      alt='summoner'
                      className='w-4/12 rounded-md mx-auto'
                      height={100}
                      width={100}
                      />
                      <img src={`${SUMMONERS_IMAGE_URL}${secondarySummoner?.key}.png`}
                      alt='summoner'
                      className='w-4/12 h-fit rounded-md mx-auto'
                      height={100}
                      width={100}
                      />
                    </div>
                    <img 
                    src={RUNE_IMAGE_URL + rune?.img}
                    alt='Rune'
                      className=' my-auto mx-auto max-w-[100px] max-h-[100px] w-8/12'
                      height={100}
                      width={100}
                    />
                  </div>
                </button>
                </Link>
              </tr>
              )})}
            </tbody>
          </table>
        <section className='w-full flex justify-around'>
          <Link href="/">
            <button className='border-[2.3px] px-10 py-1 text-lg rounded-md bg-gray-300 border-black'>
            Go back</button>
          </Link>
          <Link href="/post/new">
            <button className='border-[2.3px] px-10 py-1 text-lg rounded-md bg-gray-300 border-black'>Create post</button>
          </Link>
        </section>
    </div>
  )
}

export default PostsExample