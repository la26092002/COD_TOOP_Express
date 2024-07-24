const express = require('express');
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//const Order = require("../../models/Order");
const Product = require("../../models/Product");
const Seller = require("../../models/Seller");
const Warhouse = require("../../models/Warhouse");
require('dotenv').config();

const auth = require('../../middleware/auth')

//@route    POST api/auth
//@desc     Test route
//@access   Public
router.post(
    "/",
    [
        check("email", "Please include a valid email").isEmail(),
        check("password", "Password is required").exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(401).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        try {
            let seller = await Seller.findOne({ email });

            if (!seller) {
                return res
                    .status(402)
                    .json({ errors: [{ msg: "Invalid Credentials 1" }] });
            }

           const isMatch = await bcrypt.compare(password,seller.password)
           if(!isMatch){
            return res.status(403).json({errors: [{msg: 'Invalid Credentials 2'}]})
           }

            const payload = {
                seller: {
                    id: seller.id,
                },
            };

            jwt.sign(
                payload,
                process.env.jwtSecret,
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Server error");
        }

    }
);

//register
//@route    POST api/register
//@desc     Register seller
//@access   Public
router.post(
    "/register",
    [
        check("name", "Name is required").not().isEmpty(), //To be there and not empty   
        check("email", "Please include a valid email").isEmail(),
        check("password", "Please enter a password with 6 or more char").isLength({
            min: 6,
        }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;
        try {
            let seller = await Seller.findOne({ email });

            if (seller) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: "seller already exists" }] });
            }
           
            seller = new Seller({
                name,
                email,
                password,
            });

            const salt = await bcrypt.genSalt(10);

            seller.password = await bcrypt.hash(password, salt);

            seller.save();

            const payload = {
                seller: {
                    id: seller.id,
                },
            };

            jwt.sign(
                payload,
                process.env.jwtSecret,
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            console.log(err.message);
            res.status(500).json({ error: err.message });
        }

    }
);




module.exports = router;