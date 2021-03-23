
const OrderstatusModel = require('../models/orderstatus');
const asyncMiddleware = require('../utils/asyncMiddleware');
const status = require('../utils/statusCodes');
const passwordUtils = require('../utils/passwordHash');
const jwt = require('../utils/jwt');
const express = require('express');
const router = express.Router();


const orderstatusActions = {
    createOrderstatus: asyncMiddleware(async (req, res) => {
        
        let { id } = req.params;
        let Orderstatus = new OrderstatusModel({ ...req.body });
        newOrderstatus = await Orderstatus.save();
        console.log(newOrderstatus)
        if (newOrderstatus) {
            await OrderstatusModel.findByIdAndUpdate({ _id: id }, { status: newOrderstatus._id }, { new: true })

            res.status(status.success.created).json({
                message: 'Orderstatus data saved successfully',
                data: newOrderstatus,
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
    getOrderstatus: asyncMiddleware(async (req, res) => {
        let { id } = req.params;
        console.log(id);
        // let orderstatus = await OrderstatusModel.findById({ _id: id })
        // if (orderstatus) {
        //     res.status(status.success.created).json({
        //         message: 'Orderstatus data fetched successfully',
        //         data: orderstatus,
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
    
    deleteOrderstatus: asyncMiddleware(async (req, res) => {
        let { id } = req.params;
        console.log(id);
         let orderstatus = await OrderstatusModel.findByIdAndDelete({ _id: id })
         if (orderstatus) {
             res.status(status.success.created).json({
                 message: 'Orderstatus deleted successfully',
                 
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
    updateOrderstatus: asyncMiddleware(async (req, res) => {
        let { id } = req.params;
        console.log(id);
         let orderstatus = await OrderstatusModel.findByIdAndUpdate({ _id: id },{...req.body}, { new: true })
         if (orderstatus) {
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
router.post('/create-order', orderstatusActions.createOrderstatus)
router.get('/get-order/:id', orderstatusActions.getOrderstatus)
router.delete('/delete-order/:id', orderstatusActions.deleteOrderstatus)
router.put('/update-orderstatus/:id',orderstatusActions.updateOrderstatus)
// User

module.exports = router;