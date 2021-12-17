import mongoose from 'mongoose'
// import config from '../../config'

const Child = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.ObjectId,
		ref: 'User'
	},
	name: {
		type: String
	},
	age: {
		type: Number
	}
})

export default mongoose.model('child', Child)
