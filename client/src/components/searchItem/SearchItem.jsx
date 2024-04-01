import React from 'react'
import './searchItem.css'
import Button from 'react-bootstrap/Button';
import { StarFill } from 'react-bootstrap-icons';
import { useNavigate } from "react-router-dom";


const SearchItem = ({ room }) => {
    const navigate = useNavigate();

    const handleBookClick = () => {
      navigate(`/hotels/booking/${room.room_id}`);
    };

    const mapRoomViewText = (view) => {
        switch(view) {
            case 'sea_view':
                return 'Sea View';
            case 'mountain_view':
                return 'Mountain View';
            default:
                return view;
        }
    };

    const displayExtendableStatus = (extendable) => {
        return extendable ? ', Extendable' : '';
    };

    const mapRatingToText = (rating) => {
        switch (rating) {
          case 5:
            return 'Excellent';
          case 4:
            return 'Great';
          case 3:
            return 'Good';
          case 2:
            return 'Poor';
          case 1:
            return 'Very Poor';
          default:
            return 'Unknown'; // Handle unexpected values if necessary
        }
      };

  return (
    <div className='searchItem'>
        <img src="https://cf.bstatic.com/xdata/images/hotel/square600/426568697.webp?k=22fc7e49f434c99a810c2bf16434a61cf1667c7ffcd1302071dd847112e72ce0&o=" alt="" className='siImg' />
        <div className="siDesc">
            <h1 className='siHotel'>{room.hotel_name}</h1>
            <h2 className='siChain'>{room.hotel_chain_name}</h2>
            <span className="siRoomNum">Room {room.room_number}, {mapRoomViewText(room.view)}{displayExtendableStatus(room.extendable)}</span>
            <span className="siAddress">ID: {room.room_id}</span>
            <span className="siAddress">{room.hotel_address}</span>
            <span className="siAmenities">Amenities: {room.amenities}</span>
            <span className="siCapacity">{room.capacity} Person</span>
            <span className='siCancelOp'>Free Cancellation</span>
            <span className="siCancelOpSub">You can cancel later, so lock in this great price today!</span>
        </div>
        <div className="siDetails">
            <div className="siRating">
                <span>{mapRatingToText(room.hotel_rating)}</span>
                <button>{room.hotel_rating}<StarFill style={{ marginRight: '0px',  }} /></button>
            </div>
            <div className="siDetailTexts">
                <span className="siPrice">${room.price}</span>
                <span className="siTaxOp">Includes taxes and fees</span>
                <Button onClick={handleBookClick} variant='light'>Book</Button>
            </div>
        </div>
    </div>
  )
}

export default SearchItem