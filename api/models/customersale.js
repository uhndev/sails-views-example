/**
* customersale.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	id: {
      type: 'integer'
    },
    customerName: {
      type: 'string'
    },
    productName: {
      type: 'string'
    },
    price: {
      type: 'string'
    },
    saleId: {
      type: 'integer',
    },
    saleNumber: {
      type: 'integer'
    },
    createdAt: {
      type: 'datetime'
    },
    updatedAt: {
      type: 'datetime'
    }
  }
};

