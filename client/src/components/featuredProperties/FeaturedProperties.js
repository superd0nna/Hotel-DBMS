import React from 'react'
import './FeaturedProperties.css'

const FeaturedProperties = () => {
  return (
    <div className="fp">
        <div className="fpItem">
            <img src="https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=35b70a7e8a17a71896996cd55d84f742cd15724c3aebaed0d9b5ba19c53c430b&o=" alt="" className="fpImg" />
            <span className="fpName">Aparthotel Stare Miasto</span>
            <span className="fpCity">Madrid</span>
            <span className="fpPrice">Starting from $120</span>
            <div className="fpRating">
                <button>4</button>
                <span>Excellent</span>
            </div>
        </div>
        <div className="fpItem">
            <img src="https://cf.bstatic.com/xdata/images/hotel/square600/29466558.webp?k=7f9cf4736f69b30c20fa7a751bb8711fa195bc9ff6092d5412d52daf6cada17f&o=" alt="" className="fpImg" />
            <span className="fpName">Tower of London</span>
            <span className="fpCity">London</span>
            <span className="fpPrice">Starting from $180</span>
            <div className="fpRating">
                <button>5</button>
                <span>Outstanding</span>
            </div>
        </div>
        <div className="fpItem">
            <img src="https://cf.bstatic.com/xdata/images/hotel/square600/438349362.webp?k=f67f0e7e54be1c0678f18cf9ae1271c4220a487901ae0bf906fed8ba0265e38d&o=" alt="" className="fpImg" />
            <span className="fpName">Casa Prata</span>
            <span className="fpCity">Portugal</span>
            <span className="fpPrice">Starting from $120</span>
            <div className="fpRating">
                <button>4</button>
                <span>Excellent</span>
            </div>
        </div>
        <div className="fpItem">
            <img src="https://cf.bstatic.com/xdata/images/hotel/square600/270323047.webp?k=bade09d7901e1282156f13c3b39e3a8b9c8d45170b2f1184565d3fc304c42d70&o=" alt="" className="fpImg" />
            <span className="fpName">Sugar Loft</span>
            <span className="fpCity">Brazil</span>
            <span className="fpPrice">Starting from $120</span>
            <div className="fpRating">
                <button>4</button>
                <span>Excellent</span>
            </div>
        </div>
    </div>
  )
}

export default FeaturedProperties