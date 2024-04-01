import React, { useState, useEffect } from 'react'
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
import { tr } from 'date-fns/locale';
import {format} from "date-fns"


const EditData = () => {
    const [isDefective, setIsDefective] = useState(false)

    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [firstName, setFirstName] = useState("")
    const [middleName, setMiddleName] = useState("")
    const [lastName, setLastName] = useState("")
    const [address, setAddress] = useState("")

    const [customers, setCustomers] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [hotels, setHotels] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [selectedRoomId, setSelectedRoomId] = useState(null);

    const formatDate = (date) => {
        return date ? format(date, 'yyyy-MM-dd') : '';
      };

    const getCustomers = async() => {
        try {
            
            const response = await fetch("http://localhost:4000/getCustomers");
            const jsonData = await response.json();

            setCustomers(jsonData);
            console.log(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }
    useEffect(() => {
        getCustomers();
    }, []);

    const getEmployees = async() => {
        try {
            
            const response = await fetch("http://localhost:4000/getEmployees");
            const jsonData = await response.json();

            setEmployees(jsonData);
            console.log(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }
    useEffect(() => {
        getEmployees();
    }, []);

    const getHotels = async() => {
        try {
            
            const response = await fetch("http://localhost:4000/getHotels");
            const jsonData = await response.json();

            setHotels(jsonData);
            console.log(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }
    useEffect(() => {
        getHotels();
    }, []);

    const getRooms = async() => {
        try {
            
            const response = await fetch("http://localhost:4000/getRooms");
            const jsonData = await response.json();

            setRooms(jsonData);
            console.log(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    }
    useEffect(() => {
        getRooms();
    }, []);

    const handleDeleteRoom = async (roomId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete room ID " + roomId + " and all associated relations?");
        if (confirmDelete) {
            try {
                const response = await fetch("http://localhost:4000/deleteRoom", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ roomID: roomId })
                });
    
                if (response.ok) {
                    alert('Room deleted successfully');
                    window.location.reload(); // Reload the page after successful deletion
                } else {
                    alert('Failed to delete room');
                }
            } catch (error) {
                console.error('Error deleting room:', error);
            }
        }
    };

    const handleDeleteCustomer = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete customer ID " + id + " and all associated relations?");
        if (confirmDelete) {
            try {
                const response = await fetch("http://localhost:4000/deleteCustomer", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: id })
                });
    
                if (response.ok) {
                    alert('Customer deleted successfully');
                    window.location.reload(); // Reload the page after successful deletion
                } else {
                    alert('Failed to delete Customer');
                }
            } catch (error) {
                console.error('Error deleting Customer:', error);
            }
        }
    };

    const handleDeleteEmployee = async (sinNumber) => {
        const confirmDelete = window.confirm("Are you sure you want to delete employee sin " + sinNumber + " and all associated relations?");
        if (confirmDelete) {
            try {
                const response = await fetch("http://localhost:4000/deleteEmployee", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ sinNumber: sinNumber })
                });
    
                if (response.ok) {
                    alert('Employee deleted successfully');
                    window.location.reload(); // Reload the page after successful deletion
                } else {
                    alert('Failed to delete Employee');
                }
            } catch (error) {
                console.error('Error deleting Employee:', error);
            }
        }
    };

    const handleDeleteHotel = async (hotelID) => {
        const confirmDelete = window.confirm("Are you sure you want to delete hotel ID " + hotelID + " and all associated relations?");
        if (confirmDelete) {
            try {
                const response = await fetch("http://localhost:4000/deleteHotel", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ hotelID: hotelID })
                });
    
                if (response.ok) {
                    alert('Employee deleted successfully');
                    window.location.reload(); // Reload the page after successful deletion
                } else {
                    alert('Failed to delete Employee');
                }
            } catch (error) {
                console.error('Error deleting Employee:', error);
            }
        }
    };
    const onSubmitCustomer = async (e) => {
        e.preventDefault(); //prevent refreshing
        try {
          const startDateFormatted = startDate ? format(startDate, 'yyyy-MM-dd') : '';
          const endDateFormatted = endDate ? format(endDate, 'yyyy-MM-dd') : '';
          const body = { firstName, middleName, lastName, address, startDate: startDateFormatted, endDate: endDateFormatted};
          const response = await fetch("http://localhost:4000/addCustomer", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
          });
          const jsonData = await response.json();
          // console.log(rooms);
          // window.location = "/";
        } catch (err) {
          console.error(err.message);
        }
      };
    
    
  return (
    <div className='center-component container mb-5'>
        <div className="table-container">
            {/* Beginning of customer table */}
            <div className='row'>
                <h3>Customer:</h3>
                <div className='col addUser'>
                    <div className="row">
                        <form onSubmit={onSubmitCustomer}>
                            <div className="col">
                                <lable>Start Date: </lable>
                                <input type='date' placeholder='start date' id='startAdd' value={startDate} onChange={e => setStartDate(e.target.value)}/>
                                <lable className='container'>End Date:</lable>
                                <input type='date' placeholder='end date' id='endAdd' value={endDate} onChange={e => setEndDate(e.target.value)}/>
                                <lable className='container'>Customer Birth Date:</lable>
                                <input type='date' placeholder='start date' id='startAdd'/>
                            </div>
                            <input type='text' placeholder='first name' id='firstNameAdd' value={firstName} onChange={e => setFirstName(e.target.value)}/>
                            <input type='text' placeholder='middle name' id='middleNameAdd' value={middleName} onChange={e => setMiddleName(e.target.value)}/>
                            <input type='text' placeholder='last name' id='lastNameAdd' value={lastName} onChange={e => setLastName(e.target.value)}/>
                            <input type='text' placeholder='address' id='custAddressAdd'value={address} onChange={e => setAddress(e.target.value)}/>
                            <Button type="submit" variant='success' id='addCust'>Add Customer</Button>
                        </form>
                        </div>
                        
                            
                        
                    

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
                                {/* <tr>
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
                                </tr> */}
                                {customers.map(customer => (
                                    <tr>
                                        <td>{customer.first_name}</td>
                                        <td>{customer.middle_name}</td>
                                        <td>{customer.last_name}</td>
                                        <td>{customer.address}</td>
                                        <td>{customer.id}</td>
                                        <td>{formatDate(customer.start_date)}</td>
                                        <td>{formatDate(customer.end_date)}</td>
                                        <div onClick={() => handleDeleteCustomer(customer.id)} className="action-btn col">
                                            <FontAwesomeIcon className="col-6" icon={faPencil}></FontAwesomeIcon>
                                            <FontAwesomeIcon className="col-6" icon={faTrash}></FontAwesomeIcon>
                                        </div>
                                    </tr>
                                ))}
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
                                    {/* <tr>
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
                                    </tr> */}
                                    {employees.map(employee => (
                                    <tr>
                                        <td>{employee.first_name}</td>
                                        <td>{employee.middle_name}</td>
                                        <td>{employee.last_name}</td>
                                        <td>{employee.sin_number}</td>
                                        <td>{employee.hotel_id}</td>
                                        <td>{employee.employee_id}</td>
                                        <div onClick={() => handleDeleteEmployee(employee.sin_number)} className="action-btn col">
                                            <FontAwesomeIcon className="col-6" icon={faPencil}></FontAwesomeIcon>
                                            <FontAwesomeIcon className="col-6" icon={faTrash}></FontAwesomeIcon>
                                        </div>
                                    </tr>
                                ))}
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
                                {/* <tr>
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
                                </tr> */}
                                {hotels.map(hotel => (
                                    <tr>
                                        <td>{hotel.hotel_id}</td>
                                        <td>{hotel.hotel_name}</td>
                                        <td>{hotel.number_of_room}</td>
                                        <td>{hotel.address}</td>
                                        <td>{hotel.email}</td>
                                        <td>{hotel.mgr_sin_number}</td>
                                        <td>{hotel.chain_id}</td>
                                        <div onClick={() => handleDeleteHotel(hotel.hotel_id)} className="action-btn col">
                                            <FontAwesomeIcon className="col-6" icon={faPencil}></FontAwesomeIcon>
                                            <FontAwesomeIcon className="col-6" icon={faTrash}></FontAwesomeIcon>
                                        </div>
                                    </tr>
                                ))}
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
                                {/* <tr>
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
                                </tr> */}
                                {rooms.map(room => (
                                    <tr>
                                        <td>{room.room_id}</td>
                                        <td>{room.room_number}</td>
                                        <td>{room.price}</td>
                                        <td>{room.amenities}</td>
                                        <td>{room.capacity}</td>
                                        <td>{room.hotel_id}</td>
                                        <div onClick={() => handleDeleteRoom(room.room_id)} className="action-btn col">
                                            <FontAwesomeIcon className="col-6" icon={faPencil}></FontAwesomeIcon>
                                            <FontAwesomeIcon className="col-6" icon={faTrash}></FontAwesomeIcon>
                                        </div>
                                    </tr>
                                ))}
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