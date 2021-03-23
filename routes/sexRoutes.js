
const SexModel = require('../models/sex');
const asyncMiddleware = require('../utils/asyncMiddleware');
const status = require('../utils/statusCodes');
const passwordUtils = require('../utils/passwordHash');
const jwt = require('../utils/jwt');
const express = require('express');
const router = express.Router();


const sexActions = {
    createSex: asyncMiddleware(async (req, res) => {
        let { id } = req.params;
        let Sex = new SexModel({ ...req.body });
        newSex = await Sex.save();
        console.log(newSex)
        if (newSex) {
            await FrameModel.findByIdAndUpdate({ _id: id }, { sex: newSex._id }, { new: true })

            res.status(status.success.created).json({
                message: 'Sex data saved successfully',
                data: newSex,
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
    getSex: asyncMiddleware(async (req, res) => {
        let { id } = req.params;
        console.log(id);
        // let sex = await SexModel.findById({ _id: id })
        // if (sex) {
        //     res.status(status.success.created).json({
        //         message: 'Sex data fetched successfully',
        //         data: news,
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
    deleteSex: asyncMiddleware(async (req, res) => {
        let { id } = req.params;
        console.log(id);
         let sex = await SexModel.findByIdAndDelete({ _id: id })
         if (sex) {
             res.status(status.success.created).json({
                 message: 'Sex data deleted successfully',
                 
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
    updateSex: asyncMiddleware(async (req, res) => {
        let { id } = req.params;
        console.log(id);
         let sex = await SexModel.findByIdAndUpdate({ _id: id },{...req.body}, { new: true })
         if (sex) {
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
router.post('/create-sex/:id', sexActions.createSex)
router.get('/get-sex/:id', sexActions.getSex)
router.delete('/delete-sex/:id', sexActions.deleteSex)
router.put('/update-sex/:id',sexActions.updateSex)
// User

module.exports = router;