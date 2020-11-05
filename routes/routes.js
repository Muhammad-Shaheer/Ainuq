
const NewsModel = require('../models/news');
const asyncMiddleware = require('../utils/asyncMiddleware');
const status = require('../utils/statusCodes');
const passwordUtils = require('../utils/passwordHash');
const jwt = require('../utils/jwt');
const express = require('express');
const router = express.Router();


const newsActions = {
    createNews: asyncMiddleware(async (req, res) => {
        let news = new NewsModel({...req.body});
        newNews =await news.save();
        console.log(newNews)
       if(newNews){
        res.status(status.success.created).json({
            message: 'News data saved successfully',
            data: newNews,
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
    getNews: asyncMiddleware(async (req, res) => {
        let news = await NewsModel.find({});
       if(news){
        res.status(status.success.created).json({
            message: 'News data fetched successfully',
            data: news,
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

    
    

};
router.post('/create-news' , newsActions.createNews)
router.get('/get-news' , newsActions.getNews)
// User

module.exports = router;