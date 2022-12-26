function organizeFn(dirPath){
    let despath;
    //console.log("organize command implemented for ",dirPath);
    //1. input-> director path given
    if(dirPath==undefined){
        despath=process.cwd();
        return;
    }
    else{
        if(fs.existsSync(dirPath)){
            //2. create-> organized_files->directory
            despath=path.join(dirPath,"organized_files");
            if(fs.existsSync(despath)==false){
                fs.mkdirSync(despath); 
            }
            
        }
        else{
            console.log("Kindly enter the correct path");
            return;
        }
    }
    organizeHelper(dirPath,despath );
    
}

function organizeHelper(src,dest){
    //3. check all files for their categories
    let childNames=fs.readdirSync(src);
    //console.log(childNames);
    for( let i=0;i<childNames.length;i++){
        let childAddress=path.join(src,childNames[i]);
        let isFile=fs.lstatSync(childAddress).isFile();
        if(isFile){
            let category=getCategory(childNames[i]);
            //console.log(childNames[i],"==>",category);
            //4. copy/cut files to new directory
            sendFiles(childAddress,dest,category);
        }
    }
}

function sendFiles(srcfilepath,dest,category){
    let categorypath=path.join(dest,category);
    if(fs.existsSync(categorypath)==false){
        fs.mkdirSync(categorypath);
    }
    let fileName=path.basename(srcfilepath);
    let destFilePath=path.join(categorypath,fileName);
    fs.copyFileSync(srcfilepath,destFilePath); 
    console.log(fileName,"copied to ==>",category);
    //next line is if you want to cut , it deltes file from original src
    //fs.unlinkSync(srcfilepath);
}

function getCategory(name){
    let ext=path.extname(name);
    ext=ext.slice(1);
    for(let type in types){
        let cTypeArray=types[type];
        for(let i=0;i<cTypeArray.length;i++){
            if(ext==cTypeArray[i]){
                return type;
            }
        }
    }
    return "other";
}
module.exports={
    organizeKey:organizeFn
}