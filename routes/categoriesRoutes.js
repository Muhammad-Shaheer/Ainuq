
const CategoriesModel = require('../models/categories');
const asyncMiddleware = require('../utils/asyncMiddleware');
const status = require('../utils/statusCodes');
const passwordUtils = require('../utils/passwordHash');
const jwt = require('../utils/jwt');
const express = require('express');
const FrameModel = require('../models/frame');
const router = express.Router();


const categoriesActions = {
    createCategories: asyncMiddleware(async (req, res) => {
        let { id } = req.params;
        let Categories = new CategoriesModel({ ...req.body });
        newCategories = await Categories.save();
        console.log(newCategories)
        if (newCategories) {
            await FrameModel.findByIdAndUpdate({ _id: id }, { category: newCategories._id }, { new: true })

            res.status(status.success.created).json({
                message: 'Categories data saved successfully',
                data: newCategories,
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
    getCategories: asyncMiddleware(async (req, res) => {
        let { id } = req.params;
        console.log(id);
        // let categories = await CategoriesModel.findById({ _id: id })
        // if (categories) {
        //     res.status(status.success.created).json({
        //         message: 'categories data fetched successfully',
        //         data: categories,
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

    deleteCategories: asyncMiddleware(async (req, res) => {
        let { id } = req.params;
        console.log(id);
         let categories = await CategoriesModel.findByIdAndDelete({ _id: id })
         if (categories) {
        res.status(status.success.created).json({
                 message: 'categories data delete successfully',
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
    updateCategories: asyncMiddleware(async (req, res) => {
        let { id } = req.params;
        console.log(id);
         let categories = await CategoriesModel.findByIdAndUpdate({ _id: id },{...req.body}, { new: true })
         if (categories) {
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
router.post('/create-categories', categoriesActions.createCategories)
router.get('/get-categories/:id', categoriesActions.getCategories)
router.delete('/delete-categories/:id', categoriesActions.deleteCategories)
router.put('/update-categories/:id',categoriesActions.updateCategories)
// User

module.exports = router;