import React from 'react'
import './bToR.css'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const BtoR = () => {
  return (
    <div className='container mt-5'>
        <h3 className='mb-4'>Booking To Renting</h3>
        <h6>The following rooms have been booked by customers online. Please select the rooms that you would like to turn to renting by using the action buttons.</h6>
        <div className="row">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Reservation ID</th>
                        <th>Check-in</th>
                        <th>Check-out</th>
                        <th>Customer Name</th>
                        <th>Customer ID</th>
                        <th>Room ID</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1234567</td>
                        <td>yyyy-mm-dd</td>
                        <td>yyyy-mm-dd</td>
                        <td>Mark Johnson</td>
                        <td>1234567</td>
                        <td>1234567</td>
                        <div className="action-btn col">
                            <Button size='sm' variant='success' id='bToR-btn'>Renting</Button>
                        </div>
                    </tr>
                </tbody>
            </Table>
        </div>
    </div>
  )
}

export default BtoR