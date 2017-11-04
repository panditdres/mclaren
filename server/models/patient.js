/**
 * Created by Pandit on 02-11-2017;
 */
'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var patientSchema = new Schema({

	mclarenId	: {type : Number},
    name        : {type : String},
    gender      : {type : String},
    birthDate   : {type : Date},
    heightCm    : {type : Number},
    weightKg    : {type : Number},
    bmi         : {type : Number},
    summary		: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Summary' }]

},{timestamps: {createdAt:'createdAt', updatedAt:'updated_at'}});

module.exports = mongoose.model('Patient', patientSchema);
