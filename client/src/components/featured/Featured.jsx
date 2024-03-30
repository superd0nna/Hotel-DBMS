import React from 'react'
import './featured.css'

const Featured = () => {
  return (
    <div className="featured">
        <div className="featuredItem">
            <img alt='miami' className='featuredImg' src='https://i0.wp.com/luxexpose.com/wp-content/uploads/2015/11/the-Seatai-Featured.jpg?fit=1200%2C876&ssl=1'></img>
            <div className="featuredTitles">
                <h1>Miami</h1>
                <h2>123 properties</h2>
            </div>
        </div>
        <div className="featuredItem">
            <img alt="tahoe" className='featuredImg' src='https://visitlaketahoe.com/wp-content/uploads/2024/01/TahoeBeachClub1200.jpg'></img>
            <div className="featuredTitles">
                <h1>Lake Tahoe</h1>
                <h2>123 properties</h2>
            </div>
        </div>
        <div className="featuredItem">
            <img alt="santa monica" className='featuredImg' src='https://www.thehotelguru.com/_images/f6/8c/f68c8838012273179c5554e3fdcfee51/600x422.jpg'></img>
            <div className="featuredTitles">
                <h1>Santa Monica</h1>
                <h2>123 properties</h2>
            </div>
        </div>
    </div>
  )
}

export default Featured