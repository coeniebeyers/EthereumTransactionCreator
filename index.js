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
  return ethUtil.sha3(a);
}

exports.Sha3 = sha3;
exports.GetMethodSignature = getMethodSignature;
