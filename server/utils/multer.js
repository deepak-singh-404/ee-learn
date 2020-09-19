let multer = require("multer");

//Specify the storage engine
let videoUpload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 1024 * 1024 * 100
    },
    fileFilter: function(req, file, done) {
        if (file.mimetype === "video/mp4")  {
            done(null,true)
        }
        else {
            //prevent the upload
            var newError = new Error("File type is incorrect");
            newError.name = "MulterError";
            done(newError, false);
        }
    }
});




module.exports = videoUpload
