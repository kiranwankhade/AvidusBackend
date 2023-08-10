const express =  require("express");

const propertyRouters = express.Router();

const {PropertyModel} =  require("../Model/Property.model");


const {auth} = require("../Middleware/authenticate.middleware")

propertyRouters.use(auth)

propertyRouters.get("/",async (req,res)=>{
    console.log("Home");
    let retrieve = await PropertyModel.find();
    res.send(retrieve)
});

propertyRouters.post("/addprop",async(req,res)=>{
    const {title, description, location, price,size }=req.body
    try{
        const newProperty = new PropertyModel({
            title,
            description,
            location,
            price,
            size,
            owner: req.user.userID
        });

        const savedProperty = await newProperty.save();
        res.json(savedProperty);
    }catch(err){
        res.send("Error in Property addition")
        console.log(err)
    }
});


propertyRouters.get("/:id",async(req,res)=>{
    const ID=req.params['id']
    try{
        let retrieve = await PropertyModel.findById({_id:ID})
        console.log('retrieve:', retrieve)
        res.send(retrieve)
    }catch(err){
        console.log(err)
        res.send({"err":"something went wrong"})
    }
})



propertyRouters.get('/search', async (req, res) => {
    // try {
    //     const searchQuery = req.query.q;

    //     if (!searchQuery) return res.status(400).json({ msg: "Provide a search query." });

    //     const properties = await PropertyModel.find({
    //         $text: { $search: searchQuery }
    //     });

    //     res.json(properties);
    // } catch (err) {
    //     res.status(500).json({ error: err.message });
    // }

    try {
        const searchQuery = req.query.q;

        if (!searchQuery) return res.status(400).json({ msg: "Provide a search query." });

        const regex = new RegExp(searchQuery, 'i');  // 'i' makes it case insensitive

        const properties = await PropertyModel.find({
            $or: [
                { title: { $regex: regex } },
                { description: { $regex: regex } },
                { location: { $regex: regex } }
            ]
        });

        res.json(properties);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports={
    propertyRouters
}

