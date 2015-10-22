/**
 * Created by dougritzinger on 10/21/15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var riverSchema = new Schema({
    id: Number,
    description: String
});

var River = mongoose.model('river',riverSchema);

module.exports = River;
