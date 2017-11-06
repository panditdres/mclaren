const { expect } 		= require('chai');
const bluebird    		= require('bluebird');
const moment 			= require('moment');
const PatientHelper 	= require('../server/patient/patient.helper');
const Patient 	 		= require('../server/models/patient');
const config   			= require('../config/config');
const db 				= require('../config/db');
const mongoose			= require('mongoose');
const database 			= config.stageDB;

describe(`addPatients`, function() {
	it(`should save the details arg in the database for patient added`, cb => {

		mongoose.connect(config.stageDB, {useMongoClient: true});

		// For the test, we are adding 2 additional patients onto the database
		const details = [{
		    "id": 13,
		    "name": "Daniel Ricciardo",
		    "gender": "male",
		    "birthDate": "1986-08-21",
		    "heightCm": 171,
		    "weightKg": 62.4,
		    "bmi": 21.3
		},{
		    "id": 14,
		    "name": "Fernando Alonso",
		    "gender": "male",
		    "birthDate": "1984-08-21",
		    "heightCm": 171,
		    "weightKg": 62.4,
		    "bmi": 21.3
		}];

		PatientHelper.addPatients(details, resp => {

			bluebird.map(details, detail => {
				return Patient.find({
					'mclarenId' : detail.id, 
					'name' 		: detail.name,
					'gender' 	: detail.gender,
					'weightKg' 	: detail.weightKg,
					'bmi'		: detail.bmi,
				})
			})
			.then( found => {

				let check = found.map(el => {
					return { 
						id 			: el[0].mclarenId, 
						name 		: el[0].name,
						gender 		: el[0].gender,
						heightCm 	: el[0].heightCm,
						weightKg 	: el[0].weightKg,
						bmi 		: el[0].bmi,
						birthDate 	: moment.utc(el[0].birthDate).format('YYYY-MM-DD')
					}
				})
				// Checking if what we get back from the DB is the same as what we inserted.
				expect(check).to.deep.equal(details);
				// Close mongoose connection
				mongoose.disconnect();
				// return callback since aync function
				return cb()
			})
			.catch(cb)
			
		})
		
	})
})