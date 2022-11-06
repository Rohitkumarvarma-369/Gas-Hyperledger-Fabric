var http = require('http');

var hostname  = '127.0.0.1';
var port      = 4000;

const util = require('util');
//let fs = require("fs")
let jsonvar = '';
let arrfinal = [];
const exec = util.promisify(require('child_process').exec);
exec('node query.js', {
    cwd: '/home/immortal/Desktop/gas-hyperledger-fabric/fabric/gashl/javascript/'
  }, function(error, stdout, stderr) {
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
  });

var app = http.createServer(function(req, res) {
    res.setHeader('Content-Type', 'application/json');

    res.end(
      JSON.stringify(arrfinal)
    );
  });

app.listen(port, hostname);