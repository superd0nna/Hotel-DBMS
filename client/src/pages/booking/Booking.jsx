import React from 'react'
import Book from '../../components/bookHotel/Book'
import { useParams } from 'react-router-dom';

const Booking = () => {
  const { room_id } = useParams(); // Get roomID from URL params

  return (
    <div>
        <Book roomId={room_id} />
    </div>
  )
}

export default Booking