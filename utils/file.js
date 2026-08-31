const fs = require('fs');
const multer = require('multer');

exports.imageFileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
});

exports.fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads/files');
    },
    filename: (req, file, cb) => {
        cb(null, req.user._id + '-' + (file.originalname).toLowerCase());
    }
});

exports.imageFileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

exports.deleteFile = (filePath) => {
    fs.unlink(filePath, (err) => {
        console.log(err);
    });
}