'use strict';

//load environment variables using dotenv
require('dotenv').config();

module.exports = {
   	secret			: process.env.SECRET,
    stageDB 		: process.env.STAGE_DB
};
