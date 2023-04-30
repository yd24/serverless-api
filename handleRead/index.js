'use strict';

const dynamoose = require('dynamoose');

const personSchema = new dynamoose.Schema({
  name: String,
  age: Number,
});

const personModel = dynamoose.model('People', personSchema);

module.exports = async(event) => {
  let param = event.pathParameters;
  let body = '';
  if (param) {
    await personModel.query('id').eq(param['id']).exec();
  } else {
    await personModel.scan().exec();
  }
  
  const response = {
    status: 200,
    body: JSON.stringify(body),
  };
  return response;
};