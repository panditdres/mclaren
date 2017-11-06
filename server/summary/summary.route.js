'use strict';

const SummaryHelper = require('./summary.helper');

function Summary_Routes(router){

	router.post('/addSummaries',(req,res) => {

		let details = req.body;

		SummaryHelper.addSummaries(details, response => {
			if(response.error === false) {
				res.status(200).send(response);
			} else {
				res.status(400).send(response);
			}
		})
	})

}

module.exports = Summary_Routes;