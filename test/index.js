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
  it('can get the method id from a contract ABI', function(done) {
    index.GetMethodID(tokenContractABI, 'DVPTransfer', function(methodID){ 
      expect(methodID).to.be('142eb4d7');
      done();
    });
  });
  it('can construct a contract object with members for getting raw transactions', function(done) {
    index.GetContractInstance(tokenContractABI, '0xabc', function(contractInstance){
      contractInstance.baz(69, true, function(rawTx){
        expect(rawTx).to.not.be(null);
        expect(rawTx.data).to.be('0xcdcd77c000000000000000000000000000000000000000000000000000000000000000450000000000000000000000000000000000000000000000000000000000000001');
        done();
      });
    });
  });
  it('can construct a contract object with type int256', function(done) {
    index.GetContractInstance(tokenContractABI, '0xabc', function(contractInstance){
      contractInstance.testingInt256(69, function(rawTx){
        expect(rawTx).to.not.be(null);
        expect(rawTx.data).to.be('0xc4cf56320000000000000000000000000000000000000000000000000000000000000045');
        done();
      });
    });
  });
});
