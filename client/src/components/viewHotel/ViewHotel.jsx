import React, { useState } from 'react'
import './viewHotel.css'
import ResponsiveAppBar from '../nav/navbar'
import Header1 from '../header1/Header1'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button';
import MailList from '../mailList/MailList'
import Footer2 from '../footer2/Footer2'


const ViewHotel = () => {
    const [slideNum, setSlideNum] = useState(0);
    const [open, setOpen] = useState(false);

    // Temporary until we can fetch pictures from the DB
    const photos = [
        {src: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/136481039.jpg?k=1571d6bae1a358df189c3aedff561bfbe7246b2d4d111b8aac43f09494891466&o=&hp=1"},
        {src: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/521209287.jpg?k=3e2f78ba2ab1db21f32e0c435e1c005911dfc1763f0939b85426bf5ac5f59730&o=&hp=1"},
        {src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/17104474.jpg?k=4ea4af1ed5b284308e12109188a0b35732899f4c8dfb9b910c2fec88fcb038bb&o=&hp=1"},
        {src: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/521209277.jpg?k=a0ca75cc98d66f0f4fb7d1127d7d338e02c079ae3f193a03b854afbf0a9eb3de&o=&hp=1"},
        {src: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/521209290.jpg?k=8015e09b00214bbfd439d10dadc56709233e513820fcabd4a1c1b9e6a273a05f&o=&hp=1"},
        {src: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/136481039.jpg?k=1571d6bae1a358df189c3aedff561bfbe7246b2d4d111b8aac43f09494891466&o=&hp=1"},
    ]

    const handleOpen = (i) => {
        setSlideNum(i);
        setOpen(true);
    };

    const handleMove = (direction) => {
        let newSlideNum;
        if(direction === "l"){
            newSlideNum = slideNum === 0 ? 5 : slideNum-1
        } else {
            newSlideNum = slideNum === 5 ? 0 : slideNum+1
        }

        setSlideNum(newSlideNum)
    }

  return (
    <div>
        <ResponsiveAppBar/>
        <Header1 type="list"/>
        <div className="hotelContainer">
            {open && <div className="slider">
                    <FontAwesomeIcon icon={faCircleXmark} className='close' onClick={()=> setOpen(false)}/>
                    <FontAwesomeIcon icon={faCircleArrowLeft} className='arrow' onClick={() => handleMove("l")}/>
                    <div className="sliderWraperr">
                        <img src={photos[slideNum].src} alt="" className="sliderImg" />
                    </div>
                    <FontAwesomeIcon icon={faCircleArrowRight} className='arrow' onClick={() => handleMove("r")}/>
                </div>
            }
            <div className="hotelWrapper">
                <Button variant='success' className='bookNow'>Reserve or Book Now!</Button>
                <h1 className='hotelTitle'>Grand Hotel</h1>
                <div className="hotelAddress">
                    <FontAwesomeIcon icon={faLocationDot}/>
                    <span>Elton St 125 New York</span>
                </div>
                <span className="hotelDistance">
                    Excellent location - 500 from center <br/>
                </span>
                <span className="hotelPriceHighlight">
                    Book a stay over $114 at this property and get a free airport taxi
                </span>
                <div className="hotelImgs">
                    {photos.map((photos, i)=>(
                        <div className="hotelImgWrapper">
                            <img onClick={() => handleOpen(i)} src={photos.src} alt="" className="hotelImg" />
                        </div>
                    ))}
                </div>
                <div className="hotelDetails">
                    <div className="hotelDetailsTexts">
                        <h1 className="hotelDetailsTitle"> Stay in the heart of Krakow</h1>
                        <p className="hotelDesc">Situated in Niagara Falls, Ontario, and within walking distance from the famous 
                        waterfall, this hotel offers a variety of modern conveniences in an ideal location. A complimentary breakfast is 
                        served daily and free WiFi is also offered.</p>
                    </div>     
                    <div className="hotelDetailsPrice">
                        <h1>Perfect for a 9-night stay!</h1>
                        <span>Situated in the best rated area in Niagara Falls, this hotel has an excellent location score of 8.9</span>
                        <h2><b>$945</b> (9 nights)</h2>
                        <Button variant='success'>Reserve or Book Now!</Button>
                    </div>           
                </div>
            </div>
        </div>
        <MailList/>
        <Footer2/>
    </div>
  )
}

export default ViewHotel