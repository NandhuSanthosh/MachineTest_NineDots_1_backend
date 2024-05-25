const fs = require('fs')

async function folderConfig(){
    await createFolderIfNotExists("./temp")
}


async function createFolderIfNotExists(path) {
    try {
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
        }
    } catch (err) {
      console.error('Error creating folder:', err);
    }
  }

module.exports = folderConfig
