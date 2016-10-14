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

function addFunction(contractInstance, contractABI, address, methodObj){
  contractInstance[methodObj.name] = function(){
    var methodID = getMethodID(contractABI, methodObj.name);  
    var data = '0x'+methodID;
    for(var i=0; i<arguments.length-1; i++){
      var arg = arguments[i];
      var input = methodObj.inputs[i];
      if(input.type == 'uint32'){
        var paddedhexArg = pad(arg.toString(16), 64);
        data += paddedhexArg; 
      } else if(input.type == 'bool'){
        if(arg == true){
          data += pad('1', 64);
        } else {
          data += pad('0', 64);
        }
      }
    }
    var rawTx = {
      nonce: '0x0',
      gasPrice: '0x0',
      gasLimit: '0x0',     
      to: address,
      value: '0x0',
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

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

exports.Sha3 = sha3;
exports.GetMethodSignature = getMethodSignature;
exports.GetMethodID = getMethodID;
exports.GetContractInstance = getContractInstance;
