
const MaterialModel = require('../models/material');
const asyncMiddleware = require('../utils/asyncMiddleware');
const status = require('../utils/statusCodes');
const passwordUtils = require('../utils/passwordHash');
const jwt = require('../utils/jwt');
const express = require('express');
const GlassModel = require('../models/glass');
const router = express.Router();


const materialActions = {

    createMaterial: asyncMiddleware(async (req, res) => {
        let { id } = req.params;
        let Material = new MaterialModel({ ...req.body });
        newMaterial = await Material.save();
        console.log(newMaterial)
        if (newMaterial) {
            await FrameModel.findByIdAndUpdate({ _id: id }, { material: newMaterial._id }, { new: true })
            await GlassModel.findByIdAndUpdate({ _id: id }, { material: newMaterial._id }, { new: true })

            res.status(status.success.created).json({
                message: 'Material data saved successfully',
                data: newMaterial,
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
    getMaterial: asyncMiddleware(async (req, res) => {
        let { id } = req.params;
        console.log(id);
        // let material = await MaterialModel.findById({ _id: id })
        // if (material) {
        //     res.status(status.success.created).json({
        //         message: 'Material data fetched successfully',
        //         data: material,
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

    deleteMaterial: asyncMiddleware(async (req, res) => {
        let { id } = req.params;
        console.log(id);
         let material = await MaterialModel.findByIdAndDelete({ _id: id })
         if (material) {
             res.status(status.success.created).json({
                 message: 'Material data deleted successfully',
                
                 status: 200
             });
0
         }
         else {
             res.status(status.success.created).json({
                 message: 'Something went wrong',
                 status: 400
             });
         }
    }),

    updateMaterial: asyncMiddleware(async (req, res) => {
        let { id } = req.params;
        console.log(id);
         let material = await MaterialModel.findByIdAndUpdate({ _id: id },{...req.body}, { new: true })
         if (material) {
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
router.post('/create-material', materialActions.createMaterial)
router.get('/get-material/:id', materialActions.getMaterial)
router.delete('/delete-material/:id', materialActions.deleteMaterial)
router.put('/update-material/:id',materialActions.updateMaterial)
// User

module.exports = router;