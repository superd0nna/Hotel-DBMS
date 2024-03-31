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
  MDBBtn,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import Button from 'react-bootstrap/Button';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Payment() {
  let toHome = useNavigate()

  const [formData, setFormData] = useState({
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
                type="number"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="613-123-4567"
              />
              <hr className="my-4" />

              <h5 className="mb-4">Payment</h5>

              <MDBRadio
                name="flexRadioDefault"
                id="flexRadioDefault1"
                label="Credit card"
                checked
              />

              <MDBRadio
                name="flexRadioDefault"
                id="flexRadioDefault2"
                label="Debit card"
              />

              <MDBRadio
                name="flexRadioDefault"
                id="flexRadioDefault2"
                label="Paypal"
                wrapperClass="mb-4"
              />

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