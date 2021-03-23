
const AddressModel = require('../models/address');
const asyncMiddleware = require('../utils/asyncMiddleware');
const status = require('../utils/statusCodes');
const passwordUtils = require('../utils/passwordHash');
const jwt = require('../utils/jwt');
const express = require('express');
const router = express.Router();


const addressActions = {
    createAddress: asyncMiddleware(async (req, res) => {

        let { userid } = req.body;
        console.log(userid);

        let Address = new AddressModel({ ...req.body });
        
        newAddress = await Address.save();
        console.log(newAddress)
        if (newAddress) {

            await AddressModel.findByIdAndUpdate({ _id: newAddress._id }, { $push: { user: userid } }, { new: true });

            res.status(status.success.created).json({
                message: 'Address data saved successfully',
                data: newAddress,
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
    getAddress: asyncMiddleware(async (req, res) => {
        let { id } = req.params;
        console.log(id);
         let address = await AddressModel.findById({ _id: id }).populate('User')
         if (address) {
             res.status(status.success.created).json({
                 message: 'Address data fetched successfully',
                 data: address,
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
    deleteAddress: asyncMiddleware(async (req, res) => {
        let { id } = req.params;
        console.log(id);
         let address = await AddressModel.findByIdAndDelete({ _id: id })
         if (address) {
             res.status(status.success.created).json({
                 message: 'Address data delete ',
                 data: address,
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
    updateAddress: asyncMiddleware(async (req, res) => {
        let { id } = req.params;
        console.log(id);
         let address = await AddressModel.findByIdAndUpdate({ _id: id },{...req.body}, { new: true })
         if (address) {
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
router.post('/create-address', addressActions.createAddress)
router.get('/get-address/:id', addressActions.getAddress)
router.delete('/delete-address/:id', addressActions.deleteAddress)
router.put('/update-address/:id',addressActions.updateAddress)
// User

module.exports = router;