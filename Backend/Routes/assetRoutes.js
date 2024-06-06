const express = require('express');
const router = express.Router();
const assetControllers = require('../Controllers/assetControllers');
const JwtProtected = require('../Middleware/JwtProtection');
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `./uploads`)
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname)
    }
})

const upload = multer({ storage: storage })

router.post('/uploadAsset', JwtProtected, upload.single('file'), assetControllers.createAsset);
router.post('/getAsset', assetControllers.getAsset);
router.post('/getAssetsByCategory', assetControllers.getAssetsByCategory);
router.post('/addReview', JwtProtected, assetControllers.addReview);
// router.post('/increaseViews', JwtProtected, assetControllers.increaseViews);
router.post('/sortAssets', JwtProtected, assetControllers.sortAssets);
router.post('/getOriginalAsset', JwtProtected, assetControllers.getOriginalAsset);
router.post('/getAssetById', JwtProtected, assetControllers.getAssetById);
// router.get('/getFilters', JwtProtected, assetControllers.getFilters);

module.exports = router