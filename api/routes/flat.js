const express = require('express');
//for verbs and endpoints
const router = express.Router();

// //for multer
// const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads');  //pass potential errors and dirname
//     },
//     filename: function (req, file, cb) {
//         cb(null, new Date().toISOString() + file.originalname);
//     }
// });

// //mime filter
// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//         //accept a file
//         cb(null, true);
//     } else {
//         //reject a file
//         cb(null, false);
//     }
// };

// //or pass {dest: 'uploads/'}
// const upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: 1024 * 1024 * 10
//     },
//     fileFilter: fileFilter
// });

// //for jwt token verification
// const checkAuth = require('../middleware/check-auth');

//for controller
const FlatsController = require('../controller/flats');

router.get('/', FlatsController.products_get_all);

router.post('/', FlatsController.products_post);

router.get('/:id', FlatsController.products_get_single);

// router.patch('/:id', FlatsController.products_patch);

router.delete('/:id', FlatsController.products_delete);

module.exports = router;