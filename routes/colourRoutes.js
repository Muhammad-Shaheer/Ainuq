
const ColourModel = require('../models/colour');
const asyncMiddleware = require('../utils/asyncMiddleware');
const status = require('../utils/statusCodes');
const passwordUtils = require('../utils/passwordHash');
const jwt = require('../utils/jwt');
const express = require('express');
const router = express.Router();


const colourActions = {
    createColour: asyncMiddleware(async (req, res) => {
        let { productid } = req.body;
        console.log(productid);



        let Colour = new ColourModel({ ...req.body });
        newColour = await Colour.save();
        console.log(newColour)
        if (newColour) {

            await ColourModel.findByIdAndUpdate({ _id: newColour._id }, { $push: { product: productid } }, { new: true });

            res.status(status.success.created).json({
                message: 'Colour data saved successfully',
                data: newColour,
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
    getColour: asyncMiddleware(async (req, res) => {
        let { id } = req.params;
        console.log(id);
        let colour = await ColourModel.findById({ _id: id }).populate('product')
        if (colour) {
            res.status(status.success.created).json({
                message: 'Colour data fetched successfully',
                data: colour,
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
    DeleteColour: asyncMiddleware(async (req, res) => {
        let { id } = req.params;
        console.log(id);
         let colour = await ColourModel.findByIdAndDelete({ _id: id })
         if (colour) {
             res.status(status.success.created).json({
                 message: 'Colour data Deleted',
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

    updateColour: asyncMiddleware(async (req, res) => {
        let { id } = req.params;
        console.log(id);
         let colour = await ColourModel.findByIdAndUpdate({ _id: id },{...req.body}, { new: true })
         if (colour) {
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
router.post('/create-colour', colourActions.createColour)
router.get('/get-colour/:id', colourActions.getColour)
router.delete('/delete-colour/:id',colourActions.DeleteColour)
router.put('/update-colour/:id',colourActions.updateColour)
// User


module.exports = router;