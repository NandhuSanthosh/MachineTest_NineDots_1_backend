const  {uploadFiles, postFolder, getFiles} = require('../controllers/fileControllers');

const Router = require('express').Router;
const router = Router();


router.get('/files', getFiles); // to get files 
router.post('/new_folder', postFolder); // to create a new folder
router.post('/upload', uploadFiles);

module.exports = router;