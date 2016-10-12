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
      break;
    }
  }
  cb(methodSignature);
}

function sha3(a){
  return ethUtil.sha3(a).toString('hex');
}

function getMethodID(contractABI, methodName, cb){
  getMethodSignature(contractABI, methodName, function(methodSignature){
    var methodID = sha3(methodSignature).substring(0, 8);
    cb(methodID);
  });
}

exports.Sha3 = sha3;
exports.GetMethodSignature = getMethodSignature;
exports.GetMethodID = getMethodID;
