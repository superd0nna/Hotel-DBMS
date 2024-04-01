import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCheckbox,
  MDBCol,
  MDBContainer,
  MDBInput,
  MDBRow,
  MDBRadio,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import './payment.css'
import { DateRange } from 'react-date-range';
import {format} from "date-fns"
import { useParams } from 'react-router-dom';

const Payment = () => {
  // let { room_id } = useParams();
  const { room_id } = useParams();
  const roomId = room_id ? room_id : '';
  let toHome = useNavigate()
  const [openDate, setOpenDate] = useState(false);
  const [userType, setUserType] = useState("");
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const onSubmitForm = async (e) => {
    const startDate = date[0].startDate;
    const endDate = date[0].endDate;
    const startDateFormatted = startDate ? format(startDate, 'yyyy-MM-dd') : '';
    const endDateFormatted = endDate ? format(endDate, 'yyyy-MM-dd') : '';
    const body = {
      roomID: formData.roomID,
      firstName: formData.firstName,
      middleName: formData.middleName,
      lastName: formData.lastName,
      address: formData.address,
      phone: formData.phone,
      nameOnCard: formData.nameOnCard,
      creditCardNumber: formData.creditCardNumber,
      expiration: formData.expiration,
      cvv: formData.cvv,
      startDate: startDateFormatted,
      endDate: endDateFormatted
    };

    try {
      // Send data to the server
      const response = await fetch("http://localhost:4000/addReservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        alert('Payment submitted successfully');
        toHome(`/`);
      } else {
        alert('Failed to submit payment');
      }
    } catch (error) {
      console.error('Error submitting payment:', error);
      alert('An error occurred while submitting payment');
    }
  };

  useEffect(()=>{
    let user = localStorage.getItem("customerType");
    setUserType(user);
  }, [])

  const [formData, setFormData] = useState({
    roomID: '',
    firstName: '',
    middleName: '',
    lastName: '',
    address: '',
    phone: '',
    nameOnCard: '',
    creditCardNumber: '',
    expiration: '',
    cvv: ''
  });


const handleChange = (e) => {
  const { id, value } = e.target;
  setFormData({ ...formData, [id]: value });
};

const cancelBooking = () => {
  toHome(`/`);
}

const handleSubmit = (e) => {
  e.preventDefault();
  const errors = [];

  // Validate each input field
  Object.entries(formData).forEach(([key, value]) => {
    if (!value) {
      errors.push(`Please fill in ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
    } else if (key === 'cvv' && !(/^\d{3}$/.test(value))) {
      errors.push('Please enter a valid CVV (3 digits)');
    } else if (key === 'expiration' && !(/^\d{2}\/\d{2}$/.test(value))) {
      errors.push('Please enter a valid expiration date (MM/YY)');
    } else if (key === 'creditCardNumber' && !(/^\d{16}$/.test(value))) {
      errors.push('Please enter a valid 16-digit card number');
    } else if (key === 'phone' && !(/^\d{10}$/.test(value)) && !(/^\d{3}-\d{3}-\d{4}$/.test(value))) {
      errors.push('Please enter a valid phone number (e.g., 613-222-2222 or 6132222222)');
    }
  });

  if (errors.length > 0) {
    alert(errors.join('\n'));
  } else {
    onSubmitForm();
    alert('Payment submitted successfully');
    toHome(`/`);
  }
};

  return (
    <MDBContainer className="py-5" id="payment-section">
      <MDBRow>
        <MDBCol md="8" className="mb-4">
          <MDBCard className="mb-4">
            <MDBCardHeader className="py-3">
              <h5 className="mb-0">Please enter your details</h5>
            </MDBCardHeader>
            <MDBCardBody>
              <MDBInput
                wrapperClass="mb-4"
                label="Room ID"
                id="roomID"
                type="text"
                required
                value={formData.roomID}
                onChange={handleChange}
              />
              <MDBRow className="mb-4">
                <MDBCol>
                  <MDBInput placeholder="John" label="First name" id="firstName" type="text" required onChange={handleChange} value={formData.firstName}/>
                </MDBCol>
                <MDBCol>
                  <MDBInput placeholder="Bitar" label="Middle name" id="middleName" type="text" required onChange={handleChange} value={formData.middleName}/>
                </MDBCol>
                <MDBCol>
                  <MDBInput placeholder="Doe" label="Last name" id="lastName" type="text" required onChange={handleChange} value={formData.lastName}/>
                </MDBCol>
              </MDBRow>

              <MDBInput
                wrapperClass="mb-4"
                label="Address"
                id="address"
                type="text"
                required
                value={formData.address}
                onChange={handleChange}
                placeholder="5000 Laurier Ave"
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Phone Number"
                id="phone"
                type="text"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="613-123-4567"
              />

              <MDBRow>
                <span onClick={() => setOpenDate(!openDate)} className='headerSearchText'>{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(date[0].endDate, "MM/dd/yyyy")} `}</span>
                <span className="mb-3 mt-1">Select a start & end date</span>
              </MDBRow>
              {openDate && <DateRange
                editableDateInputs={true}
                onChange={item => setDate([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={date}
                minDate={new Date()}
              />}

              {userType === 'Customer' && 
             
              <MDBRadio
                name="flexRadioDefault"
                id="booked"
                label="Booking"
                checked/>
              }
              {userType === 'Employee' && 
              <MDBRadio
                name="flexRadioDefault"
                id="rented"
                label="Renting"/>    
            }
              <hr className="my-4" />

              <h5 className="mb-4">Payment</h5>

              <MDBRow>
                <MDBCol>
                  <MDBInput
                    label="Name on card"
                    id="nameOnCard"
                    type="text"
                    wrapperClass="mb-4"
                    value={formData.nameOnCard}
                    onChange={handleChange}
                    required
                    placeholder="John"
                  />
                </MDBCol>
                <MDBCol>
                  <MDBInput
                    label="Credit Card Number"
                    id="creditCardNumber"
                    type="text"
                    wrapperClass="mb-4"
                    value={formData.creditCardNumber}
                    onChange={handleChange}
                    required
                    placeholder="1234123412341234"
                  />
                </MDBCol>
              </MDBRow>

              <MDBRow>
                <MDBCol md="3">
                  <MDBInput
                    label="Expiration"
                    id="expiration"
                    type="text"
                    wrapperClass="mb-4"
                    value={formData.expiration}
                    onChange={handleChange}
                    required
                    placeholder="MM/YY"
                  />
                </MDBCol>
                <MDBCol md="3">
                  <MDBInput
                    label="CVV"
                    id="cvv"
                    type="text"
                    wrapperClass="mb-4"
                    value={formData.cvv}
                    onChange={handleChange}
                    required
                    pattern="\d{3}"
                    title="3 Digits"
                    placeholder="123"
                  />
                </MDBCol>
                <MDBRow>
                  <Button className="mb-2 mt-2" variant='success' size="lg" onClick={handleSubmit}>Confirm</Button>
                  <Button variant='danger' size="lg" onClick={cancelBooking}>Cancel</Button>
                </MDBRow>
              </MDBRow>
            </MDBCardBody>
            
          </MDBCard>
        </MDBCol>

        <MDBCol md="4" className="mb-4">
          <MDBCard className="mb-4">
            <MDBCardHeader className="py-3">
              <h5 className="mb-0">Summary</h5>
            </MDBCardHeader>
            <MDBCardBody>
              <MDBListGroup flush>
                <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  Hotel Cost
                  <span>$53.98</span>
                </MDBListGroupItem>
                <hr className="my-2"></hr>
                <MDBListGroupItem className="d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                  <div>
                    <strong>Total amount</strong>
                    <strong>
                      <p className="mb-0">(including HST and Fees)</p>
                    </strong>
                  </div>
                  <span>
                    <strong>$53.98</strong>
                  </span>
                </MDBListGroupItem>
              </MDBListGroup>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
export default Payment;