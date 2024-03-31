import React, { useState } from 'react'
import './header1.css'
import { faBed, faBicycle, faCalendarDays, faCar, faPerson, faPlane, faTaxi } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from 'react-bootstrap/Button';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {format} from "date-fns"
import { useNavigate } from "react-router-dom";

const Header1 = ({type}) => {
    const [destination, setDestination] = useState("")
    const [openDate, setOpenDate] = useState(false)
    let toBook = useNavigate()
    
    const [date, setDate] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      ]);
    
    const [openOptions, setOpenOptions] = useState(false);
    const [options, setOptions] = useState ({
        adult:1,
        children:0,
        room:1,
    })

    const handleOption = (name, operation)=> {
        setOptions(prev => {return{
            ...prev, [name]: operation === "i" ? options[name]+1 : options[name] -1
        }})
    }

    const navigate = useNavigate()
    const routeChange = () =>{ 
        let path = `/hotels/register`; 
        toBook(path);
      }

    const handleSearch = () => {
        navigate("/hotels", {state: {destination, date, options}})
    }

  return (
    <div className="header">
        <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
            <div className="headerList">
                <div className="headerListItem active">
                    <FontAwesomeIcon icon={faBed} />
                    <span>Stays</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faPlane} />
                    <span>Flights</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faCar} />
                    <span>Car Rentals</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faBicycle} />
                    <span>Attractions</span>
                </div>
                <div className="headerListItem">
                    <FontAwesomeIcon icon={faTaxi} />
                    <span>Taxi</span>
                </div>
            </div>

            { type !== "list" &&
                <>
                    <h1 className="headerTitle">A lifetime of discounts? It's Genius.</h1>
                    <p className="headerDescription">
                        Get rewarded for your travels - unlock instant savings of 10% or more with a free eHotel account.
                    </p>
                    <div className="headerSearch">
                        <div className="headerSearchItem">
                            <FontAwesomeIcon icon={faBed} className='headerIcon'/>
                            <input type="text" placeholder='Where are you going?' className='headerSearchInput' onChange={e=>setDestination(e.target.value)}/>
                        </div>
                        <div className="headerSearchItem">
                            <FontAwesomeIcon icon={faCalendarDays} className='headerIcon'/>
                            <span onClick={() => setOpenDate(!openDate)} className='headerSearchText'>{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")} `}</span>
                            {openDate && <DateRange
                            editableDateInputs={true}
                            onChange={item => setDate([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={date}
                            className='date'
                            minDate={new Date()}
                            />}
                        </div>
                        <div className="headerSearchItem">
                            <FontAwesomeIcon icon={faPerson} className='headerIcon'/>
                            <span onClick={() =>setOpenOptions(!openOptions)} className='headerSearchText'>{`${options.adult} adult • ${options.children} children • ${options.room} room`}</span>
                            {openOptions && <div className="options">
                                <div className="optionItem">
                                    <span className="optionText">Adult</span>
                                    <div className="optionCounter">
                                        <Button disabled={options.adult <= 1} variant="outline-dark" className="optionCounterBtn" size='sm' onClick={()=> handleOption("adult", "d")}>-</Button>
                                        <span className='optionCounterNum'>{options.adult}</span>
                                        <Button variant="outline-dark" className="optionCounterBtn" size='sm' onClick={()=> handleOption("adult", "i")}>+</Button>
                                    </div>
                                </div>
                                <div className="optionItem">
                                    <span className="optionText">Children</span>
                                    <div className="optionCounter">
                                        <Button disabled={options.children <= 0} variant="outline-dark" className="optionCounterBtn" size='sm' onClick={()=> handleOption("children", "d")}>-</Button>
                                        <span className='optionCounterNum'>{options.children}</span>
                                        <Button variant="outline-dark" className="optionCounterBtn" size='sm' onClick={()=> handleOption("children", "i")}>+</Button>
                                    </div>
                                </div>
                                <div className="optionItem">
                                    <span className="optionText">Room</span>
                                    <div className="optionCounter">
                                        <Button disabled={options.room <= 1} variant="outline-dark" className="optionCounterBtn" size='sm' onClick={()=> handleOption("room", "d")}>-</Button>
                                        <span className='optionCounterNum'>{options.room}</span>
                                        <Button variant="outline-dark" className="optionCounterBtn" size='sm' onClick={()=> handleOption("room", "i")}>+</Button>
                                    </div>
                                </div>
                            </div> }
                        </div>
                        <div className="headerSearchItem">
                            <Button size='md' variant="secondary" onClick={handleSearch}>Search</Button>{' '}
                        </div>
                    </div>
                </>
            }
        </div>
    </div>
  )
}

export default Header1