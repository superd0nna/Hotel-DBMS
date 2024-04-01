import React, { useState, useEffect } from 'react'
import Header1 from '../../components/header1/Header1'
import ResponsiveAppBar from '../../components/nav/navbar'
import './list.css'
import { useLocation } from 'react-router-dom';
import {format} from "date-fns"
import { DateRange } from 'react-date-range';
import Button from 'react-bootstrap/Button';
import SearchItem from '../../components/searchItem/SearchItem';
import { Input } from '@material-ui/icons';


const List = () => {
  const location = useLocation();
  // const { destination, date, options } = location.state;
  const [destination, setDestination] = useState(location.state.destination)
  const [date, setDate] = useState(location.state.date)
  const [openDate, setOpenDate] = useState(false)
  const [options, setOptions] = useState(location.state.options)
  const [area, setArea] = useState("")
  const [selectedChains, setSelectedChains] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [price, setPrice] = useState(0.00)
  const [minRooms, setMinRooms] = useState(0)
  const [maxRooms, setMaxRooms] = useState(0)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [numOfPeople, setNumOfPeople] = useState(1)
  const [numOfAdults, setNumOfAdults] = useState(1);
  const [numOfChildren, setNumOfChildren] = useState(0);
  const [rooms, setRooms] = useState([])


  const handleDateChange = (item) => {
    setStartDate(item.selection.startDate);
    setEndDate(item.selection.endDate);
  };

  const handleCategoryCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedCategories((prevCategories) => [...prevCategories, value]);
    } else {
      setSelectedCategories((prevCategories) => prevCategories.filter((category) => category !== value));
    }
  };
  const convertCategoriesToString = (categoriesArray) => {
    if (categoriesArray.length === 0) {
      return "";
    } else {
      return `(${categoriesArray.map(category => `${category}`).join(', ')})`;
    }
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedChains((prevChains) => [...prevChains, value]);
    } else {
      setSelectedChains((prevChains) => prevChains.filter((chain) => chain !== value));
    }
  };
  const convertChainsToString = (chainsArray) => {
    if (chainsArray.length === 0) {
      return "(SELECT DISTINCT chain_name FROM ehotel.hotel_chain)";
    } else {
      return `(${chainsArray.map(chain => `'${chain}'`).join(', ')})`;
    }
  };

  const onSubmitForm = async (e) => {
    e.preventDefault(); //prevent refreshing
    try {
      const numOfPeople = numOfAdults + numOfChildren;
      const startDateFormatted = startDate ? format(startDate, 'yyyy-MM-dd') : '';
      const endDateFormatted = endDate ? format(endDate, 'yyyy-MM-dd') : '';
      const areaToSend = area.trim() === '' ? '%' : area;
      const chainsString = convertChainsToString(selectedChains);
      const categoriesString = convertCategoriesToString(selectedCategories);
      const body = { area: areaToSend, chains: chainsString, price, startDate: startDateFormatted, endDate: endDateFormatted, numOfPeople, categories: categoriesString, minRooms, maxRooms};
      const response = await fetch("http://localhost:4000/roomsfromarea", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      const jsonData = await response.json();
      setRooms(jsonData);
      // console.log(rooms);
      // window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <ResponsiveAppBar/>
      <Header1 type="list"/>
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <form onSubmit={onSubmitForm}>
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input type="text" placeholder='Destination' value={area} onChange={e => setArea(e.target.value)}/>
            </div>
            <div className="lsItem">
            <label>Check-in & Check-out Date</label>
            <span onClick={() => setOpenDate(!openDate)}>
              {startDate && endDate ? `${format(startDate, 'MM/dd/yyyy')} to ${format(endDate, 'MM/dd/yyyy')} ` : 'Select date range'}
            </span>
            {openDate && <DateRange onChange={handleDateChange} minDate={new Date()} ranges={[{ startDate, endDate, key: 'selection' }]} />}
            </div>
            <div>
              <label>Hotel Chain</label><br></br>
              <input type="checkbox" id="elysium" name="chains" value="Elysium Resorts" onChange={handleCheckboxChange}/>
              <label for="elysium">Elysium Resorts</label><br></br>
              <input type="checkbox" id="oceanview" name="chains" value="Oceanview Retreat" onChange={handleCheckboxChange}/>
              <label for="oceanview">Oceanview Retreat</label><br></br>
              <input type="checkbox" id="sunset" name="chains" value="Sunset Haven" onChange={handleCheckboxChange}/>
              <label for="sunset">Sunset Haven</label><br></br>
              <input type="checkbox" id="alpine" name="chains" value="Alpine Lodges" onChange={handleCheckboxChange}/>
              <label for="alpine">Alpine Lodges</label><br></br>
              <input type="checkbox" id="lakeside" name="chains" value="Lakeside Resorts" onChange={handleCheckboxChange}/>
              <label for="lakeside">Lakeside Resorts</label><br></br>
            </div>
            <div>
              <label>Hotel Category</label><br></br>
              <input type="checkbox" id="5star" name="category" value="5" onChange={handleCategoryCheckboxChange}/>
              <label for="5star">5 star</label><br></br>
              <input type="checkbox" id="4star" name="category" value="4" onChange={handleCategoryCheckboxChange}/>
              <label for="4star">4 star</label><br></br>
              <input type="checkbox" id="3star" name="category" value="3" onChange={handleCategoryCheckboxChange}/>
              <label for="3star">3 star</label><br></br>
              <input type="checkbox" id="2star" name="category" value="2" onChange={handleCategoryCheckboxChange}/>
              <label for="2star">2 star</label><br></br>
              <input type="checkbox" id="1star" name="category" value="1" onChange={handleCategoryCheckboxChange}/>
              <label for="1star">1 star</label><br></br>
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">

                <div className="lsOptionItem">
                  <span className="lsOptionText">Max price <small>per night</small></span>
                  <input type="number" className="lsOptionInput" onChange={e => setPrice(e.target.value)}/>
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult </span>
                  <input min={1} type="number" className="lsOptionInput" placeholder={options.adult} onChange={(e) => setNumOfAdults(parseInt(e.target.value))}/>
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input min={0} type="number" className="lsOptionInput" placeholder={options.children} onChange={(e) => setNumOfChildren(parseInt(e.target.value))}/>
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Min rooms <small>in hotel</small></span>
                  <input type="number" className="lsOptionInput" onChange={e => setMinRooms(e.target.value)}/>
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">Max rooms <small>in hotel</small></span>
                  <input type="number" className="lsOptionInput" onChange={e => setMaxRooms(e.target.value)}/>
                </div>
              </div>
              <Button type="submit" variant='light'>Search</Button>
            </div>

          </form>
          </div>
          <div className="listResult">
            {/* to be changed with db info*/}
            {rooms.map(room => (
              <SearchItem key={room.room_id} room={room} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default List