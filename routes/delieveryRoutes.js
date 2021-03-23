
const DelieveryModel = require('../models/delievery');
const asyncMiddleware = require('../utils/asyncMiddleware');
const status = require('../utils/statusCodes');
const passwordUtils = require('../utils/passwordHash');
const jwt = require('../utils/jwt');
const express = require('express');
const OrderstatusModel = require('../models/orderstatus');
const router = express.Router();


const delieveryActions = {
    createDelievery: asyncMiddleware(async (req, res) => {
        let { id } = req.params;
        let Delievery = new DelieveryModel({ ...req.body });
        newDelievery = await Delievery.save();
        console.log(newDelievery)
        if (newDelievery) {
            await OrderstatusModel.findByIdAndUpdate({ _id: id }, { delievery: newDelievery._id }, { new: true })

            res.status(status.success.created).json({
                message: 'Delievery data saved successfully',
                data: newDelievery,
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
    getDelievery: asyncMiddleware(async (req, res) => {
        let { id } = req.params;
        console.log(id);
        // let delievery = await DelieveryModel.findById({ _id: id })
        // if (delievery) {
        //     res.status(status.success.created).json({
        //         message: 'Delievery data fetched successfully',
        //         data: delievery,
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
    deleteDelievery: asyncMiddleware(async (req, res) => {
        let { id } = req.params;
        console.log(id);
         let delievery = await DelieveryModel.findByIdAndDelete({ _id: id })
         if (delievery) {
             res.status(status.success.created).json({
                 message: 'Delievery data deleted',
                 data: delievery,
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
    updateDelievery: asyncMiddleware(async (req, res) => {
        let { id } = req.params;
        console.log(id);
         let delievery = await DelieveryModel.findByIdAndUpdate({ _id: id },{...req.body}, { new: true })
         if (delievery) {
             res.status(status.success.created).json({
                 message: 'data updated',
        
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
router.post('/create-delievery', delieveryActions.createDelievery)
router.get('/get-delievery/:id', delieveryActions.getDelievery)
router.delete('/delete-delievery/:id', delieveryActions.deleteDelievery)
router.put('/update-delievery/:id',delieveryActions.updateDelievery)
// User

module.exports = router;