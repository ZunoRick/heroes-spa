import { useMemo } from 'react'
import { getHeroesByPublisher } from "../helpers/getHeroesByPublisher"
import { HeroCard } from "./"

export const HeroList = ({ publisher }) => {
  const heroesFiltered = useMemo(() => getHeroesByPublisher(publisher), [publisher])

  return (
    <div className="row rows-cols-1 row-cols-md-3 g-3">
      {
        heroesFiltered.map(heroe => 
          <HeroCard key={heroe.id} hero={heroe}/>
        )
      }
    </div>
  )
}
