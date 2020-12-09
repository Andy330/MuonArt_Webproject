const mongoose = require('mongoose')
const Schema = mongoose.Schema;
 
const PostSchema = new Schema({
  //username: String,
  title: String,
  body: String, 
  datePosted:{
  	type: Date, 
  	default: new Date()
  },
  userid: {
	type: mongoose.Schema.Types.ObjectId,
	ref: 'User',
	required: true
  },
  image: String
});

const Post = mongoose.model('Post',PostSchema);
module.exports = Post