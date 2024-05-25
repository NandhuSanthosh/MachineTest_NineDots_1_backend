const mongoose = require('mongoose')

const fileEntitySchema = new mongoose.Schema({
    isFolder: {
        type: Boolean, 
        default: false
    }, 
    name: {
        type: String, 
        required: true
    }, 
    fileName: {
        type: String
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'FileEntity'
    },
    files: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'FileEntity'
    }], 
    isDeleted: {
        type: Boolean, 
        default: false
    }
})

const fileEntityModel = mongoose.model('FileEntity', fileEntitySchema)
module.exports = fileEntityModel
        