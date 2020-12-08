let express = require('express');
let router = express.Router();
router.use(express.static('./public')); // 把 public 中的檔案全部丟上來
// middleware that is specific to this router

router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
// define the home page route

router.get('/', function(req, res) {
  res.send(
    'Logos\' home page'+'<br>'+
    '<a href="/user/Logos/about"> about </a>'+'<br>'+
    '<a href="/user/Logos/classA.html"> classA </a>'
    );
});

// define the about route
router.get('/about', function(req, res) {
  res.send(
    '<h1> About Logos </h1>'+
    '\n <img src="https://miro.medium.com/max/7394/1*WsbwYfmWPb6OAXUtE2hcZA.jpeg" height="60%">'
    );
});

module.exports = router;
