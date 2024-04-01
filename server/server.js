const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./database");

app.use(express.json());
app.use(cors());

//ROUTES//

//get all rooms that meet criteria provided by user

app.post("/roomsfromarea", async (req, res) => {
    try {
        // Extract the area parameter from the request query
        const { area, chains, price, startDate, endDate, numOfPeople, categories, minRooms, maxRooms } = req.body;

        // Check if the area parameter is provided by the user
        if (!area) {
            return res.status(400).json({ message: "Area parameter is required" });
        }

        console.log(area);
        
        // SQL query with parameters
        let query = 'SELECT r.room_ID, h.hotel_name, h.rating_category AS hotel_rating, h.address AS hotel_address, hc.chain_name AS hotel_chain_name, r.room_number, r.price, r.amenities, r.capacity, rv.view, rd.defects, re.extendable FROM ehotel.room r JOIN ehotel.hotel h ON r.hotel_ID = h.hotel_ID JOIN ehotel.hotel_chain hc ON h.chain_ID = hc.chain_ID JOIN ehotel.available_room ar ON r.room_ID = ar.room_ID LEFT JOIN ehotel.room_view rv ON r.room_ID = rv.room_ID LEFT JOIN ehotel.room_defects rd ON r.room_ID = rd.room_ID LEFT JOIN ehotel.room_extendable re ON r.room_ID = re.room_ID WHERE h.address LIKE $1 AND hc.chain_name IN (SELECT DISTINCT chain_name FROM ehotel.hotel_chain)';
        
        // If chains are specified, add them to the query
        if (chains && chains.length > 0) {
            console.log(chains);
            query += ' AND hc.chain_name IN ' + chains;
            console.log(query);
        }
        // If price is specified, add to the query
        if (price && price > 0.00) {
            console.log(price);
            query += ' AND r.price <= ' + price;
            console.log(query);
        }
        // If dates are specified, add to the query
        if (startDate && endDate) {
            query += " AND ar.start_date_available < '" + startDate + "'";
            query += " AND ar.end_date_available > '" + endDate + "'";
            console.log(query);
        }
        console.log(startDate);
        console.log(endDate);
        
        // If number of people is specified, add to the query
        if (numOfPeople && numOfPeople > 0) {
            console.log(numOfPeople);
            query += ' AND r.capacity >= ' + numOfPeople;
            console.log(query);
        }

        // If categories are specified, add them to the query
        if (categories && categories.length > 0) {
            console.log(categories);
            query += ' AND h.rating_category IN ' + categories;
            console.log(query);
        }

        // If min number of rooms in hotel is specified, add to the query
        if (minRooms && minRooms > 0) {
            console.log(minRooms);
            query += ' AND h.number_of_room >= ' + minRooms;
            console.log(query);
        }

        // If max number of rooms in hotel is specified, add to the query
        if (maxRooms && maxRooms > 0) {
            console.log(maxRooms);
            query += ' AND h.number_of_room <= ' + maxRooms;
            console.log(query);
        }


        const allRoomsFromArea = await pool.query(query, [`%${area}%`]);

        // Send results to the client
        res.json(allRoomsFromArea.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// add a reservation
app.post("/addReservation", async (req, res) => {
    try {
        
        const { roomID, firstName, middleName, lastName, address, phone, nameOnCard, creditCardNumber, expiration, cvv, startDate, endDate } = req.body;

        console.log(startDate);
        // SQL query with parameters
        let query = "INSERT INTO ehotel.person (first_name, middle_name, last_name, address) VALUES ('"+firstName+"', '"+middleName+"', '"+lastName+"', '"+address+"'); INSERT INTO ehotel.customer (first_name, middle_name, last_name, address, ID, start_date, end_date) VALUES ('"+firstName+"', '"+middleName+"', '"+lastName+"', '"+address+"', FLOOR(RANDOM() * 9000000) + 1000000, DATE '"+startDate+"', NULL); INSERT INTO ehotel.reservation (reservation_ID, checkin_date, checkout_date, booked, rented, cust_ID, room_ID) VALUES (FLOOR(RANDOM() * 9000000) + 1000000, DATE '"+startDate+"', DATE '"+endDate+"', TRUE, FALSE, (SELECT ID FROM ehotel.customer ORDER BY ID DESC LIMIT 1), '"+roomID+"'); INSERT INTO ehotel.payment_info (card_number, balance, payment_due, deadline_date) VALUES ('"+creditCardNumber+"', ((RANDOM() * (1000 - 1) + 1)::numeric), ((RANDOM() * (1000 - 1) + 1)::numeric), DATE '"+endDate+"'); INSERT INTO ehotel.payment (card_number, ID) VALUES ('"+creditCardNumber+"', (SELECT ID FROM ehotel.customer ORDER BY ID DESC LIMIT 1));";
        console.log(query);


        const addReservation = await pool.query(query);

    } catch (err) {
        console.error(err.message);
    }
});

//get all customers
app.get("/getCustomers", async (req, res) => {
    try {
        const allCustomers = await pool.query("SELECT * FROM ehotel.customer");
        res.json(allCustomers.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get all employees
app.get("/getEmployees", async (req, res) => {
    try {
        const allEmployees = await pool.query("SELECT * FROM ehotel.employee");
        res.json(allEmployees.rows);
    } catch (err) {
        console.error(err.message);
    }
});
//get all hotels
app.get("/getHotels", async (req, res) => {
    try {
        const allHotels = await pool.query("SELECT * FROM ehotel.hotel");
        res.json(allHotels.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//get all rooms
app.get("/getRooms", async (req, res) => {
    try {
        const allRooms = await pool.query("SELECT * FROM ehotel.room");
        res.json(allRooms.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//delete a room by room ID
app.post("/deleteRoom", async (req, res) => {
    try {
        const { roomID } = req.body;

        // SQL query
        let query = "DELETE FROM ehotel.available_room WHERE room_ID = " + roomID + "; DELETE FROM ehotel.room_view WHERE room_ID = " + roomID + "; DELETE FROM ehotel.room_extendable WHERE room_ID = " + roomID + "; DELETE FROM ehotel.room_defects WHERE room_ID = " + roomID + "; DELETE FROM ehotel.room WHERE room_ID = " + roomID + ";";
        console.log(query);

        const deleteRoom = await pool.query(query);

    } catch (err) {
        console.error(err.message);
    }
});

//delete a customer by customer ID
app.post("/deleteCustomer", async (req, res) => {
    try {
        const { id } = req.body;

        // SQL query
        let query = "DELETE FROM ehotel.customer WHERE ID = " + id;
        console.log(query);

        const deleteCustomer = await pool.query(query);

    } catch (err) {
        console.error(err.message);
    }
});

//delete an employee by sin number
app.post("/deleteEmployee", async (req, res) => {
    try {
        const { sinNumber } = req.body;

        // SQL query
        let query = "UPDATE ehotel.hotel SET mgr_sin_number = NULL WHERE mgr_sin_number = "+sinNumber+"; DELETE FROM ehotel.employee WHERE sin_number = " + sinNumber;
        console.log(query);

        const deleteEmployee = await pool.query(query);

    } catch (err) {
        console.error(err.message);
    }
});

//delete an hotel by hotel ID
app.post("/deleteHotel", async (req, res) => {
    try {
        const { hotelID } = req.body;

        // SQL query
        let query = "DELETE FROM ehotel.room WHERE hotel_ID = " + hotelID + "; DELETE FROM ehotel.room WHERE hotel_ID = " + hotelID + "; DELETE FROM ehotel.rating WHERE hotel_ID = " + hotelID + "; DELETE FROM ehotel.hotel_phone WHERE hotel_ID = " + hotelID + "; DELETE FROM ehotel.hotel WHERE hotel_ID = " + hotelID;
        console.log(query);

        const deleteHotel = await pool.query(query);

    } catch (err) {
        console.error(err.message);
    }
});

app.get("/adduser", (req, res) => {
    console.log(req.body);
    res.send("Response Received: " + req.body);
});

// add a customer
app.post("/addCustomer", async (req, res) => {
    try {
        
        const { firstName, middleName, lastName, address, startDate, endDate } = req.body;

        console.log(startDate);
        // SQL query with parameters
        let query = "INSERT INTO ehotel.person (first_name, middle_name, last_name, address) VALUES ('"+firstName+"', '"+middleName+"', '"+lastName+"', '"+address+"'); INSERT INTO ehotel.customer (first_name, middle_name, last_name, address, ID, start_date, end_date) VALUES ('"+firstName+"', '"+middleName+"', '"+lastName+"', '"+address+"', FLOOR(RANDOM() * 9000000) + 1000000, DATE '"+startDate+"', NULL)";
        console.log(query);


        const addCustomer = await pool.query(query);

    } catch (err) {
        console.error(err.message);
    }
});
app.listen(4000, () => console.log("server on localhost:4000"));