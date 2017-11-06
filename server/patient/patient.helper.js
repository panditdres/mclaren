'use strict';

const bluebird    	= require('bluebird');
const config   		= require('../../config/config');
const moment   		= require('moment');
const fs       		= require('fs');
const http     		= require('http');
const Patient 		= require('../models/patient');

module.exports = {

	getAllPatients 	: getAllPatients,
	addPatients 	: addPatients

}

function getAllPatients(callback) {
	Patient.find({}).populate('summary')
	.then(patients => {
		return callback({error: false, data: patients})
	})
	.catch(err => {
		return callback({error: false, err: err})
	})
}

function addPatients(details,callback){
	// console.log(details)

	let patients = details;

	bluebird.map(patients, (patient) => {

		let query = {
			mclarenId 	: patient.id,
			name		: patient.name,
			gender		: patient.gender,
			birthDate	: patient.birthDate,
			heightCm	: patient.heightCm,
			weightKg	: patient.weightKg,
			bmi			: patient.bmi
		}

		console.log(query,'query')		

		let newPatient = new Patient(query)

		return newPatient.save()
	})
	.then(savedPatients => {
		// console.log(savedPatients)
		return callback({error: false, msg: 'Array of patients saved'})
	})
	.catch(err => {
		console.log(err)
		return callback({error: true, err: err})
	})
}