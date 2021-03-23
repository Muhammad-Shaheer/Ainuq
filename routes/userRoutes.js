
const UserModel = require('../models/user');
const asyncMiddleware = require('../utils/asyncMiddleware');
const status = require('../utils/statusCodes');
const passwordUtils = require('../utils/passwordHash');
const jwt = require('../utils/jwt');
const express = require('express');
const CardModel = require('../models/card');
const AddressModel = require('../models/address');
const EyemeasureModel = require('../models/eyemeasure');
const SearchhistoryModel = require('../models/searchhistory');
const ViewModel = require('../models/view');
const OrderModel = require('../models/order');
const router = express.Router();


const userActions = {
    createUser: asyncMiddleware(async (req, res) => {
        // let { id } = req.params;
        let User = new UserModel({ ...req.body });
        newUser = await User.save();
        console.log(newUser)
        if (newUser) {
            // await CardModel.findByIdAndUpdate({ _id: cardId }, { User: newUser._id }, { new: true })
            // await AddressModel.findByIdAndUpdate({ _id: addressId }, { User: newUser._id }, { new: true })
            // await EyemeasureModel.findByIdAndUpdate({ _id: eyeId }, { User: newUser._id }, { new: true })
            // await SearchhistoryModel.findByIdAndUpdate({ _id: searchid }, { user: newUser._id }, { new: true })
            // await ViewModel.findByIdAndUpdate({ _id: viewId }, { user: newUser._id }, { new: true })
            // await OrderModel.findByIdAndUpdate({ _id: orderid }, { user: newUser._id }, { new: true })


            res.status(status.success.created).json({
                message: 'User data saved successfully',
                data: newUser,
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
    getUser: asyncMiddleware(async (req, res) => {
        let { id } = req.params;
        console.log(id);
        // let user = await UserModel.findById({ _id: id })
        // if (user) {
        //     res.status(status.success.created).json({
        //         message: 'Users data fetched successfully',
        //         data: user,
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

    deleteUser: asyncMiddleware(async (req, res) => {
        let { id } = req.params;
        console.log(id);
        let user = await UserModel.findByIdAndDelete({ _id: id })
        if (user) {
            res.status(status.success.created).json({
                message: 'data deleted',

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

    updateUser: asyncMiddleware(async (req, res) => {
        let { id } = req.params;
        console.log(id);
        let user = await UserModel.findByIdAndUpdate({ _id: id }, { ...req.body }, { new: true })
        if (user) {
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

// User
router.post('/signup', async (req, res) => {
    let user = await UserModel.findOne({ email: req.body.email });
    console.log(user);
    if (user) return res.status(400).send(' User already exists.');
    user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password,
        email: req.body.email
    })
    await user.save()
    res.send(user)
}),


    router.post('/login', async (req, res) => {

        

        const user = await UserModel.findOne({ email: req.body.email })

        if (!user) {
            return res.status(400).send('The User not found')
        }
        
        if  (user&&(req.body.password ===user.password)&&(req.body.email === user.email)) {
            res.status(200).send('User Authenticated')
        } else {
            res.status(400).send('User not found')


        }
        console .log(user)



    }),

    router.post('/create-user', userActions.createUser)
router.get('/get-user/:id', userActions.getUser)
router.delete('/delete-user/:id', userActions.deleteUser)
router.put('/update-user/:id', userActions.updateUser)
// router.post('/create-user/signup', userActions.createUser)
 router.post('/create-user/login', userActions.createUser)



module.exports = router;