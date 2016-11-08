var ethUtil = require('ethereumjs-util');

function getMethodSignature(contractABI, methodName, cb){
  var methodSignature = '';
  for(var i in contractABI){
    var methodObj = contractABI[i];
    if(methodObj.name == methodName){
      methodSignature += methodObj.name +'(';
      for(var j in methodObj.inputs){
        var input = methodObj.inputs[j];
        methodSignature += input.type;
        if(j < methodObj.inputs.length-1){
          methodSignature += ',';
        } else {
          methodSignature += ')';
        }
      }
      if(cb == null){
        return methodSignature;
      } else {
        break;
      }
    }
  }
  if(cb){
    cb(methodSignature);
  }
}

function sha3(a){
  return ethUtil.sha3(a).toString('hex');
}

function getMethodID(contractABI, methodName, cb){
  var methodSignature = getMethodSignature(contractABI, methodName);
  var methodID = sha3(methodSignature).substring(0, 8);
  if(cb == null){
    return methodID;
  } else {
    cb(methodID);
  }
}

function convertInputsToPaddedHex(argumentList, methodInputs){
  var data = '';
  for(var i=0; i<argumentList.length-1; i++){
    var arg = argumentList[i];
    var input = methodInputs[i];
    if(input.type == 'uint32' || input.type == 'uint256'){
      var paddedhexArg = pad(arg.toString(16), 64);
      data += paddedhexArg; 
    if(input.type == 'int32' || input.type == 'int256'){
      var paddedhexArg = pad(arg.toString(16), 64);
      data += paddedhexArg; 
    } else if(input.type == 'bool'){
      if(arg == true){
        data += pad('1', 64);
      } else {
        data += pad('0', 64);
      } 
    } else if(input.type == 'address'){
        data += pad(arg.substring(2), 64);
    } else {
      console.log('ERROR in convertInputsToPaddedHex, unsupported type:', input.type);
    }
  }
  return data;
}

function addFunction(contractInstance, contractABI, address, methodObj){
  contractInstance[methodObj.name] = function(){
    var methodID = getMethodID(contractABI, methodObj.name);  
    var data = '0x'+methodID + convertInputsToPaddedHex(arguments, methodObj.inputs);
    var rawTx = {
      nonce: '0x00',
      gasPrice: '0x'+padToEven(Number(1).toString(16)),
      gasLimit: '0x'+padToEven(Number(100000).toString(16)),     
      to: address,
      value: '0x00',
      data: data
    };
    arguments[arguments.length-1](rawTx);
  }
}

function getContractInstance(contractABI, address, cb){
  var contractInstance = {};
  for(var i in contractABI){
    var methodObj = contractABI[i];
    addFunction(contractInstance, contractABI, address, methodObj);
  }  
  cb(contractInstance);
}

function padToEven(n, z){
  return pad(n, n.length + n.length % 2, z);
}

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

exports.Sha3 = sha3;
exports.GetMethodSignature = getMethodSignature;
exports.GetMethodID = getMethodID;
exports.GetContractInstance = getContractInstance;
