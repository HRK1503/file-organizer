#!/usr/bin/env node 
let inputArr=process.argv.slice(2);
let fs=require("fs");
let path=require("path")
//console.log(inputArr);
let helpObj=require("./commands/help");
let treeObj=require("./commands/tree");
let organizeObj=require("./commands/organize");
let command=inputArr[0];

let types={
    media:["mp4","mkv","wav"],
    archives:["zip","7z","rar","tar","gz","ar","iso","xz"],
    documents:["docx","doc","pdf","xlsx","xls","odt","odp","odg","odf","txt","ps",'tex'],
    app:["exe","dmg","pkg","deb"],
    image:["jpg","jpeg","png","raw","eps","gif"]
}
switch(command){
    case "tree":
        treeObj.treeKey(inputArr[1]);
        break;
    case "organize":
        organizeObj.organizeKey(inputArr[1]);
        break;
    case "help":
        helpObj.helpKey();
        break;
    default:
        console.log("Please 🙏Input right command");
        break;  
}
