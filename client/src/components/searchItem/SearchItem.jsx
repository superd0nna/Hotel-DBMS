import React from 'react'
import './searchItem.css'
import Button from 'react-bootstrap/Button';


const SearchItem = () => {
  return (
    <div className='searchItem'>
        <img src="https://cf.bstatic.com/xdata/images/hotel/square600/426568697.webp?k=22fc7e49f434c99a810c2bf16434a61cf1667c7ffcd1302071dd847112e72ce0&o=" alt="" className='siImg' />
        <div className="siDesc">
            <h1 className='siTitle'>Tower Street Apartments</h1>
            <span className="siDistance">500m from center</span>
            <span className="siTaxiOp">Free airport taxi</span>
            <span className="siSubtitle">Studio Apartment with Air Conditioning</span>
            <span className="siFeatures">Entire Studio</span>
            <span className='siCancelOp'>Free Cancellation</span>
            <span className="siCancelOpSub">You can cancel later, so lock in this great price today!</span>
        </div>
        <div className="siDetails">
            <div className="siRating">
                <span>Excellent</span>
                <button>8.9</button>
            </div>
            <div className="siDetailTexts">
                <span className="siPrice">$123</span>
                <span className="siTaxOp">Includes taxes and fees</span>
                <Button variant='light'>See Availability</Button>
            </div>
        </div>
    </div>
  )
}

export default SearchItem