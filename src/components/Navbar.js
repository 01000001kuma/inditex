import React from 'react'
import Loading from './Loading'


const Navbar = () => {
  return (
    <div className='navbar'>
      <a className='nav' href="/">Podcaster</a>
      <Loading />
      <hr className='line'></hr>

    </div>
  )
}

export default Navbar