
const ThicknessModel = require('../models/thickness');
const asyncMiddleware = require('../utils/asyncMiddleware');
const status = require('../utils/statusCodes');
const passwordUtils = require('../utils/passwordHash');
const jwt = require('../utils/jwt');
const express = require('express');
const router = express.Router();


const thicknessActions = {
    createThickness: asyncMiddleware(async (req, res) => {
        let { id } = req.params;
        let thickness = new ThicknessModel({...req.body});
        newThickness =await thickness.save();
        console.log(newThickness)
       if(newThickness){
        await FrameModel.findByIdAndUpdate({ _id: id }, { thickness: newThickness._id }, { new: true })


        res.status(status.success.created).json({
            message: 'Thickness data saved successfully',
            data: newThickness,
            status: 200
        });
        
    }
    else{
        res.status(status.success.created).json({
            message: 'Something went wrong',
            status: 400
        });
    }
    }),
    getThickness: asyncMiddleware(async (req, res) => {
        let thickness = await ThicknessModel.find({});
       if(thickness){
        res.status(status.success.created).json({
            message: 'Thickness data fetched successfully',
            data: thickness,
            status: 200
        });
        
    }
    else{
        res.status(status.success.created).json({
            message: 'Something went wrong',
            status: 400
        });
    }
    }),
    deleteThickness: asyncMiddleware(async (req, res) => {
        let thickness = await ThicknessModel.findByIdAndDelete({});
       if(thickness){
        res.status(status.success.created).json({
            message: 'Thickness data delete',
            
            status: 200
        });
        
    }
    else{
        res.status(status.success.created).json({
            message: 'Something went wrong',
            status: 400
        });
    }
    }),
    updatethickness: asyncMiddleware(async (req, res) => {
        let { id } = req.params;
        console.log(id);
         let thickness = await ThicknessModel.findByIdAndUpdate({ _id: id },{...req.body}, { new: true })
         if (thickness) {
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
router.post('/create-thickness' , thicknessActions.createThickness)
router.get('/get-thickness' , thicknessActions.getThickness)
router.delete('/delete-thickness' , thicknessActions.deleteThickness)
router.put('/update-thickness/:id',thicknessActions.updatethickness)
// User

module.exports = router;