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

/*function getMethodObj(contractObj, methodName){

  var contractObj = {};
  for(var i in contractABI){
    var methodObj = contractABI[i];
}*/

function getContractObject(contractABI, cb){
  var contractObj = {};
  for(var i in contractABI){
    var methodObj = contractABI[i];
    getMethodID(contractABI, methodObj.name, function(methodID){
      contractObj[methodObj.name] = function(){
        var argumentList = arguments;
        var data = '' + methodID;
        for(var j=0; j < argumentList.length-1; j++){
          var arg = argumentList[j];
            var hexArg = arg.toString(16);
            var paddedHexArg = ethUtil.setLengthLeft(hexArg, 32);
            console.log('paddedHexArg:', paddedHexArg);
            console.log('paddedHexArg.toString():', paddedHexArg.toString());
            data += paddedHexArg.toString();
        } 
        var rawTx = {
          nonce: '0x00',
          gasPrice: '0x01',
          gasLimit: '0x2710',
          to: '0x0000000000000000000000000000000000000000',
          value: '0x00',
          data: data,
        }
        argumentList[argumentList.length-1](rawTx);
      }
    });
  }
  cb(contractObj);
}

exports.Sha3 = sha3;
exports.GetMethodSignature = getMethodSignature;
exports.GetMethodID = getMethodID;
exports.GetContractObject = getContractObject;
