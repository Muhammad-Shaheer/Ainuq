
const OrderModel = require('../models/order');
const asyncMiddleware = require('../utils/asyncMiddleware');
const status = require('../utils/statusCodes');
const passwordUtils = require('../utils/passwordHash');
const jwt = require('../utils/jwt');
const express = require('express');
const router = express.Router();


const orderActions = {
    createOrder: asyncMiddleware(async (req, res) => {
        let Order = new OrderModel({ ...req.body });
        newOrder = await Order.save();
        console.log(newOrder)
        if (newOrder) {
            res.status(status.success.created).json({
                message: 'Order data saved successfully',
                data: newOrder,
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
    getOrder: asyncMiddleware(async (req, res) => {
        let { id } = req.params;
        console.log(id);
         let order = await (await OrderModel.findById({ _id: id })).OrderModel.find().populate('glasses').populate('user').populate('shade').populate('product').populate('delievery').populate('status')
         if (order) {
             res.status(status.success.created).json({
                 message: 'Order data fetched successfully',
                 data: order,
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
    deleteOrder: asyncMiddleware(async (req, res) => {
        let { id } = req.params;
        console.log(id);
         let order = await OrderModel.findByIdAndDelete({ _id: id })
         if (order) {
             res.status(status.success.created).json({
                 message: 'data delete successfully',
                 
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
    updateOrder: asyncMiddleware(async (req, res) => {
        let { id } = req.params;
        console.log(id);
         let order = await OrderModel.findByIdAndUpdate({ _id: id },{...req.body}, { new: true })
         if (order) {
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
router.post('/create-order', orderActions.createOrder)
router.get('/get-order/:id', orderActions.getOrder)
router.delete('/delete-order/:id', orderActions.deleteOrder)
router.put('/update-order/:id',orderActions.updateOrder)
// User

module.exports = router;