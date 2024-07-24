const express = require('express');
const router = express.Router();
const { check, validationResult } = require("express-validator");

const Order = require("../../models/Order");
const Product = require("../../models/Product");
const Seller = require("../../models/Seller");
const Warhouse = require("../../models/Warhouse");
const auth = require('../../middleware/auth');
require('dotenv').config();

//@route    POST api/Order/:idwarhouse
//@desc     Add Order 
//@access   Private
router.post('/:warhouse',
    [
        auth,
        [
            check("name", "Name is required").not().isEmpty(), //To be there and not empty   
            check("tlphn", "tlphn is required").not().isEmpty(), //To be there and not empty 
            check("adresse", "adresse is required").not().isEmpty(), //To be there and not empty 
            check("produits", "produits is required").not().isEmpty(), //To be there and not empty  
            check("currency", "currency is required").not().isEmpty(), //To be there and not empty   
        ],
    ],
    async (req, res) => {

        try {
            const { warhouse } = req.params;
            if (!warhouse) {
                return res.status(400).send('warhouse not found');
            }


            //req.user.id
            const seller = req.seller;


            const newOrder = new Order({
                warhouse: warhouse,
                seller: seller.id,
                tlphn: req.body.tlphn,
                adresse: req.body.adresse,
                produits: req.body.produits,
                currency: req.body.currency,
                dateUpdated: null
            })
            const order = await newOrder.save();
            res.json(order);

            //res.json(seller.id);
        } catch (err) {
            console.error(err.message)
            res.status(500).send('server Error');
        }
    });



//@route    PUT api/Order/:idOrder
//@desc     Update Order 
//@access   Private
router.put('/:id',
    [
        auth,
        [
            check("name", "Name is required").not().isEmpty(), // To be there and not empty
            check("tlphn", "tlphn is required").not().isEmpty(), // To be there and not empty
            check("adresse", "adresse is required").not().isEmpty(), // To be there and not empty
            check("produits", "produits is required").not().isEmpty(), // To be there and not empty
            check("currency", "currency is required").not().isEmpty(), // To be there and not empty
        ],
    ],
    async (req, res) => {
        try {
            const { id } = req.params; // Use 'id' to identify the order
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            // Find the order by ID and update it
            let order = await Order.findById(id);
            if (!order) {
                return res.status(404).json({ msg: 'Order not found' });
            }

            // Update the order
            order.warhouse = req.body.warhouse || order.warhouse;
            order.tlphn = req.body.tlphn || order.tlphn;
            order.adresse = req.body.adresse || order.adresse;
            order.produits = req.body.produits || order.produits;
            order.currency = req.body.currency || order.currency;
            order.dateUpdated = Date.now();

            await order.save();

            res.json(order);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });


//@route    PUT api/Order/:idOrder
//@desc     Update Order 
//@access   Private
router.delete('/:id',
    [
        auth,
    ],
    async (req, res) => {
        try {
            const { id } = req.params; // Use 'id' to identify the order
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            // Find the order by ID and update it
            let order = await Order.findById(id);
            if (!order) {
                return res.status(404).json({ msg: 'Order not found' });
            }

            // Update the order
            order.status = true;

            await order.save();

            res.json(order);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    });




//@route    GET api/Order/
//@desc     Get all OrderS
//@access   Public
router.get('',
    [
        auth,
    ], async (req, res) => {

        try {
            order = await Order.find({ status: false }).sort({ date: -1 });

            return res.status(200).json(order);
        } catch (err) {
            console.error(err.message)
            res.status(500).send('server Error');
        }
    });


module.exports = router;