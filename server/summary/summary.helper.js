'use strict';

const bluebird    	= require('bluebird');
const config   		= require('../../config/config');
const moment   		= require('moment');
const fs       		= require('fs');
const http     		= require('http');
// const PdfPrinter 	= require('pdfmake/src/printer');
// const excel         = require('node-excel-export');
const Summary 		= require('../models/summary');
const Patient		= require('../models/patient');

module.exports = {

	addSummaries : addSummaries

}

function addSummaries(details,callback){

	// console.log(details)

	let savedSum;
	let summaries = details;

	bluebird.map(summaries, el => {
		
		let query = {
			patientId 	: el.patientId,
			activity	: el.activity,
			minutes		: el.minutes
		}

		let newSummary = new Summary(query);

		return newSummary.save()
	})
	.then(results => {
		// console.log(results);
		savedSum = results;
		return Patient.find({})
	})
	.then(patients => {
		return bluebird.map(patients, patient => {
			patient.summary = savedSum.filter(el => {return el.patientId === patient.mclarenId}).map(x => {return x._id})
			return patient.save()
		})
	})
	.then(final => {
		// console.log(final)
		return callback({error : false, msg : 'Summaries imported'})
	})
	.catch(err => {
		return callback({error:true, err: err})
	})

}