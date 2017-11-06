const { expect } 		= require('chai');
const bluebird    		= require('bluebird');
const DefinitionHelper 	= require('../server/definition/definition.helper');
const Definition 		= require('../server/models/definition');
const config   			= require('../config/config');
const db 				= require('../config/db');
const mongoose			= require('mongoose');
const database 			= config.stageDB;

//import add definitions
//addDefinitions
describe(`addDefinitions`, function() {
	it(`should save the details arg in the database for definitions inserted`, cb => {

		mongoose.connect(config.stageDB, {useMongoClient: true});

		// Adding 2 new definitions to the database for this test
		const details = [{
			activity 	: 'Football Practice',
			intensity 	: 'vigorous'
		},{
			activity 	: 'Rest Day',
			intensity 	: 'none'
		}];

		DefinitionHelper.addDefinitions(details, resp => {

			bluebird.map(details, detail => {
				return Definition.find({'activity' : detail.activity, 'intensity' : detail.intensity})
			})
			.then( found => {

				let check = found.map(el => {
					return { activity : el[0].activity, intensity : el[0].intensity }
				})

				// Checking if what we get back from the DB is the same as what we inserted.
				expect(check).to.deep.equal(details);
				// Close mongoose connection
				mongoose.disconnect();
				// return callback since aync function
				return cb();

			})
			.catch(cb)
			
		})
		

	})
})