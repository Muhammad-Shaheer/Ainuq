
const EyemeasureModel = require('../models/eyemeasure');
const asyncMiddleware = require('../utils/asyncMiddleware');
const status = require('../utils/statusCodes');
const passwordUtils = require('../utils/passwordHash');
const jwt = require('../utils/jwt');
const express = require('express');
const router = express.Router();


const eyemeasureActions = {
    createEyemeasure: asyncMiddleware(async (req, res) => {
        let Eyemeasure = new EyemeasureModel({ ...req.body });
        newEyemeasure = await Eyemeasure.save();
        console.log(newEyemeasure)
        if (newEyemeasure) {

            await EyemeasureModel.findByIdAndUpdate({ _id: newEyemeasure._id }, { $push: { user: userid } }, { new: true });


            res.status(status.success.created).json({
                message: 'Eyemeasure data saved successfully',
                data: newEyemeasure,
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
    getEyemeasure: asyncMiddleware(async (req, res) => {
        let { id } = req.params;
        console.log(id);
         let eyemeasure = await (await EyemeasureModel.findById({ _id: id })).populate('User')
         if (eyemeasure) {
             res.status(status.success.created).json({
                 message: 'Eyem data fetched successfully',
                 data: eyemeasure,
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
    deleteEyemeasure: asyncMiddleware(async (req, res) => {
        let { id } = req.params;
        console.log(id);
         let eyemeasure = await EyemeasureModel.findByIdAndDelete({ _id: id })
         if (eyemeasure) {
             res.status(status.success.created).json({
                 message: 'Eyemeasure Deleted successfully',
                 data: eyemeasure,
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
    updateEyemeasure: asyncMiddleware(async (req, res) => {
        let { id } = req.params;
        console.log(id);
         let eyemeasure = await EyemeasureModel.findByIdAndUpdate({ _id: id },{...req.body}, { new: true })
         if (eyemeasure) {
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
router.post('/create-eyemeasure', eyemeasureActions.createEyemeasure)
router.get('/get-eyemeasure/:id', eyemeasureActions.getEyemeasure)
router.delete('/delete-eyemeasure/:id', eyemeasureActions.deleteEyemeasure)
router.put('/update-eyemeasure/:id',eyemeasureActions.updateEyemeasure)
// User

module.exports = router;