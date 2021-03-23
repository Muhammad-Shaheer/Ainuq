
const GlassModel = require('../models/glass');
const asyncMiddleware = require('../utils/asyncMiddleware');
const status = require('../utils/statusCodes');
const passwordUtils = require('../utils/passwordHash');
const jwt = require('../utils/jwt');
const express = require('express');
const router = express.Router();


const glassActions = {
    createGlass: asyncMiddleware(async (req, res) => {
        let { id } = req.params;
        let Glass = new GlassModel({ ...req.body });
        newGlass = await Glass.save();
        console.log(newGlass)
        if (newGlass) {
            await OrderModel.findByIdAndUpdate({ _id: id }, { glasses: newGlass._id }, { new: true })

            res.status(status.success.created).json({
                message: 'Glass data saved successfully',
                data: newGlass,
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
    getGlass: asyncMiddleware(async (req, res) => {
        let { id } = req.params;
        console.log(id);
         let glass = await (await GlassModel.findById({ _id: id })).populate('material')
         if (glass) {
             res.status(status.success.created).json({
                 message: 'glass data fetched successfully',
                 data:glass,
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
    deleteGlass: asyncMiddleware(async (req, res) => {
        let { id } = req.params;
        console.log(id);
         let glass = await (await GlassModel.findByIdAndDelete({ _id: id }))
         if (glass) {
            res.status(status.success.created).json({
                 message: 'glass data deleted successfully',
                
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
    updateGlass: asyncMiddleware(async (req, res) => {
        let { id } = req.params;
        console.log(id);
         let glass = await GlassModel.findByIdAndUpdate({ _id: id },{...req.body}, { new: true })
         if (glass) {
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
router.post('/create-glass', glassActions.createGlass)
router.get('/get-glass/:id', glassActions.getGlass)
router.delete('/delete-glass/:id', glassActions.deleteGlass)
router.put('/update-glass/:id',glassActions.updateGlass)
// User

module.exports = router;