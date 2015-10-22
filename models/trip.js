/**
 * Created by dougritzinger on 10/21/15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tripSchema = new Schema({
    id: Number,
    description: String,
    attachments: Array,
    putInMap: String,
    shuttleMap: String,
    attending: Array
});

var Trip = mongoose.model('trip',tripSchema);

module.exports = Trip;
