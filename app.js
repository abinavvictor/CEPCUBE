var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
//var CASAuthentication = require('cas-authentication');
//var ConnectCas = require('connect-cas2');
//var MemoryStore = require('session-memory-store')(session);

var appRoutes = require('./routes/app');

var app = express();





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//app.use(casClient.core());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect to bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS for jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); //redirect to css bootstrap

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

//app.get('/logout', casClient.logout());

// or do some logic yourself
app.get('/logout', function(req, res, next) {
    // Do whatever you like here, then call the logout middleware

});





app.use('/', appRoutes);

// catch 404 and forward to error handlernode
/*app.use(function (req, res, next) {
   // return res.render('dashboard');
});*/

app.get('/views/dashboard.hbs' , function(req,res){
    console.log('hjgfshdvdyh' + JSON.stringify(req.params))
    //res.sendFile(__dirname + 'dashboard.hbs');
 res.render('dashboard');
});

app.get('/views/upgrade.hbs' , function(req,res){
    console.log("its a beauty");
    //res.sendFile(__dirname + 'upgrade.hbs');
    res.render('upgrade');
});
app.get('/views/typography.hbs' , function(req,res){

    // res.sendFile(__dirname + 'typography.hbs');
    res.render('typography');
});
app.get('/views/icons.hbs' , function(req,res){

    // res.sendFile(__dirname + 'typography.hbs');
    res.render('icons');
});

app.get('/views/list.hbs' , function(req,res){

    // res.sendFile(__dirname + 'typography.hbs');
    res.render('list');
});

app.get('/views/maps.hbs' , function(req,res){

    // res.sendFile(__dirname + 'typography.hbs');
    res.render('maps');
});

app.get('/views/template.hbs' , function(req,res){

    // res.sendFile(__dirname + 'typography.hbs');
    res.render('template');
});

app.get('/views/user.hbs' , function(req,res){

    // res.sendFile(__dirname + 'typography.hbs');
    res.render('user');
});

app.get('/views/notifications.hbs' , function(req,res){

    // res.sendFile(__dirname + 'typography.hbs');
    res.render('notifications');
});


app.listen('3000', function(){
    console.log('running on 3000...');

});

module.exports = app;



