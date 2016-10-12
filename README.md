# EthereumTransactionCreator
Creating offline ethereum transactions by looking at a contract's abi

This project is part of a process.  Ultimately private keys and therefore the creation and signing of transactions should happen in a completely separate environment (for example on a Thales HSM).  This project helps to separate the concerns between the creation/signing of the transaction and the submitting/processing of that transaction on the blockchain.



[![build status](https://secure.travis-ci.org/coeniebeyers/ethereum-transaction-creator.png)](http://travis-ci.org/coeniebeyers/ethereum-transaction-creator)

## Installation

This module is installed via npm:

``` bash
$ npm install ethereum-transaction-creator
```

## Example Usage

``` js
var ethereumTransactionCreator = require('ethereum-transaction-creator');
```
