
const FrameModel = require('../models/frame');
const asyncMiddleware = require('../utils/asyncMiddleware');
const status = require('../utils/statusCodes');
const passwordUtils = require('../utils/passwordHash');
const jwt = require('../utils/jwt');
const express = require('express');
const ColourModel = require('../models/colour');
const ViewModel = require('../models/view');
const OrderstatusModel = require('../models/orderstatus');
const router = express.Router();


const frameActions = {
    createFrame: asyncMiddleware(async (req, res) => {
        let { id } = req.params;
        let{viewid,orderStatusid}=req.body;
        let Frame = new FrameModel({ ...req.body });
        newFrame = await Frame.save();
        console.log(newFrame)
        if (newFrame) {
            await ColourModel.findByIdAndUpdate({ _id: id }, { product: newFrame._id }, { new: true })
            await ViewModel.findByIdAndUpdate({ _id: id }, { product: newFrame._id }, { new: true })
            await OrderstatusModel.findByIdAndUpdate({ _id: id }, { status: newFrame._id }, { new: true })

            res.status(status.success.created).json({
                message: 'Frame data saved successfully',
                data: newFrame,
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
    getFrame: asyncMiddleware(async (req, res) => {
        let { id } = req.params;
        console.log(id);
         let frame = await FrameModel.findById({ _id: id }).FrameModel.find().populate('weight').populate('sex').populate('material').populate('thickness').populate('category')
         if (frame) {
             res.status(status.success.created).json({
                 message: 'News data fetched successfully',
                 data: frame,
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
    deleteFrame: asyncMiddleware(async (req, res) => {
        let { id } = req.params;
        console.log(id);
        let frame = await FrameModel.findByIdAndDelete({ _id: id })
        if (frame) {
            res.status(status.success.created).json({
                message: 'frame deleted successfully',
                data: frame,
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

    updateFrame: asyncMiddleware(async (req, res) => {
        let { id } = req.params;
        console.log(id);
         let frame = await FrameModel.findByIdAndUpdate({ _id: id },{...req.body}, { new: true })
         if (frame) {
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
router.post('/create-frame/:id', frameActions.createFrame)
router.get('/get-frame/:id', frameActions.getFrame)
router.delete('/delete-frame/:id', frameActions.deleteFrame)
router.put('/update-frame/:id',frameActions.updateFrame)
// User


module.exports = router;