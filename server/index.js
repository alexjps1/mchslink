const express = require('express')
const mongoose = require('mongoose')
// not found:
const ShortUrl = require('../models/short-urls')
const app = express()

mongoose.connect('mongodb://localhost/urlShortener', {
    useNewUrlParser: true, useUnifiedTopology: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.render('index')
})

app.use(express.static(__dirname + '/../site'))

app.post('/shortUrls', async (req, res) => {
   await ShortUrl.create({ full: req.body.fullUrl }) 
   res.redirect('/')
})

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
