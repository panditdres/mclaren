/**
 * Created by Pandit on 02-11-2017;
 */
'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var summarySchema = new Schema({

	patientId 	: {type : Number},
    activity 	: {type : String},
    minutes		: {type : Number},
    

},{timestamps: {createdAt:'createdAt', updatedAt:'updated_at'}});

module.exports = mongoose.model('Summary', summarySchema);
