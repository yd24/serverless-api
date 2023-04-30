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

  let params = event.pathParameters;
  if (params) {
    let resp = await personModel.update({id: params['id']}, {name: body.name, age: body.age});
    response.body = JSON.stringify(resp);
  } else {
    console.log('Need valid person ID', e);
    response.status = 500;
    response.body = 'Error updating person';
  }
  return response;
};