'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var definitionSchema = new Schema({

    activity   : {type : String},
    intensity  : {type : String}, 

},{timestamps: {createdAt:'createdAt', updatedAt:'updated_at'}});

module.exports = mongoose.model('Definition', definitionSchema);
