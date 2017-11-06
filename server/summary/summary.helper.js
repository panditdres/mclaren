'use strict';

const bluebird    	= require('bluebird');
const config   		= require('../../config/config');
const moment   		= require('moment');
const fs       		= require('fs');
const http     		= require('http');
const Summary 		= require('../models/summary');
const Patient		= require('../models/patient');

module.exports = {
	addSummaries : addSummaries
}

function addSummaries(details,callback){

	// console.log(details)

	let savedSum;
	let summaries = details;

	// Expecting details to be an array - bluebird.map allows us to run the function asynchronously 		
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
		return bluebird.map(summaries, el => {
			return Patient.find({mclarenId : el.patientId})
		})
	})
	.then(patients => {

		// unique array only takes unique patients, meaning Patient A will not show up twice in the array
		// Causes bug on .save() on mongoose
		let unique = patients.filter((obj, pos, arr) => {
            return arr.map(mapObj => mapObj._id).indexOf(obj._id) === pos;
        });

		return bluebird.map(unique, patient => {
			// sets a new array of summary for the patient
			patient[0].summary = savedSum.filter(el => {return el.patientId === patient[0].mclarenId}).map(x => {return x._id})
			return patient[0].save();
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