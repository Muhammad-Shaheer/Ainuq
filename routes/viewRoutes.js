
const ViewModel = require('../models/view');
const asyncMiddleware = require('../utils/asyncMiddleware');
const status = require('../utils/statusCodes');
const passwordUtils = require('../utils/passwordHash');
const jwt = require('../utils/jwt');
const express = require('express');
const router = express.Router();


const viewActions = {
    createView: asyncMiddleware(async (req, res) => {
        let { productid } = req.body;
        console.log(productid);
        let { userid } = req.body;
        console.log(userid);
        let View = new ViewModel({ ...req.body });
        newView = await View.save();
        if (newView) {
            await ViewModel.findByIdAndUpdate({ _id: newView._id }, { $push: { user: userid }, $push: {product:productid} }, { new: true });
            res.status(status.success.created).json({
                message: 'view data saved successfully',
                data: newView,
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
    getView: asyncMiddleware(async (req, res) => {
        let { id } = req.params;
        console.log(id);
        let view = await ViewModel.findById({ _id: id }).ViewModel.find().populate('user').populate('product')
        if (view) {
            res.status(status.success.created).json({
                message: 'View data fetched successfully',
                data: view,
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
    deleteView: asyncMiddleware(async (req, res) => {
        let { id } = req.params;
        console.log(id);
        let view = await ViewModel.findByIdAndDelete({ _id: id })
        if (view) {
            res.status(status.success.created).json({
                message: 'View data deleted',

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

    updateView: asyncMiddleware(async (req, res) => {
        let { id } = req.params;
        console.log(id);
         let view = await ViewModel.findByIdAndUpdate({ _id: id },{...req.body}, { new: true })
         if (view) {
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
router.post('/create-view', viewActions.createView)
router.get('/get-view/:id', viewActions.getView)
router.delete('/delete-view/:id', viewActions.deleteView)
router.put('/update-view/:id',viewActions.updateView)

// User

module.exports = router;