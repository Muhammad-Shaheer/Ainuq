const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const cors = require('cors');
const path = require('path');

app.use(cors());
app.use(express.json({ limit: '50mb', extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
mongoose.connect('mongodb://ayaz:ayaz123@ds061954.mlab.com:61954/gym-app', { useNewUrlParser: true, useUnifiedTopology: true });
app.use('/api', routes);

app.get('/', (req, res) => {
    res.send('Working!!!')
})

app.get('/error', (req, res) => {
    throw new Error('BROKEN')
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.use(function (err, req, res, next) {
    console.error(err.stack)
    console.log(err.message)
    console.log(err)
    // res.status(500).send('Something broke!')
})

app.listen(port, () => console.log(`Example app listening at ${port}`))