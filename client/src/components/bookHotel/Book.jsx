import React from 'react'
import './book.css'
import ResponsiveAppBar from '../nav/navbar'
import Payment from '../payment/Payment'
import Footer2 from '../footer2/Footer2'

const Book = () => {
  return (
    <div>
        <ResponsiveAppBar/>
        <Payment/>
        <Footer2/>
    </div>
  )
}

export default Book