import * as React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import "./index.css";
import './../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Hotel from "./pages/hotel/Hotel";
import Booking from "./pages/booking/Booking";
import Register from "./pages/register/Register";
import BookingtoRent from "./pages/booktorent/BookingtoRent";

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/hotels" element={<List/>}></Route>
      <Route path="/hotels/:id" element={<Hotel/>}/>
      <Route path="/hotels/booking/:room_id" element={<Booking/>}/>
      <Route path="/hotels/register" element={<Register/>}/>
      <Route path="/hotels/booking-to-renting" element={<BookingtoRent/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App;