import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchFlight from '../../components/index/SearchFlight'
import QuickMenu from '../../components/index/QuickMenu'
import RecommendedSpots from '../../components/index/RecommendedSpots'
import LatestBoard from '../../components/index/LatestBoard'
import TripSlide from '../../components/index/TripSlide'
import './bookingMain.css';
import '../../styles/style.css';
import '../../styles/reset.css';
import TestDate from '../../components/index/TestDate'
import DateRange from '../../components/index/DateRange'
import Header from '../../components/fragment/Header'
import Footer from '../../components/fragment/Footer'

const IndexContainer = () => {
  return (
    <div>
      <Header/>
      {/* <TestDate /> */}
      {/* <DateRange /> */}
      <SearchFlight />
      <QuickMenu />
      <RecommendedSpots />
      <LatestBoard />
      <TripSlide />
      <Footer/>
    </div>
  )
}

export default IndexContainer