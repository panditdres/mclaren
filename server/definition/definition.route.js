'use strict';

const DefinitionHelper = require('./definition.helper');

function Definition_Routes(router){

	router.get('/allDefinitions', (req,res) => {
		DefinitionHelper.getAllDefinitions(response => {
			if(response.error === false){
				res.status(200).send(response);
			} else {
				res.status(400).send(response);
			}
		})
	})

	router.post('/addDefinitions', (req,res) => {

		let details = req.body;

		DefinitionHelper.addDefinitions(details, response => {
			if(response.error === false){
				res.status(200).send(response);
			} else {
				res.status(400).send(response);
			}
		})

	})

}

module.exports = Definition_Routes;