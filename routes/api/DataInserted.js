const express = require('express');
const router = express.Router();
const { check, validationResult } = require("express-validator");
//const Order = require("../../models/Order");
const Product = require("../../models/Product");
//const Seller = require("../../models/Seller");
const Warhouse = require("../../models/Warhouse");
require('dotenv').config();

//@route    POST /api/dataInserted/Warhouse
//@desc     Create a warhouse
//@access   Public
router.post('/Warhouse', [[
    check("name", "name is required").not().isEmpty(),
    check("location", "location is required").not().isEmpty(),
]
], async (req, res) => {
    const errors = validationResult(req);//if there is error for checking it will store errors
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const newWarhouse = new Warhouse({
            name: req.body.name,
            location: req.body.location,
        })
        const warhouse = await newWarhouse.save();
        res.json(warhouse);
    } catch (err) {
        console.error(err.message)
        res.status(500).send('server Error');
    }
});



//@route    GET /api/dataInserted/Warhouse
//@desc     Get all Warhouse
//@access   Public
router.get('/Warhouse', async (req, res) => {

    try {
        warhouse = await Warhouse.find().sort({ date: -1 });
        return res.status(200).json(warhouse);
    } catch (err) {
        console.error(err.message)
        res.status(500).send('server Error');
    }
});


//  Product 


//@route    POST /api/dataInserted/Product/:warhouse
//@desc     Create a Product
//@access   Public
router.post('/Product/:warhouse', [[
    check("name", "name is required").not().isEmpty(),
]
], async (req, res) => {
    const errors = validationResult(req);//if there is error for checking it will store errors
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {warhouse} = req.params;
        if(!warhouse){
            return res.status(400).send('warhouse not found');
        }
    try {
        //const user = req.user.id;


        const newProduct = new Product({
            name: req.body.name,
        })
        const product = await newProduct.save();
        res.json(product);
    } catch (err) {
        console.error(err.message)
        res.status(500).send('server Error');
    }
});



//@route    GET /api/dataInserted/Product
//@desc     Get all Product
//@access   Public
router.get('/Product', async (req, res) => {

    try {
        product = await Product.find().sort({ date: -1 });
        return res.status(200).json(product);
    } catch (err) {
        console.error(err.message)
        res.status(500).send('server Error');
    }
});


module.exports = router;