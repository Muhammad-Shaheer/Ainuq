
const CardModel = require('../models/card');
const asyncMiddleware = require('../utils/asyncMiddleware');
const status = require('../utils/statusCodes');
const passwordUtils = require('../utils/passwordHash');
const jwt = require('../utils/jwt');
const express = require('express');
const router = express.Router();


const cardActions = {
    createCard: asyncMiddleware(async (req, res) => {

        let { userid } = req.body;
        console.log(userid);

        let Card = new CardModel({ ...req.body });
        newCard = await Card.save();
        console.log(newCard)
        if (newCard) {

            await CardModel.findByIdAndUpdate({ _id: newCard._id }, { $push: { user: userid } }, { new: true });

            res.status(status.success.created).json({
                message: 'Card data saved successfully',
                data: newCard,
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
    getCard: asyncMiddleware(async (req, res) => {
        let { id } = req.params;
        console.log(id);
         let card = await (await CardModel.findById({ _id: id })).populate('user')
         if (card) {
             res.status(status.success.created).json({
                 message: 'cards data fetched successfully',
              data: card,
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
    deleteCard: asyncMiddleware(async (req, res) => {
        let { id } = req.params;
        console.log(id);
         let card = await CardModel.findByIdAndDelete({ _id: id })
         if (card) {
             res.status(status.success.created).json({
                 message: 'card data Deleted',
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

    updateCard: asyncMiddleware(async (req, res) => {
        let { id } = req.params;
        console.log(id);
         let card = await CardModel.findByIdAndUpdate({ _id: id },{...req.body}, { new: true })
         if (card) {
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
router.post('/create-card', cardActions.createCard)
router.get('/get-card/:id', cardActions.getCard)
router.delete('/delete-card/:id', cardActions.deleteCard)
router.put('/update-card/:id',cardActions.updateCard)
// User

module.exports = router;