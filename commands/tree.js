function treeFn(dirPath){
    if(dirPath==undefined){
        treeHelper(process.cwd(),"");
        return;
    }
    else{
        if(fs.existsSync(dirPath)){
            treeHelper(dirPath,"");
        }
        else{
            console.log("Kindly enter the correct path");
            return;
        }
    } 
}

function treeHelper(dirPath,indent){
    //check whether file or folder
    let isFile=fs.lstatSync(dirPath).isFile();
    if(isFile==true){
        let fileName=path.basename(dirPath);
        console.log(indent+"-->"+fileName);
    }
    else{
        let dirName=path.basename(dirPath);
        console.log(indent+"==>"+dirName);
        let childrens=fs.readdirSync(dirPath);
        for(let i=0;i<childrens.length;i++){
            let childpath=path.join(dirPath,childrens[i])
            treeHelper(childpath,indent+"\t");
        }
    }
}
module.exports={
    treeKey:treeFn
}