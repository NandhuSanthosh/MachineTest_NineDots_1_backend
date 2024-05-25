const {v2} = require("cloudinary")

function cloudinaryConfig() {
    // Configuration
    v2.config({ 
        cloud_name: process.env.CLOUDINARY_NAME, 
        api_key: process.env.CLOUDINARY_API, 
        api_secret: process.env.CLOUDINARY_SECRET 
    });
};

async function uploadFile(filePath) {
    try {
      const result = await v2.uploader.upload(filePath, {
        resource_type: "auto", 
      });
      return result;
    } catch (error) {
      throw error
    }
  }



module.exports = {
    cloudinaryConfig, 
    uploadFile
}