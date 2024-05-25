const {v2} = require("cloudinary")

function cloudinaryConfig() {
    // Configuration
    v2.config({ 
        cloud_name: "dh1e66m8m", 
        api_key: "447619434375244", 
        api_secret: "RdO-7Y-icKhU5_zvfj7Agsvvjpc"
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