import React from 'react'
import Filters from './Filters'
import GigCard from './GigCard'

const Gigs = () => {
  return (
    <div>
      <Filters />
      <div className='gigs-cards-in-services'>
      <GigCard />
      </div>
    </div>
  )
}

export default Gigs
