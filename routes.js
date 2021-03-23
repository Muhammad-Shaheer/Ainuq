const express = require('express')
const router = express.Router();

const glassRoutes = require('./routes/glassRoutes');
const thicknessRoutes = require('./routes/thicknessRoutes');
const cardRoutes = require('./routes/cardRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');
const delieveryRoutes = require('./routes/delieveryRoutes');
const eyemeasureRoutes = require('./routes/eyemeasureRoute');
const frameRoutes = require('./routes/frameRoutes');
const glasssmaterialRoutes = require('./routes/glassmaterialRoutes');
const materialRoutes = require('./routes/glassmaterialRoutes');
const orderRoutes = require('./routes/orderRoutes');
const orderstatusRoutes = require('./routes/orderstatusRoutes');
const searchhistoryRoutes = require('./routes/orderstatusRoutes');
const sexRoutes = require('./routes/sexRoutes');
const shadesRoute = require('./routes/shadesRoute');
const userRoutes = require('./routes/userRoutes');
const weightRoutes = require('./routes/weightRoutes');
const addressRoutes = require('./routes/addressRoutes');
const viewRoutes = require('./routes/viewRoutes');
const colourRoutes = require('./routes/colourRoutes');


router.use('/colour',colourRoutes);
router.use('/view',viewRoutes);
router.use('/glass', glassRoutes);
router.use('/thickness', thicknessRoutes);
router.use('/card',cardRoutes);
router.use('/categories',categoriesRoutes);
router.use('/delievery',delieveryRoutes);
router.use('/eyemeasure',eyemeasureRoutes);
router.use('/frame',frameRoutes);
router.use('/glassmaterial',glasssmaterialRoutes);
router.use('/material',materialRoutes);
router.use('/order',orderRoutes);
router.use('/orderstatus',orderstatusRoutes);
router.use('/searchhistory',searchhistoryRoutes);
router.use('/sex',sexRoutes);
router.use('/shades',shadesRoute);
router.use('/user',userRoutes);
router.use('/weight',weightRoutes);
router.use('/address',addressRoutes);


module.exports=router