import React, { useState } from 'react'
import Header1 from '../../components/header1/Header1'
import ResponsiveAppBar from '../../components/nav/navbar'
import './list.css'
import { useLocation } from 'react-router-dom';
import {format} from "date-fns"
import { DateRange } from 'react-date-range';
import Button from 'react-bootstrap/Button';
import SearchItem from '../../components/searchItem/SearchItem';


const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination)
  const [date, setDate] = useState(location.state.date)
  const [openDate, setOpenDate] = useState(false)
  const [options, setOptions] = useState(location.state.options)

  return (
    <div>
      <ResponsiveAppBar/>
      <Header1 type="list"/>
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input type="text" placeholder='Destination'/>
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={()=> setOpenDate(!openDate)}>{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")} `}</span>
              {openDate && <DateRange onChange={item=>setDate([item.selection])} minDate={new Date()} ranges={date}/>}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">

                <div className="lsOptionItem">
                  <span className="lsOptionText">Min price <small>per night</small></span>
                  <input type="number" className="lsOptionInput"/>
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult </span>
                  <input min={1} type="number" className="lsOptionInput" placeholder={options.adult}/>
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input min={0} type="number" className="lsOptionInput" placeholder={options.children}/>
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input min={1} type="number" className="lsOptionInput" placeholder={options.room}/>
                </div>
              </div>
              <Button variant='light'>Search</Button>
            </div>
          </div>
          <div className="listResult">
            {/* to be changed with db info*/}
            <SearchItem/>
            <SearchItem/>
            <SearchItem/>
            <SearchItem/>
            <SearchItem/>
            <SearchItem/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default List