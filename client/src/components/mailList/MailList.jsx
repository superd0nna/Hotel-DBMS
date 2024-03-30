import React from 'react'
import './mailList.css'
import Button from 'react-bootstrap/Button';

const MailList = () => {
  return (
    <div className="mail">
        <h1 className="mailTitle">Save time, save money!</h1>
        <span className="mailDesc">Sign up to get marketing emails from eHotel.com, including promotions, rewards, travel experiences.</span>
        <div className="mailInputContainer">
            <input type="text" placeholder='Your Email'/>
            <Button variant='secondary' size='sm'>Subscribe</Button>
        </div>
    </div>
  )
}

export default MailList