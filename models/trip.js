/**
 * Created by dougritzinger on 10/21/15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tripSchema = new Schema({
    id: Number,
    linkId: String,
    trip: String,
    date: String,
    dateMs: Number,
    description: String,
    leader: String,
    attachments: Array,
    putInMap: String,
    shuttleMap: String,
    attending: [{
        username: String,
        sent: String,
        declined: String
    }],
});

var Trip = mongoose.model('trip',tripSchema);

module.exports = Trip;
