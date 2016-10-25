var expect = require('expect.js');
var index = require('../index.js');
var tokenContractABI = require('./fixtures/tokenContractABI.js');

describe('ethereum-transaction-creator', function() {
  it('should create a sha3 of a string', function(done) {
    var result = index.Sha3('DVPTransfer(address,uint256)');
    expect(result).to.be('142eb4d786c73c5adaa21526280b6ffe9788604fefa1e2d6ef318db1dc181605');
    done();
  });
  it('can get the method signature from a contract ABI', function(done) {
    index.GetMethodSignature(tokenContractABI, 'DVPTransfer', function(methodSignature){ 
      expect(methodSignature).to.be('DVPTransfer(address,uint256)');
      done();
    });
  });
  it('can get the method id from a contract ABI', function(done) {
    index.GetMethodID(tokenContractABI, 'DVPTransfer', function(methodID){ 
      expect(methodID).to.be('142eb4d7');
      done();
    });
  });
  it('can produce an object will all members from a contract ABI', function(done) {
    index.GetContractObject(tokenContractABI, function(contractObj){ 
      expect(contractObj).to.not.be(null);
      expect(contractObj.DVPTransfer).to.not.be(undefined);
      contractObj.baz(69, function(res){
        console.log('res:', res);
        done();
      });
    });
  });
});
