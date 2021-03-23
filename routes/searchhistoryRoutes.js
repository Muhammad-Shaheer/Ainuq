
const SearchhistoryModel = require('../models/searchhistory');
const asyncMiddleware = require('../utils/asyncMiddleware');
const status = require('../utils/statusCodes');
const passwordUtils = require('../utils/passwordHash');
const jwt = require('../utils/jwt');
const express = require('express');
const router = express.Router();


const searchhistoryActions = {
    createSearchhistory: asyncMiddleware(async (req, res) => {
        let Searchhistory = new SearchhistoryModel({ ...req.body });
        newSearchhistory = await Searchhistory.save();
        console.log(newSearchhistory)
        if (newSearchhistory) {
            res.status(status.success.created).json({
                message: 'Searchhistory data saved successfully',
                data: newSearchhistory,
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
    getSearchhistory: asyncMiddleware(async (req, res) => {
        let { id } = req.params;
        console.log(id);
         let searchhistory = await (await SearchhistoryModel.findById({ _id: id })).populate('user')
         if (searchhistory) {
             res.status(status.success.created).json({
                 message: 'Search data fetched successfully',
                 data: searchhistory,
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

    deleteSearchhistory: asyncMiddleware(async (req, res) => {
        let { id } = req.params;
        console.log(id);
         let searchhistory = await SearchhistoryModel.findByIdAndDelete({ _id: id })
        if (searchhistory) {
            res.status(status.success.created).json({
                message: 'Search data deleted',
                 
                status: 200
             });

         }
        else {
             res.status(status.success.created).json({
               message: 'Something went wrong',
           });
         }
    }),
    updateSearchhistory: asyncMiddleware(async (req, res) => {
        let { id } = req.params;
        console.log(id);
         let searchhistory = await SearchhistoryModel.findByIdAndUpdate({ _id: id },{...req.body}, { new: true })
         if (searchhistory) {
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
router.post('/create-searchhistory', searchhistoryActions.createSearchhistory)
router.get('/get-searchhistory/:id', searchhistoryActions.getSearchhistory)
router.delete('/delete-searchhistory/:id', searchhistoryActions.deleteSearchhistory)
router.put('/update-searchhistory/:id',searchhistoryActions.updateSearchhistory)
// User

module.exports = router;