'use strict';
const util = require('util');
//let fs = require("fs")
let jsonvar = '';
const exec = util.promisify(require('child_process').exec);
async function clicommands2() {
    const { stdout, stderr } = await exec('node query.js');
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
    let stdouttemp = stdout.toString();

    let tempvar = false;
    for (let i = 0; i < stdouttemp.length; i++) {
        if(stdouttemp[i]==='['){
            tempvar = true;
        }
        if(stdouttemp[i]===']'){
            jsonvar = jsonvar + stdouttemp[i];
            tempvar = false;
        }
        if(tempvar===true){
            jsonvar = jsonvar + stdouttemp[i];
        }
    }

    jsonvar = jsonvar.toString();
    jsonvar = jsonvar.trim();
    let arrfinal = [];
    let tempobj = '';
    let boolchecker = false;
    for(let i=0;i<jsonvar.length;i++){
        if(jsonvar[i]==='[' || jsonvar[i]===']'){
            continue;
        }
        if(jsonvar[i]==='{'){
            boolchecker = true;
        }
        if(jsonvar[i]==='}' && jsonvar[i-1]==='}'){
            boolchecker = false;
        }
        if(boolchecker===true){
            tempobj = tempobj+jsonvar[i];
        }
        if(boolchecker===false){
            let variablename = tempobj;
            variablename = variablename+'}';
            arrfinal.push(variablename);
            tempobj = '';
        }
    }
    console.log(arrfinal);
}
async function clicommands1() {
    const { stdout, stderr } = await exec('node invoke.js');
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
    if(stderr === '') {
        clicommands2();
    }
}


clicommands1();


