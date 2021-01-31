import fs from 'fs'
import { fdir } from "fdir";

const crawler = new fdir()
  .withBasePath()
  .withDirs()
  .withMaxDepth(5)
  .exclude((dirName, dirPath) => {
    if( dirName.startsWith(".") ||
        dirPath.match(/node_modules/g) ||
        dirName.match(/.DS_Store/g)
    ) return true;
})

   
const files = crawler.crawl("./").sync();
const filteredFiles = files.filter(file => {
    if(file.match(/.DS_Store/g)) return false;
    if(file.match(/package/g)) return false;
    if(file.match(/index.mjs/g)) return false;
    return true
    
})


for (const oldFile of filteredFiles){
    const newFile = oldFile.replace(/ /g,'_')
    if(oldFile != newFile) {
        try{
            fs.renameSync(oldFile,newFile)
        }
        catch(err){
            console.log('error',err)
        }
    }
}
