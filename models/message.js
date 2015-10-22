/**
 * Created by dougritzinger on 10/21/15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
    date: Date,
    content: String
});

var Message = mongoose.model('message',messageSchema);

module.exports = Message;
