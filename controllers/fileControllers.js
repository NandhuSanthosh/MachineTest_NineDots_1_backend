const { uploadFile } = require("../configs/cloudinary");
const { UnprocessableEntity } = require("../middleware/errorMiddleware");
const fileEntityModel = require("../models/FileEntity");

const fs = require('fs')


exports.getFiles = async function(req, res, next) {
    try {
        const { id } = req.query;
        
        let data; 
        if(id) {
            data = await fileEntityModel.findById(id).populate('files')
        }
        else{
            data = await fileEntityModel.findOne({name: "root"}).populate('files')
        }

        res.send({
            curr: data
        })
        

    } catch (error) {
        console.log(error.message)
        next(error)
    }
}

exports.postFolder = async function(req, res, next) {
    try {
        const {name, parent} = req.body;
        console.log(name, parent)

        if(!name) {
            throw new UnprocessableEntity("Name is missing")
        }


        let parentDoc; 
        if(parent) {
            parentDoc = await fileEntityModel.findById(parent);
        }
        else {
            parentDoc = await fileEntityModel.findOne({name: "root"})
        }

        if(!parentDoc) {
            throw new Error("Parent doc not found")
        }

        const newFolder = await fileEntityModel.create({
            name, 
            parent: parentDoc._id, 
            isFolder: true
        })

        parentDoc.files.push(newFolder._id)
        parentDoc.save();

        res.send(newFolder)

    } catch (error) {
        next(error)
    }
}

exports.uploadFiles = async function (req, res, next) {

    try {
        const { name, currentChunkIndex, totalChunks, id } = req.query; // Get query parameters
        console.log(name, currentChunkIndex, totalChunks)
        
        const firstChunk = parseInt(currentChunkIndex) === 0; 
        const lastChunk = parseInt(currentChunkIndex) === parseInt(totalChunks) - 1;
        
        const fileExtension = name.split('.').pop(); 
        const data = req.body.toString().split(',')[1]; 

        const buffer = Buffer.from(data, 'base64');



        fs.appendFileSync('./temp/'+name, buffer);

        if(lastChunk) {

            let parentDoc; 
            console.log(id, "this is the id")
            if(id) {
                parentDoc = await fileEntityModel.findById(id);
            }
            else {
                parentDoc = await fileEntityModel.findOne({name: "root"})
            }
            
            // fs.renameSync('./temp/'+name, "./uploads/" + finalFileName);
            const result = await uploadFile('./temp/' + name);

            let finalFileName = ""
            if(id) finalFileName += id + "_";
            finalFileName += name
            console.log(finalFileName, "this is the final file name")

            const newFile = await fileEntityModel.create({
                name, 
                fileName: result.secure_url, 
                parent: parentDoc._id, 
            })

            parentDoc.files.push(newFile);
            parentDoc.save();

            console.log(parentDoc, "parent doc")

            res.json({ message: 'File uploaded', name, newFile });

        } else {
          res.status(200).json({
            message: 'Chunk uploaded',
            currentChunkIndex,
            totalChunks
          });
        }
    } catch (error) {
        next(error)
    }
}



