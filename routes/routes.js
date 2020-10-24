const UserModel = require('../models/user');
const AdminModel = require('../models/admin');
const CategoryModel = require('../models/category');
const asyncMiddleware = require('../utils/asyncMiddleware');
const status = require('../utils/statusCodes');
const passwordUtils = require('../utils/passwordHash');
const jwt = require('../utils/jwt');
const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Ayaz Config

cloudinary.config({
    cloud_name: 'dtedyg5pp',
    api_key: '297886119647355',
    api_secret: '3i6nm9GTze6tikKTwK2eX3L91_I'
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'general',
        format: async (req, file) => 'jpg', // supports promises as well
        public_id: (req, file) => Date.now().toString(),
    },
});

const parser = multer({
    storage: storage
});

const userActions = {
    register: asyncMiddleware(async (req, res) => {
        let user = await UserModel.findOne({ email: req.body.email });
        if (user) {
            res.status(status.success.created).json({
                message: 'Email Already Exists',
                status: 400
            });
        } else {

            // Save new user to db
            let hashedPassword = await passwordUtils.hashPassword(req.body.password);
            let newUser = new UserModel({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            });
            let savedUser = await newUser.save();

            // Remove Password From Object
            let addedUser = savedUser.toObject();
            delete addedUser.password;
            res.status(status.success.created).json({
                message: 'User Created Successfully',
                data: addedUser,
                token: 'Bearer ' + await jwt.signJwt({ id: savedUser.id }),
                status: 200
            });
        }
    }),
    login: asyncMiddleware(async (req, res) => {
        let user = await UserModel.findOne({ email: req.body.email }).select('+password');
        if (user) {
            let verified = await passwordUtils.comparePassword(req.body.password, user.password);
            if (verified) {
                let loggedUser = user.toObject();
                delete loggedUser.password;
                res.status(status.success.accepted).json({
                    message: 'Logged In Successfully',
                    data: loggedUser,
                    token: 'Bearer ' + await jwt.signJwt({ id: user.id }),
                    status: 200

                });
            } else {
                res.status(status.success.created).json({
                    message: 'Wrong Password',
                    status: 400
                });
            }
        } else {
            res.status(status.success.created).json({
                message: 'User Not Found',
                status: 404
            });
        }
    }),
    createCategory: asyncMiddleware(async (req, res) => {
        let category = new CategoryModel({...req.body});
        
        newCategory =await category.save();
       if(newCategory){
        await AdminModel.findOneAndUpdate({_id:req.params.id},{category:newCategory._id})   
        res.status(status.success.created).json({
            message: 'Category data saved successfully',
            data: newCategory,
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
    
    getAdminData: asyncMiddleware(async (req, res) => {
        let admin = await AdminModel.find({register_as:'admin'}).populate('category');

        res.status(status.success.created).json({
            message: 'Admin data',
            data: admin,
            status: 200
        });
    }),


};

// User
router.post('/register', userActions.register)
router.post('/login', userActions.login)
router.get('/admins', userActions.getAdminData)
router.get('/category/:id', userActions.createCategory)

module.exports = router;