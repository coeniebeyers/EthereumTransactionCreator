var expect = require('expect.js');
var index = require('../index.js');
var tokenContractABI = require('./fixtures/tokenContractABI.js');

describe('ethereum-transaction-creator', function() {
  it('can get the method signature from a contract ABI', function(done) {
    index.GetMethodSignature(tokenContractABI, 'DVPTransfer', function(methodSignature){ 
      expect(methodSignature).to.be('DVPTransfer(address,uint256)');
      done();
    });
  });
  it('should create a sha3 of a string', function(done) {
    var result = index.Sha3('DVPTransfer(address,uint256)');
    expect(result.toString('hex')).to
      .be('142eb4d786c73c5adaa21526280b6ffe9788604fefa1e2d6ef318db1dc181605');
    done();
  });
});
