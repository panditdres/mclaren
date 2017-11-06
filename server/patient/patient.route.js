/**
 * Created by pandit on 02-11-2017.
 */
'use strict';

const PatientHelper  = require('./patient.helper');

//call all routes functions with express router as the parameter
function Patient_Routes(router) {  


	router.get('/allPatients',(req,res) => {

		PatientHelper.getAllPatients(response => {
			// console.log(response)
			if(response.error === false){
				res.status(200).send(response)
			} else {
				res.status(400).send(response)
			}
		})

	})

	router.post('/addPatients',(req,res) => {

		// passing req.body through Postman
		// passing in the json from patients.json in the mock api folder
		let details = req.body;

		PatientHelper.addPatients(details, response => {
			// console.log(response)
			if(response.error === false){
				res.status(200).send(response)
			} else {
				res.status(400).send(response)
			}
		})
	})

}

module.exports = Patient_Routes;