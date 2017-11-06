'use strict';

const bluebird    	= require('bluebird');
// const config   		= require('../../config/config');
const moment   		= require('moment');
const fs       		= require('fs');
const http     		= require('http');
const Definition 	= require('../models/definition');

module.exports = {
	getAllDefinitions : getAllDefinitions,
	addDefinitions : addDefinitions
}


function getAllDefinitions(callback){
	Definition.find({})
	.then(definitions => {
		return callback({error: false, data: definitions})
	})
	.catch(err => {
		console.log(err)
		return callback({error: true, err: err})
	})
}

function addDefinitions(details, callback){

	let def = details;

	// Expecting details to be an array - bluebird.map allows us to run the function asynchronously 
	bluebird.map(def, el =>{
		let query = {
			activity 	: el.activity,
			intensity	: el.intensity
		}

		let newDef = new Definition(query);

		return newDef.save()
	})
	.then(savedDef => {
		// console.log(savedDef);
		// callback set error to false
		return callback({error : false, msg : 'Add definitions saved for activities'})
	})
	.catch(err => {
		// catching error
		console.log(err);
		return callback({error : true, err : err});
	})
}