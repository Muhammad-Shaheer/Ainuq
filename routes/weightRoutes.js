
const WeightModel = require('../models/weight');
const asyncMiddleware = require('../utils/asyncMiddleware');
const status = require('../utils/statusCodes');
const passwordUtils = require('../utils/passwordHash');
const jwt = require('../utils/jwt');
const express = require('express');
const FrameModel = require('../models/frame');
const router = express.Router();


const weightActions = {
    createWeight: asyncMiddleware(async (req, res) => {
        let { id } = req.params;
        let Weight = new WeightModel({ ...req.body });
        newWeight = await Weight.save();
        console.log(newWeight)
        if (newWeight) {
            await FrameModel.findByIdAndUpdate({ _id: id }, { weight: newWeight._id }, { new: true })
            res.status(status.success.created).json({
                message: 'Weight data saved successfully',
                data: newWeight,
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
    getWeight: asyncMiddleware(async (req, res) => {
        let { id } = req.params;
        console.log(id);
        // let weight = await WeightModel.findById({ _id: id })
        // if (weight) {
        //     res.status(status.success.created).json({
        //         message: 'Weight data fetched successfully',
        //         data: weight,
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

    deleteWeight: asyncMiddleware(async (req, res) => {
        let { id } = req.params;
        console.log(id);
       let weight = await WeightModel.findByIdAndDelete({ _id: id })
         if (weight) {
             res.status(status.success.created).json({
                 message: 'Weight data deleted',
                
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
    updateWeight: asyncMiddleware(async (req, res) => {
        let { id } = req.params;
        console.log(id);
         let weight = await WeightModel.findByIdAndUpdate({ _id: id },{...req.body}, { new: true })
         if (weight) {
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
router.post('/create-weight/:id', weightActions.createWeight)
router.get('/get-weight/:id', weightActions.getWeight)
router.delete('/delete-weight/:id', weightActions.deleteWeight)
router.put('/update-weight/:id',weightActions.updateWeight)
// User

module.exports = router;