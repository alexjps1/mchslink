const express = require('express')
const app = express()
const fs = require('fs')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.render('index')
})

app.use(express.static('./site'))

app.post('/shortUrls', async (req, res) => {
    fs.writeFile('./workspace/full-url.txt', req.body.fullUrl, function (err) {
        if (err) return console.log(err);
        console.log(req.body.fullUrl + ' > ./workspace/full-url.txt');
      });
   //await ShortUrl.create({ full: req.body.fullUrl }) 
   res.redirect('/')
})

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));