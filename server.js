const express = require('express')
const app = express()
const fs = require('fs')
const shortId = require('shortid')

var providedUrl
var generatedUrl

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/success', (req, res) => {
    res.render('success', { fullUrl: providedUrl, shortUrl: generatedUrl })
})

app.use(express.static('./site'))

app.post('/shortUrls', async (req, res) => {
    //await ShortUrl.create({ full: req.body.fullUrl }) 
    
    providedUrl = req.body.fullUrl
    fs.writeFile('./workspace/full-url.txt', providedUrl, function (err) {
        if (err) return console.log(err);
        console.log(providedUrl + ' > ./workspace/full-url.txt');
      });
    
    generatedUrl = shortId.generate()
    fs.writeFile('./workspace/short-url.txt', generatedUrl, function (err) {
        if (err) return console.log(err);
        console.log(generatedUrl + ' > ./workspace/short-url.txt');
      });

    setTimeout(function(){
        res.redirect('/success')
    }, 1000);

})

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));