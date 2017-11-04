'use strict';

const bluebird    	= require('bluebird');
const config   		= require('../../config/config');
const moment   		= require('moment');
const fs       		= require('fs');
const http     		= require('http');
// const PdfPrinter 	= require('pdfmake/src/printer');
// const excel         = require('node-excel-export');
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

	bluebird.map(def, el =>{
		let query = {
			activity 	: el.activity,
			intensity	: el.intensity
		}

		let newDef = new Definition(query);

		return newDef.save()
	})
	.then(savedDef => {
		console.log(savedDef);
		callback({error : false, msg : 'Add definitions saved for activities'})
	})
	.catch(err => {
		console.log(err);
		callback({error : true, err : err});
	})
}