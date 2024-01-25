import React from 'react'
import MainHeader from '../layout/MainHeader'
import Parallax from '../common/Parallax'
import TravelServices from '../common/TravelServices'
import TravelCarousel from '../common/TravelCarousel'
import HotelRoomSearch from '../common/HotelRoomSearch'

const Home = () => {

	return(
	<section>
	<MainHeader/><p></p>
	<div className='container'>
	<TravelCarousel/>
	<Parallax/>
	<TravelServices/>
	<Parallax/>
	<TravelCarousel/>

</div>
</section>
  )
}

export default Home
