import React, { useState } from 'react'
import './editData.css'
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


const EditData = () => {
    const [isDefective, setIsDefective] = useState(false)

  return (
    <div className='center-component container mb-5'>
        <div className="table-container">
            {/* Beginning of customer table */}
            <div className='row'>
                <h3>Customer:</h3>
                <div className='col addUser'>
                    <div className="row">
                            <div className="col">
                                <lable>Start Date: </lable>
                                <input type='date' placeholder='start date' id='startAdd'/>
                                <lable className='container'>End Date:</lable>
                                <input type='date' placeholder='end date' id='endAdd'/>
                                <lable className='container'>Customer Birth Date:</lable>
                                <input type='date' placeholder='start date' id='startAdd'/>
                            </div>
                        </div>
                        <input type='text' placeholder='first name' id='firstNameAdd'/>
                        <input type='text' placeholder='middle name' id='middleNameAdd'/>
                        <input type='text' placeholder='last name' id='lastNameAdd'/>
                        <input type='number' placeholder='id' id='custIdAdd'/>
                        <Button variant='success' id='addCust'>Add Customer</Button>

                    </div>
                    <div className='row'>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>First Name</th>
                                    <th>Middle Name</th>
                                    <th>Last Name</th>
                                    <th>Address</th>
                                    <th>ID</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Mark</td>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>217 Florida</td>
                                    <td>1</td>
                                    <td>yyy-mm-dd</td>
                                    <td>yyy-mm-dd</td>
                                    <div className="action-btn col">
                                        <FontAwesomeIcon className="col-6" icon={faPencil}></FontAwesomeIcon>
                                        <FontAwesomeIcon className="col-6" icon={faTrash}></FontAwesomeIcon>
                                    </div>
                                </tr>
                            </tbody>
                        </Table>

                        {/* Beggining of Employee Table */}
                        <div className="row">
                            <h3>Employee:</h3>
                            <div className="col addUser">
                                <input type='text' placeholder='first name' id='firstEmpAdd'/>
                                <input type='text' placeholder='middle name' id='midEmpAdd'/>
                                <input type='text' placeholder='last name' id='lastEmpAdd'/>
                                <input type='number' placeholder='Sin Number' id='empSin'/>
                                <input type='number' placeholder='Hotel ID' id='empHotelID'/>
                                <input type='number' placeholder='Employee ID' id='empID'/>
                                <Button variant='success' id='addEmployee'>Add Employee</Button>
                            </div>
                            <Table striped bordered hover className='mt-4'>
                                <thead>
                                    <tr>
                                        <th>First Name</th>
                                        <th>Middle Name</th>
                                        <th>Last Name</th>
                                        <th>Sin Number</th>
                                        <th>Hotel ID</th>
                                        <th>Employee ID</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Mark</td>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>000000000</td>
                                        <td>1234567</td>
                                        <td>1234567</td>
                                        <div className="action-btn col">
                                            <FontAwesomeIcon className="col-6" icon={faPencil}></FontAwesomeIcon>
                                            <FontAwesomeIcon className="col-6" icon={faTrash}></FontAwesomeIcon>
                                        </div>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>

                    {/* Beginning of Hotel Table */}
                    <div className="row">
                        <h3>Hotels:</h3>
                        <div className="col addUser">
                            <input type='number' placeholder='Hotel ID' id='hotelID'/>
                            <input type='text' placeholder='Hotel name' id='hotelName'/>
                            <input type='number' placeholder='Number of rooms' id='numOfRoom'/>
                            <input type='text' placeholder='Address' id='hotelAddress'/>
                            <input type='text' placeholder='Email' id='hotelEmail'/>
                            <input type='number' placeholder='Manager SN' id='hotelMngSin'/>
                            <input type='number' placeholder='Chain ID' id='hotelChainID'/>
                            <Button variant='success' id='addHotel'>Add Hotel</Button>
                        </div>
                        <Table striped bordered hover className='mt-4'>
                            <thead>
                                <tr>
                                    <th>Hotel ID</th>
                                    <th>Hotel Name</th>
                                    <th>Number of Rooms</th>
                                    <th>Address</th>
                                    <th>Email</th>
                                    <th>Manager SN</th>
                                    <th>Chain ID</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Mark</td>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>000000000</td>
                                    <td>1234567</td>
                                    <td>1234567</td>
                                    <td>1234567</td>
                                    <div className="action-btn col">
                                        <FontAwesomeIcon className="col-6" icon={faPencil}></FontAwesomeIcon>
                                        <FontAwesomeIcon className="col-6" icon={faTrash}></FontAwesomeIcon>
                                    </div>
                                </tr>
                            </tbody>
                        </Table>
                    </div>

                    {/* Beginning of Rooms Table */}
                    <div className="row">
                        <h3>Rooms:</h3>
                        <div className="col addUser">
                            <input type='number' placeholder='Room ID' id='roomID'/>
                            <input type='number' placeholder='Room number' id='roomNum'/>
                            <input type='number' placeholder='Price' id='roomPrice'/>
                            <input type='text' placeholder='Amentities' id='amentities'/>
                            <input type='number' placeholder='Capacity' id='capacity'/>
                            <input type='number' placeholder='Hotel ID' id='roomHotelID'/>
                            <div className="radio-btn">
                            <FormControl>
                                <FormLabel id="view-type-ID" className='mt-4'>View Type:</FormLabel>
                                <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="view-btn">
                                    <FormControlLabel value="sea-view" control={<Radio />} label="Sea View" />
                                    <FormControlLabel value="mountain-view" control={<Radio />} label="Mountain View" />
                                </RadioGroup>
                                <FormLabel id="extendable-ID" className='mt-4'>Extendable:</FormLabel>
                                <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="extendable-btn">
                                    <FormControlLabel value="isExtendable" control={<Radio />} label="Yes" />
                                    <FormControlLabel value="notExtendable" control={<Radio />} label="No" />
                                </RadioGroup>
                                <FormLabel id="defective-ID" className='mt-4'>Defective:</FormLabel>
                                <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="defective-btn">
                                    <FormControlLabel value="isDefective" control={<Radio />} label="Yes" onClick={() => setIsDefective(true)}/>
                                    <FormControlLabel value="noteDefective" control={<Radio />} label="No" onClick={() => setIsDefective(false)}/>
                                    {isDefective && <input type='text' placeholder='List all defects.' />}
                                </RadioGroup>
                            </FormControl>
                            </div>
                            <Button variant='success' id='addRoom' className='mt-4'>Add Room</Button>
                        </div>
                        <Table striped bordered hover className='mt-4'>
                            <thead>
                                <tr>
                                    <th>Room ID</th>
                                    <th>Room Number</th>
                                    <th>Price</th>
                                    <th>Amentities</th>
                                    <th>Capacity</th>
                                    <th>Hotel ID</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>122</td>
                                    <td>102</td>
                                    <td>300</td>
                                    <td>pool </td>
                                    <td>3</td>
                                    <td>1234567</td>
                                    <div className="action-btn col">
                                        <FontAwesomeIcon className="col-6" icon={faPencil}></FontAwesomeIcon>
                                        <FontAwesomeIcon className="col-6" icon={faTrash}></FontAwesomeIcon>
                                    </div>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>  
    </div>
    )
}

export default EditData