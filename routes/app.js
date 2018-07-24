var express = require('express');
var router = express.Router();
var xlsxtojson = require("xlsx-to-json-lc");
var xlstojson = require("xls-to-json-lc");
var multer = require('multer');
var bodyParser = require('body-parser');
var mongo = require('./mongo');
var g = {};


mongo.connect(function(_db){
    db = _db;
});

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
});

var upload = multer({ //multer settings
    storage: storage,
    fileFilter : function(req, file, callback) { //file filter
        if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
            return callback(new Error('Wrong extension type'));
        }
        callback(null, true);
    }
}).single('file');


router.post('/upload', function(req, res) {
    var exceltojson;
    upload(req,res,function(err){
        if(err){
           res.json({error_code:1,err_desc:err});
            return;
        }

        if(!req.file){

            res.json({error_code: 1,err_desc:"No file passed"});
            return;
        }
        if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1]==='xlsx'){
            exceltojson = xlsxtojson;
        }else{
            exceltojson =xlstojson;
        }
        try{
            exceltojson({
                input: req.file.path,
                output: null,
                lowerCaseHeaders: true
            },function(err,result) {
                if (err) {
                    return res.json({error_code: 1, err_desc: err, data: null});
                }

                var products = db.collection('users');

                for (let i = 0; i < result.length; i++) {
                    var current = result[i];

                    products.insertOne(current, function (err) {
                        if (err)
                            console.log(err);

                        res.json({error_code: 0, err_desc: null, data: result});


                    });
                }

            }
            )


        }catch (e) {
            res.json({error_code: 1, err_desc: "Corrupted excel file"});
        }
    });
});

router.get('/tableData', function(req, res) {

    var programType = req.query.programType;
    var query = {};
    if(programType) {
        query.cep_program = programType;

    }

    var products = db.collection('users');
    products.find(query).toArray(function(err, data){
        res.status(200).json(data);
        console.log(data);

    });
});


router.get('/gridData', function(req, res) {
    var products = db.collection('users');
products.find({},function(err, data){
    if(err) res.json(err);
    else  res.render('node', {products:data} )
})

});








module.exports = router;
