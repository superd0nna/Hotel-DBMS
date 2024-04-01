import React from 'react'
import './book.css'
import ResponsiveAppBar from '../nav/navbar'
import Payment from '../payment/Payment'
import Footer2 from '../footer2/Footer2'

const Book = ({ roomId }) => {

  return (
    <div>
        <ResponsiveAppBar/>
        <Payment room_id={roomId} />
        <Footer2/>
    </div>
  )
}

export default Book