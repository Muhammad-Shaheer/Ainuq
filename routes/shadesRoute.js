
const ShadesModel = require('../models/shades');
const asyncMiddleware = require('../utils/asyncMiddleware');
const status = require('../utils/statusCodes');
const passwordUtils = require('../utils/passwordHash');
const jwt = require('../utils/jwt');
const express = require('express');
const OrderstatusModel = require('../models/orderstatus');
const OrderModel = require('../models/order');
const router = express.Router();


const shadesActions = {
    createShades: asyncMiddleware(async (req, res) => {

        let { id } = req.params;

        let Shades = new ShadesModel({ ...req.body });
        newShades = await Shades.save();
        console.log(newShades)
        if (newShades) {
            await OrderModel.findByIdAndUpdate({ _id: id }, { shades: newShades._id }, { new: true })

            res.status(status.success.created).json({
                message: 'Shades data saved successfully',
                data: newShades,
                status: 200
            });

        }
        else {
            res.status(status.success.created).json({
                message: 'Something went wrong',
                status: 400
            });
        }
    }),
    getShades: asyncMiddleware(async (req, res) => {
        let { id } = req.params;
        console.log(id);
        // let shades = await ShadesModel.findById({ _id: id })
        // if (shades) {
        //     res.status(status.success.created).json({
        //         message: 'shades data fetched successfully',
        //         data: shades,
        //         status: 200
        //     });

        // }
        // else {
        //     res.status(status.success.created).json({
        //         message: 'Something went wrong',
        //         status: 400
        //     });
        // }
    }),
    deleteShades: asyncMiddleware(async (req, res) => {
        let { id } = req.params;
        console.log(id);
         let shades = await ShadesModel.findByIdAndDelete({ _id: id })
         if (shades) {
             res.status(status.success.created).json({
                 message: 'shades data deleted',
                 data: shades,
                 status: 200
             });

         }
         else {
             res.status(status.success.created).json({
                 message: 'Something went wrong',
                 status: 400
             });
         }
    }),

};
router.post('/create-shades', shadesActions.createShades)
router.get('/get-shades/:id', shadesActions.getShades)
router.delete('/delete-shades/:id', shadesActions.deleteShades)

// User

module.exports = router;