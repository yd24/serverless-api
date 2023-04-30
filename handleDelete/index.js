'use strict';

const dynamoose = require('dynamoose');

const personSchema = new dynamoose.Schema({
  name: String,
  age: Number,
});

const personModel = dynamoose.model('People', personSchema);

module.exports = async(event) => {
  let params = event.pathParameters;
  let body = '';
  let status = 200;

  if (params) {
    let resp = await personModel.delete({id: params['id']});
    body = JSON.stringify(resp);
  } else {
    console.log('Need valid id.');
    body = 'Needs valid id';
    status = 500;
  }
  
  const response = {
    status: status,
    body: JSON.stringify(body),
  };
  return response;
};