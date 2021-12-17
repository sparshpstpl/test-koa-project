import mongoose from 'mongoose'
// import config from '../../config'

const Card = new mongoose.Schema({
	type: {
		type: String
	},
	cardNumber: {
		type: Number
	},
	securityCode: {
		type: String
	},
	expirationDate: {
		type: Date
	},
	monthlyLimit: {
		type: Number
	},
	addedBy: {
		type: mongoose.Schema.ObjectId,
		ref: 'User'
	},
	addedFor: {
		type: mongoose.Schema.ObjectId,
		ref: 'Child'
	}
})

export default mongoose.model('card', Card)
