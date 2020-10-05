var express = require("express");
var app = express();
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));

//body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(3000); 

//Multer
//multer
var multer  = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/upload')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()  + "-" + file.originalname)
    }
});  
var upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        console.log(file);
        if( file.mimetype=="image/bmp"  || 
            file.mimetype=="image/png"  ||
            file.mimetype=="image/jpg"  ||
            file.mimetype=="image/jpeg"   
        ){
            cb(null, true)
        }else{
            return cb(new Error('Only image are allowed!'))
        }
    }
}).single("file-0");


app.get("/add", function(req, res){
    res.render("sanpham/add"); 
});

app.post("/add", function(req, res){

    res.json({
        Ten:req.body.txt_Ten,
        Gia:req.body.txt_Gia,
        Hinh:req.body.TenHinh
    });
});

app.post("/uploadHinh", function(req, res){
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            res.json({"kq":0, "errMsg":"A Multer error occurred when uploading."});
        } else if (err) {
            res.json({"kq":0, "errMsg":"An unknown error occurred when uploading." + err});
        }else{
            res.json({"kq":1, "file": req.file.filename});
        }
    });
});