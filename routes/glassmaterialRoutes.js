
const GlassmaterialModel = require('../models/glassmaterial');
const asyncMiddleware = require('../utils/asyncMiddleware');
const status = require('../utils/statusCodes');
const passwordUtils = require('../utils/passwordHash');
const jwt = require('../utils/jwt');
const express = require('express');
const OrderModel = require('../models/order');
const router = express.Router();


const glassmaterialActions = {
    createGlassmaterial: asyncMiddleware(async (req, res) => {
        let Glassmaterial = new GlassmaterialModel({ ...req.body });
        newGlassmaterial = await Glassmaterial.save();
        console.log(newGlassmaterial)
        if (newGlassmaterial) {

            res.status(status.success.created).json({
                message: 'Glassmaterial data saved successfully',
                data: newGlassmaterial,
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
    getGlassmaterial: asyncMiddleware(async (req, res) => {
        let { id } = req.params;
        console.log(id);
         let glassmaterial = await (await GlassmaterialModel.findById({ _id: id })).populate('material')
         if (glassmaterial) {
             res.status(status.success.created).json({
                 message: 'News data fetched successfully',
                 data: news,
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

    deleteGlassmaterial: asyncMiddleware(async (req, res) => {
        let { id } = req.params;
        console.log(id);
         let glassmaterial = await GlassmaterialModel.findByIdAndDelete({ _id: id })
         if (glassmaterial) {
             res.status(status.success.created).json({
                 message: 'glass material deletes successfully',
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

    updateGlassmaterial: asyncMiddleware(async (req, res) => {
        let { id } = req.params;
        console.log(id);
         let glassmaterial = await GlassmaterialModel.findByIdAndUpdate({ _id: id },{...req.body}, { new: true })
         if (glassmaterial) {
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
router.post('/create-glassmaterial', glassmaterialActions.createGlassmaterial)
router.get('/get-glassmaterial/:id', glassmaterialActions.getGlassmaterial)
router.delete('/delete-glassmaterial/:id', glassmaterialActions.deleteGlassmaterial)
router.put('/update-glassmaterial/:id',glassmaterialActions.updateGlassmaterial)
// User

module.exports = router;