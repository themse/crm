const multer = require('multer');
const moment = require('moment');

const storage = multer.diskStorage({
    destination(request, file, callback) {
        callback(null, 'public/uploads/')
    },

    filename(request, file, callback) {
        const date = moment().format('DD-MM-YYY-HHmmss_SSS');
        callback(null, `${date}-${file.originalname}`);
    },
});

const fileFilter = (request, file, callback) => {
    if (file.mimeType === 'image/png' || file.mimeType === 'image/jpeg') {
        return callback(null, true);
    }
    return callback(null, false);
};

const limits = {
    fileSize: 1024 * 1024 * 5,
};

module.exports = multer({
    storage,
    fileFilter,
    limits,
});
