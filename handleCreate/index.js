'use strict';

const dynamoose = require('dynamoose');

const personSchema = new dynamoose.Schema({
  name: String,
  age: Number,
});

const personModel = dynamoose.model('People', personSchema);

module.exports = async(event) => {
  let body = JSON.parse(event.body);
  
  const response = {
    status: 200,
    body: '',
  };

  try {
    let resp = await personModel.create(body);
    response.body = JSON.stringify(resp);
  } catch (e) {
    console.log('Error creating person', e);
    response.status = 500;
    response.body = 'Error creating person';
  }
  return response;
};