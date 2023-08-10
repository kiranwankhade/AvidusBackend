const express =  require("express");

const bookingRouters = express.Router();

const {BookingModel} =  require("../Model/Booking.model");


const {auth} = require("../Middleware/authenticate.middleware")

bookingRouters.use(auth)

// bookingRouters.get("/",async (req,res)=>{
//     console.log("Home");
//     let retrieve = await BookingModel.find();
//     res.send(retrieve)
// });

bookingRouters.post('/', auth, async (req, res) => {
    try {
        const { propertyId, startDate, endDate } = req.body;

        // Validate inputs
        if (!propertyId || !startDate || !endDate) {
            return res.status(400).json({ msg: "All fields are required." });
        }

        const newBooking = new BookingModel({
            property: propertyId,
            user: req.user.id,
            startDate: new Date(startDate),
            endDate: new Date(endDate)
        });

        const savedBooking = await newBooking.save();
        res.json(savedBooking);
        res.send("Property Added")    
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

bookingRouters.get('/mybookings', auth, async (req, res) => {
    try {
        const bookings = await BookingModel.find({ user: req.user.id }).populate('property');

        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports={
    bookingRouters
}

